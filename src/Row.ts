import {Qua, HitObject} from "./qua-type.ts";

export class Row extends Phaser.GameObjects.Container {
    HitObjects: HitObject[]
    static MISS_TIME = -100 //tweak this

    //will get all the HitObjects from the qua of this lane
    constructor(scene: Phaser.Scene, index: number, HitObjects: Qua["HitObjects"]) {
        super(scene)
        this.HitObjects = HitObjects.filter((HitObject: HitObject) => HitObject.Lane === index)
    }

    //fired on keypress
    hit(currTime: number){
        //get the closest HitObject
        let score = 0;
        while(true) {
            //get rid of the ones we missed?
            if(this.HitObjects[0].StartTime < currTime + Row.MISS_TIME) {
                this.HitObjects.shift()
            } else {
                score = Math.abs(this.HitObjects[0].StartTime - currTime)
                this.HitObjects.shift()
                break;
            }
        }
        return Math.round(score/1000)
    }
}