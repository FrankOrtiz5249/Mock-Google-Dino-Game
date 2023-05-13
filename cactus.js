import { getCustomProperty, 
    incrementCustomProperty, 
    setCustomProperty, } from "./updateCustomProperty.js"

const SPEED = 0.05 //has to match the ground speed or itll look bad and make the game feel weird to play
const CACTUS_INTERVAL_MIN = 500 //half a second between catus as min amount of time
const CACTUS_INTERVAL_MAX = 2000 //2 secs between cactus as max amount of time
//ill probably change those two numbers when i work on it more
const worldElem = document.querySelector("[data-world]")//

let nextCactusTime
export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN
    document.querySelectorAll("[data-cactus]").forEach(cactus => {
        cactus.remove()
    })
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach(cactus =>{
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)
        if (getCustomProperty(cactus, "--left") <= -100) { //removes cactus once its at the end of browser
            cactus.remove()
        }
    })

    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
        // math for randomNumberBetween function

    }
    nextCactusTime -= delta
}

export function getCactusRects() {
    return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
        return cactus.getBoundingClientRect() //gets the size and position of the cactus for the lose state when it come in contact with the dino
    })
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactus.src = "imgs/cactus.png"
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100) //moves cactus all the way to the right side of screen
    worldElem.append(cactus) //brings the cactus into the world
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) 
    // gives us a random number between zero and one multiply it by the defference of the max and min 
    //then add one just to make sure it falls between the max and min then we add our min so the min number
    // possible to get is the set min; and math floor just makes sure we get a whole munber instead of a decimal
}