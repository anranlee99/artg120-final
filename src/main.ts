import 'phaser';
import * as Tone from 'tone';
import  arrow from './assets/arrow.png'
import troll from './assets/troll.png'
import goat from './assets/goat.png'

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
    preload(){
        this.load.image('arrow', arrow)
        this.load.image('troll', troll)
        this.load.image('goat', goat)
    }
    setUp() {
        this.w = this.game.config.width as number
        this.h = this.game.config.height as number
       
        this.add.rectangle(this.w/2, this.h/2, this.w, 100, 0x7f6000)
        this.add.rectangle(0, this.h/2+50, this.w*0.1, this.h/2, 0x6aa84f).setOrigin(0)
        this.add.rectangle(this.w*0.9, this.h/2+50, this.w*0.1, this.h/2, 0x6aa84f).setOrigin(0)
        let river = this.add.rectangle(this.w*0.1, this.h/2+100, this.w*0.8, this.h/2, 0x0b5394).setOrigin(0)

        let aBlock = this.add.rectangle(125, this.h/2+175, 75, river.displayHeight*0.15, 0xffff00).setOrigin(0.5)
        let sBlock = this.add.rectangle(125, this.h/2+200 + aBlock.displayHeight, 75, river.displayHeight*0.15, 0x00ff00).setOrigin(0.5)
        let kBlock = this.add.rectangle(125, this.h/2+225 + aBlock.displayHeight*2, 75, river.displayHeight*0.15, 0xff0000).setOrigin(0.5)
        let lBlock = this.add.rectangle(125, this.h/2+250 + aBlock.displayHeight*3, 75, river.displayHeight*0.15, 0xff9900).setOrigin(0.5)
        this.add.image(250, this.h/2+175, 'arrow').setOrigin(0.5).setScale(0.15)
        this.add.image(250, sBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(270)
        this.add.image(250, kBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(90)
        this.add.image(250, lBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(180)

        this.add.text(aBlock.x, aBlock.y, 'A', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        this.add.text(sBlock.x, sBlock.y, 'S', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        this.add.text(kBlock.x, kBlock.y, 'K', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        this.add.text(lBlock.x, lBlock.y, 'L', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        this.add.image(this.w*0.8, this.h/2-25, 'goat').setOrigin(0.5,1).setScale(0.8)
        this.add.image(this.w*0.9, this.h/2-25, 'goat').setOrigin(0.5,1).setScale(0.5)
        this.add.image(this.w*0.95, this.h/2-25, 'goat').setOrigin(0,1).setScale(0.4)
        let troll = this.add.image(this.w/2, this.h/2-25, 'troll').setOrigin(0.5,1)

        this.input.keyboard?.on('keydown-A', () => {
            //bold aBlock border
            aBlock.setStrokeStyle(5, 0x000000)
            //make the troll jump   
            this.tweens.add({
                targets: troll,
                y: troll.y-100,
                duration: 200,
                ease: 'Power2',
                yoyo: true,
                onComplete: () => {
                    //reset troll position
                    troll.y = this.h/2-25
                }
            })
        })
        this.input.keyboard?.on('keyup-A', () => {
            //unbold aBlock border
            aBlock.setStrokeStyle(0, 0x000000)
        })
        this.input.keyboard?.on('keydown-S', () => {
            //bold sBlock border
            sBlock.setStrokeStyle(5, 0x000000)
            troll.setScale(0.5, 1)
        })
        this.input.keyboard?.on('keyup-S', () => {
            //unbold sBlock border
            sBlock.setStrokeStyle(0, 0x000000)
            troll.setScale(1)
        })
        this.input.keyboard?.on('keydown-K', () => {
            //bold kBlock border
            kBlock.setStrokeStyle(5, 0x000000)
            troll.setScale(0.5, 1)
            troll.flipX = true
        })
        this.input.keyboard?.on('keyup-K', () => {
            //unbold kBlock border
            kBlock.setStrokeStyle(0, 0x000000)
            troll.setScale(1)
            troll.flipX = false
        })
        this.input.keyboard?.on('keydown-L', () => {
            //bold lBlock border
            lBlock.setStrokeStyle(5, 0x000000)
            troll.setScale(1, 0.5)
        })
        this.input.keyboard?.on('keyup-L', () => {
            //unbold lBlock border
            lBlock.setStrokeStyle(0, 0x000000)
            troll.setScale(1)
        })
    }
    create() {
        this.setUp()

        
    }
    update() {
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
    backgroundColor: '#9fc5e8',
    parent: 'app',
    title: "ARTG120 Final",
    scene: [TestScene]
})

declare global {
    interface Window { game: Phaser.Game }
}

window.game = game;
