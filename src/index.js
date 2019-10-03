import "./styles.scss";

import { Game } from "game-of-life"

const params = {
    cols: 400,
    rows: 400,
    color: "gray"
};

let game = new Game("gameCanvas", params);
let gameStarted = undefined;

const canvasElement = document.getElementById("gameCanvas");
const overlayElement = document.getElementById("overlay");
const cardElement = document.getElementById("card");

document.getElementById("playButton").addEventListener("click", play);

document.getElementById("pauseButton").addEventListener("click", pause);

document.getElementById("resetButton").addEventListener("click", () => {
    pause();
    reset();
});

function play() {
    if (!gameStarted) gameStarted = 1;
    playGame();

    overlayElement.style.display = "none";
    cardElement.style.display = "none";
    canvasElement.classList.remove("blured")
}

function reset() {
    gameStarted = undefined;
    params.color = '#' + (function lol(m, s, c) {
        return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
    })(Math, '0123456789ABCDEF', 4);
    game = new Game("gameCanvas", params);
}

function pause() {
    canvasElement.classList.add("blured");
    overlayElement.style.display = "";
    cardElement.style.display = "";
    gameStarted = undefined;
}

function playGame() {
    if (!gameStarted) return;
    game.liveOut();
    window.requestAnimationFrame(playGame)
}
