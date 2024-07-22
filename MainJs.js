console.log("hello world bro")

let songIndex=0;
let audioElement= new Audio('songs/5.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSong  = document.getElementById("masterSong");

let songs = [
    {songName:"RRR",filePath:"songs/1.mp3", coverPath:  "covers/1.jpg"},
    {songName:"Master",filePath:"songs/2.mp3", coverPath:  "covers/2.jpg"},
    {songName:"Bahubali",filePath:"songs/3.mp3", coverPath:  "covers/3.jpg"},
    {songName:"Salar",filePath:"songs/4.mp3", coverPath:  "covers/4.jpg"},
    {songName:"Gunturukaram",filePath:"songs/5.mp3", coverPath:  "covers/5.jpg"},
   
    // {songName:"maryada ramana",filePath:"songs/7.mp3", coverPath:  "covers/7.jpg"},

    // {songName:"simhadri",filePath:"songs/8.mp3", coverPath:  "covers/8.jpg"},

    // {songName:"rrr",filePath:"songs/9.mp3", coverPath:  "covers/9.jpg"},

    // {songName:"bahubali",filePath:"songs/10.mp3", coverPath:  "covers/10.jpg"},
]
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src= songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle play and pause 

masterPlay.addEventListener("click",()=>{
    if(audioElement.paused|| audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else    {
        audioElement.pause();
        masterPlay.classList.add('fa-play');
        masterPlay.classList.remove('fa-pause');
        gif.style.opacity=0;
    }
})

audioElement.addEventListener("timeupdate",()=>{
   

    progess = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progess);
    progressBar.value= progess;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime= myProgressBar.value* audioElement.duration/100;
})

// const makeAllPlay =()=>{
//     Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
//         element.target.classList.remove("fa-pause");
//         element.target.classList.add("fa-play");
//     })

// }


const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}



Array.from(document.getElementsByClassName("songItemPlay")).forEach(element => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src= `songs/${songIndex+1}.mp3`;
        masterSong.innerText= songs[songIndex].songName;
        gif.style.opacity=1;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    });
});


document.getElementById("previous").addEventListener("click",()=>{
    if(index<=0){
        index = 0;
    }
    else{
        index=index-1;
    }

    audioElement.src=`songs/${index+1}.mp3`;
    masterSong.innerText= songs[songIndex].songName;
    gif.style.opacity=1;

    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById("next").addEventListener("click",()=>{
    if(index>=9){
        index = 0;
    }
    else{
        index=index+1;
    }

    audioElement.src=`songs/${index+1}.mp3`;
    masterSong.innerText= songs[songIndex].songName;
    gif.style.opacity=1;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})