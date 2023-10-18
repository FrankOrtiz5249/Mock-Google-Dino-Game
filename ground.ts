import { 
    getCustomProperty, 
    incrementCustomProperty, 
    setCustomProperty } from "./updateCustomProperty.js"

const SPEED: number = .05;
const groundElems: NodeListOf<Element> = document.querySelectorAll("[data-ground]")

export function setupGround(): void {
    setCustomProperty(groundElems[0], "--left" , 0);
    setCustomProperty(groundElems[1], "--left" , 300);

}

export function updateGround(delta: number, speedScale: number): void  {
    groundElems.forEach((ground: HTMLElement) => {
        incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

        if(getCustomProperty(ground, "--left") <= -300){
            incrementCustomProperty(ground, "--left" , 600); 
        }
//makes the ground loop after the second one finishes should be seemless but sometimes @ random it breaks dont know why//
    })
}