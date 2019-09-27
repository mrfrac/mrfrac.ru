import { Game } from "game-of-life"

const params = {
    cols: 400,
    rows: 400,
    color: "gray"
};

let game = new Game("gameCanvas", params);
let gameStarted = undefined;

document.getElementById("playButton").addEventListener("click", play);

document.getElementById("pauseButton").addEventListener("click", () => {
    document.getElementById("gameCanvas").classList.add("blured");
    document.getElementById("overlay").style.display = "";
    gameStarted = undefined;
});

document.getElementById("resetButton").addEventListener("click", reset);

function play() {
    if (!gameStarted) gameStarted = 1;
    playGame();

    document.getElementById("overlay").style.display = "none";
    document.getElementById("gameCanvas").classList.remove("blured")
}

function reset() {
    gameStarted = undefined;
    params.color = '#' + (function lol(m, s, c) {
        return s[m.floor(m.random() * s.length)] + (c && lol(m, s, c - 1));
    })(Math, '0123456789ABCDEF', 4);
    game = new Game("gameCanvas", params);
}

function playGame() {
    if (!gameStarted) return;
    game.liveOut();
    window.requestAnimationFrame(playGame)
}
