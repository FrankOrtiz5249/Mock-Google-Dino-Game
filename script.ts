import {updateGround, setupGround} from './ground.js'
import {updateDino, setupDino, getDinoRect, setDinoLose} from './dino.js'
import {updateCactus, setupCactus, getCactusRects} from './cactus.js'


const WORLD_WIDTH: number = 100
const WORLD_HEIGHT: number = 30
const SPEED_SCALE_INCREASE: number = .00001//

const worldElem: HTMLElement | null = document.querySelector('[data-world]')//
const scoreElem: HTMLElement | null = document.querySelector('[data-score]')//
const startScreenElem: HTMLElement | null = document.querySelector('[data-start-screen]')//



setPixelToWorldScale()
window.addEventListener("resize", setPixelToWorldScale)//
document.addEventListener("keydown", handleStart, { once: true })//

let lastTime: number | null;
let speedScale: number;
let score: number;
function update(time: number ): void {
if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
}
    const delta = time - lastTime 

    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    if(checkLostState()) return handleLose();

    console.log(delta);

    lastTime = time;
    window.requestAnimationFrame(update);
}

function checkLostState(): boolean{
    const dinoRect: DOMRect = getDinoRect();
    return getCactusRects().some((rect) => isCollision(rect, dinoRect));//from the video in my readme don't fully remember what this does will look at after class
}

function isCollision(rect1: DOMRect, rect2: DOMRect): boolean { //sets up collision for the dino and cactus
    return (
    rect1.left < rect2.right && 
    rect1.top < rect2.bottom && 
    rect1.right > rect2.left && 
    rect1.bottom > rect2.top
    );
}

function updateSpeedScale(delta: number): void {
    speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta: number): void {
    score += delta * .01 ;//for every 100ms that passes you get 1 point//
    scoreElem.textContent =  Math.floor(score).toString();
}

function handleStart(): void { //when game starts this puts everything at its origin or is preping for its function
    lastTime = null;
    speedScale = 1;
    score = 0;
    setupGround();
    setupDino();
    setupCactus();
    startScreenElem.classList.add("hide");
    window.requestAnimationFrame(update);
}

function handleLose(): void {
    setDinoLose();
    setTimeout(() => {
        document.addEventListener("keydown", handleStart, {once: true}); //when the player loses the start screen text will reappear and have a short 100ms dely between ending teh game and when you can restart the game.
        startScreenElem.classList.remove("hide");
    }, 100);
}

function setPixelToWorldScale(): void {
    let worldToPixelScale: number;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) 
    {
        worldToPixelScale = window.innerWidth / WORLD_WIDTH;
    } else {
        worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
    }

    worldElem.style.width = `${WORLD_WIDTH * worldToPixelScale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * worldToPixelScale}px`;
}