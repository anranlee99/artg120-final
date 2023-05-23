import 'phaser';
import * as Tone from 'tone';

class TestScene extends Phaser.Scene {
    synth: Tone.Synth
    w!: number
    h!: number
    playBtn!: Phaser.GameObjects.Triangle
    circles!: Phaser.GameObjects.Arc[]
    // gaming
    constructor() {
        super('test');

        this.synth = new Tone.Synth().toDestination()

    }
    makeTrack() {
        this.add.rectangle(0, this.h * 0.2, this.w * 0.8, this.h * 0.2, 0xabcdef).setOrigin(0).setStrokeStyle(5, 0)
        this.add.rectangle(0, this.h * 0.4, this.w * 0.8, this.h * 0.2, 0xabcdef).setOrigin(0).setStrokeStyle(5, 0)
        this.add.rectangle(0, this.h * 0.6, this.w * 0.8, this.h * 0.2, 0xabcdef).setOrigin(0).setStrokeStyle(5, 0)
        this.add.rectangle(0, this.h * 0.8, this.w * 0.8, this.h * 0.2, 0xabcdef).setOrigin(0).setStrokeStyle(5, 0)
    }
    setUp() {
        this.w = this.game.config.width as number
        this.h = this.game.config.height as number
        this.makeTrack()

        this.playBtn = this.add.triangle(this.w * 0.3, this.h * 0.1, 0, 0, 0, 100, 100, 50, 0x34ff34).setOrigin(0, 0.5).setInteractive({ useHandCursor: true })
        this.circles = [
            this.add.circle(this.w * 0.4, this.h * 0.1, 10, 0xffffff).setOrigin(0.5),
            this.add.circle(this.w * 0.4 + 100, this.h * 0.1, 10, 0xffffff).setOrigin(0.5),
            this.add.circle(this.w * 0.4 + 200, this.h * 0.1, 10, 0xffffff).setOrigin(0.5),
            this.add.circle(this.w * 0.4 + 300, this.h * 0.1, 10, 0xffffff).setOrigin(0.5),
        ]
        this.playBtn.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.playBtn.setAlpha(0.5)
            this.playBtn.disableInteractive()
            let i = 0;
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.circles[i].setAlpha(0.5)
                    if(i == 3){
                        this.synth.triggerAttackRelease("C5", "8n")
                    } else {
                        this.synth.triggerAttackRelease("C4", "8n")
                    }
                    i++
                },
                repeat: 3
            })
        })


    }
    create() {
        this.setUp()

        const graphics = this.add.graphics()
        graphics.fillStyle(0x000000, 1)
        let tool = this.add.text(this.w*0.9, this.h*0.2, "🥁", {
            fontSize: 100
        }).setOrigin(0.5)
        let toolBG = graphics.fillRoundedRect(tool.x - tool.displayWidth, tool.y - tool.displayHeight,  200,200, 32)
        
        // doesn't work. would if i just used a rectangle but i want to use the rounded one T_T
        //let toolSprite = this.physics.add.existing(toolBG)
        // this.input.setDraggable(toolSprite.setInteractive())
        
    }
}

let game = new Phaser.Game({
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    backgroundColor: '#cccccc',
    parent: 'app',
    title: "ARTG120 Final",
    scene: [TestScene]
})

declare global {
    interface Window { game: Phaser.Game }
}

window.game = game;
