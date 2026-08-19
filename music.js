console.log("Music App Started");


const audioElement = new Audio();


const masterPlay = document.getElementById("masterPlay");

const previous = document.getElementById("previous");

const next = document.getElementById("next");

const progressBar = document.getElementById("myProgressBar");

const gif = document.getElementById("gif");

const masterSongName =
    document.getElementById("masterSongName");


const songItems =
    document.querySelectorAll(".songItem");


const playButtons =
    document.querySelectorAll(".songItemPlay");



const songs = [

    {
        songName: "Warriyo - Mortals [NCS Release]",
        filePath: "songs/1.mp3",
        coverPath: "covers/1.jpg"
    },

    {
        songName: "Cielo - Huma-Huma",
        filePath: "songs/2.mp3",
        coverPath: "covers/2.jpg"
    },

    {
        songName: "DEAF KEV - Invincible [NCS Release]",
        filePath: "songs/3.mp3",
        coverPath: "covers/3.jpg"
    },

    {
        songName: "Different Heaven & EH!DE - My Heart",
        filePath: "songs/4.mp3",
        coverPath: "covers/4.jpg"
    },

    {
        songName: "Janji - Heroes Tonight",
        filePath: "songs/5.mp3",
        coverPath: "covers/5.jpg"
    },

    {
        songName: "Rabba - Salam-e-Ishq",
        filePath: "songs/2.mp3",
        coverPath: "covers/6.jpg"
    },

    {
        songName: "Sakhiyaan - Salam-e-Ishq",
        filePath: "songs/2.mp3",
        coverPath: "covers/7.jpg"
    },

    {
        songName: "Bhula Dena - Salam-e-Ishq",
        filePath: "songs/2.mp3",
        coverPath: "covers/8.jpg"
    },

    {
        songName: "Tumhari Kasam - Salam-e-Ishq",
        filePath: "songs/2.mp3",
        coverPath: "covers/9.jpg"
    },

    {
        songName: "Na Jaana - Salam-e-Ishq",
        filePath: "songs/4.mp3",
        coverPath: "covers/10.jpg"
    }

];


let currentSongIndex = 0;


songItems.forEach((item, index) => {

    item.querySelector("img").src =
        songs[index].coverPath;

    item.querySelector(".songName").textContent =
        songs[index].songName;

});

function resetButtons() {

    playButtons.forEach(button => {

        button.classList.remove("fa-circle-pause");

        button.classList.add("fa-circle-play");

    });

}


function playSong(index) {

    currentSongIndex = index;


    audioElement.src =
        songs[index].filePath;


   

    masterSongName.textContent =
        songs[index].songName;


    audioElement.play()
        .then(() => {

            console.log(
                "Playing:",
                songs[index].songName
            );

        })
        .catch(error => {

            console.error(
                "Audio Error:",
                error
            );

        });


    masterPlay.classList.remove(
        "fa-circle-play"
    );

    masterPlay.classList.add(
        "fa-circle-pause"
    );


    gif.style.opacity = "1";

    resetButtons();

    playButtons[index].classList.remove(
        "fa-circle-play"
    );

    playButtons[index].classList.add(
        "fa-circle-pause"
    );

}

masterPlay.addEventListener("click", () => {


    // If audio is paused

    if (audioElement.paused) {

        audioElement.play()
            .then(() => {

                masterPlay.classList.remove(
                    "fa-circle-play"
                );

                masterPlay.classList.add(
                    "fa-circle-pause"
                );

                gif.style.opacity = "1";


                playButtons[currentSongIndex]
                    .classList.remove(
                        "fa-circle-play"
                    );

                playButtons[currentSongIndex]
                    .classList.add(
                        "fa-circle-pause"
                    );

            })
            .catch(error => {

                console.error(
                    "Audio Error:",
                    error
                );

            });

    }

    else {

        audioElement.pause();


        masterPlay.classList.remove(
            "fa-circle-pause"
        );

        masterPlay.classList.add(
            "fa-circle-play"
        );


        gif.style.opacity = "0";


        playButtons[currentSongIndex]
            .classList.remove(
                "fa-circle-pause"
            );

        playButtons[currentSongIndex]
            .classList.add(
                "fa-circle-play"
            );

    }

});


playButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        if (
            currentSongIndex === index &&
            !audioElement.paused
        ) {

            audioElement.pause();


            masterPlay.classList.remove(
                "fa-circle-pause"
            );

            masterPlay.classList.add(
                "fa-circle-play"
            );


            button.classList.remove(
                "fa-circle-pause"
            );

            button.classList.add(
                "fa-circle-play"
            );


            gif.style.opacity = "0";

        }

        else {

            playSong(index);

        }

    });

});

audioElement.addEventListener(
    "timeupdate",
    () => {

        if (
            audioElement.duration &&
            !isNaN(audioElement.duration)
        ) {

            const progress =
                (audioElement.currentTime /
                audioElement.duration) * 100;


            progressBar.value = progress;

        }

    }
);

progressBar.addEventListener(
    "input",
    () => {

        if (
            audioElement.duration &&
            !isNaN(audioElement.duration)
        ) {

            audioElement.currentTime =
                (progressBar.value / 100) *
                audioElement.duration;

        }

    }
);


next.addEventListener("click", () => {

    currentSongIndex++;


    if (
        currentSongIndex >= songs.length
    ) {

        currentSongIndex = 0;

    }


    playSong(currentSongIndex);

});


previous.addEventListener("click", () => {

    currentSongIndex--;


    if (currentSongIndex < 0) {

        currentSongIndex =
            songs.length - 1;

    }


    playSong(currentSongIndex);

});

audioElement.addEventListener(
    "ended",
    () => {

        currentSongIndex++;


        if (
            currentSongIndex >= songs.length
        ) {

            currentSongIndex = 0;

        }


        playSong(currentSongIndex);

    }
);
