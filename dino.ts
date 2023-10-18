import { setCustomProperty,
getCustomProperty,
incrementCustomProperty, } from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015 // grav and jump spped will be modded in future to find the right feel for the dino
const DINO_FRAME_COUNT = 2 //states the number of walking frames
const FRAME_TIME = 100 //changes dino walking frame 10 times per sec

let isJumping: boolean
let dinoFrame: number
let currentFrameTime: number
let yVelocity: number
export function setupDino(): void {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;
    setCustomProperty(dinoElem, "--bottom", 0);
    document.removeEventListener("keydown", onJump);
    document.addEventListener("keydown", onJump);
}

export function updateDino(delta: number, speedScale: number): void {
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRect(): DOMRect {
    return dinoElem.getBoundingClientRect()//gets elems size and position via .BoundingClientRect
}

export function setDinoLose(): void {
    dinoElem.src = "imgs/dino-lose.png" //dino lose frame for when lose function is played
}

function handleRun(delta: number, speedScale: number): void {
    if (isJumping) {
        dinoElem.src = `imgs/dino-stationary.png` //when in jumping the stationary dino png will be active
        return;
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT; //updates the frame to the next one
        dinoElem.src = `imgs/dino-run-${dinoFrame}.png`;
        currentFrameTime -= FRAME_TIME; //resets the frame bringing it back down to zero from the last frame
    }
    currentFrameTime += delta * speedScale;
}

function handleJump(delta: number): void {
    if (!isJumping) return;

    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
    
    if(getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0);
        isJumping = false;
    }

    yVelocity -= GRAVITY * delta;
}

function onJump(e: KeyboardEvent): void {
    if (e.code !== "Space" || isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;
}