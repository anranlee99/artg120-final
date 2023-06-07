import {Qua, HitObject} from "./qua-type.ts";

export class Row extends Phaser.GameObjects.Container {
    HitObjects: HitObject[]
    static MISS_TIME = -500 //tweak this

    //will get all the HitObjects from the qua of this lane
    constructor(scene: Phaser.Scene, index: number, HitObjects: Qua["HitObjects"]) {
        super(scene)
        this.HitObjects = HitObjects.filter((HitObject: HitObject) => HitObject.Lane === index)
    }

    //fired on keypress
    hit(currTime: number) {
        let score = 0;
        while(this.HitObjects[0].StartTime < currTime + Row.MISS_TIME) {
            //remove misses 
            this.HitObjects.shift()
        }
        if(currTime >= this.HitObjects[0].StartTime  && currTime < this.HitObjects[0].StartTime + 500) {
            this.HitObjects.shift()
            score = this.HitObjects[0].StartTime + 500 - currTime
        }
        return Math.round(score / 1000);
      }
      
}