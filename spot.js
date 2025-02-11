console.log("welcome to spotify");

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressbar')
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('song-item'));

let songs = [
    { songName: "Dil Jhoom (From 'Crakk - Jeetegaa Toh Jiyegaa')", filePath: "songs/1.mp3", coverPath: "covers/cv1.jpg" },
    { songName: "Tumhe Kaise Main Bataoon - Abhijeet Bhattacharya,", filePath: "songs/2.mp3", coverPath: "covers/cv2.jpg" },
    { songName: "Pyar Hone Laga Hai - song by sonu nigam", filePath: "songs/3.mp3", coverPath: "covers/cv3.jpg" },
    { songName: "Pachtaoge - Song by Arijit Singh", filePath: "songs/4.mp3", coverPath: "covers/cv4.jpg" },
    { songName: "Rab Rakha - Love Breakups Zindagi  ", filePath: "songs/5.mp3", coverPath: "covers/cv5.jpg" },
    { songName: "Sajde - Song by Arijit Singh, Gulzar, and Nihira Joshi", filePath: "songs/6.mp3", coverPath: "covers/cv6.jpg" },
    { songName: "Sapna Jahan - Brothers  ", filePath: "songs/7.mp3", coverPath: "covers/cv7.jpg" },
    { songName: "Suno-Na Sangemarmar", filePath: "songs/8.mp3", coverPath: "covers/cv8.jpg" }
];

songItems.forEach((element, i) => {
    element.getElementsByClassName("song-img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerText = songs[i].songName;
    element.getElementsByClassName("")
});
// handle the pause and play click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// listen to events
audioElement.addEventListener('timeupdate', () => {
    // update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    if(myProgressBar.value==100)
    {
        songIndex +=1;
        console.log(myProgressBar.value);
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex-1].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('song-item-play ')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('song-item-play ')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
   
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        
        masterSongName.innerText = songs[songIndex-1].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 8) {
        songIndex = 1;
        
    }
    else {
        songIndex += 1;

    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex-1].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <1) {
        songIndex = 1;
        
    }
    else {
        songIndex -= 1;
        
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex-1].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
