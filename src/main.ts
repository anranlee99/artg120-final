import 'phaser';
import  arrow from './assets/arrow.png'
import troll from './assets/troll.png'
import goat from './assets/goat.png'
import  selectsound from './assets/selectsound.mp3'
import bgsound from './assets/waterambience.mp3'

class Game extends Phaser.Scene {
    w!: number
    h!: number
    playBtn!: Phaser.GameObjects.Triangle
    circles!: Phaser.GameObjects.Arc[]
    // gaming
    constructor() {
        super('Game');
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
        let goats = [
            this.add.image(this.w*0.8, this.h/2-25, 'goat').setOrigin(0.5,1).setScale(0.8),
             this.add.image(this.w*0.9, this.h/2-25, 'goat').setOrigin(0.5,1).setScale(0.5),
            this.add.image(this.w*0.95, this.h/2-25, 'goat').setOrigin(0,1).setScale(0.4),
        ]
        goats.forEach(goat => {
            //add tween to move goats across the screen
            this.tweens.add({
                targets: goat,
                x: {from: this.w, to: goat.x},
                duration: 2000,
                ease: 'Linear',
                })
        })
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
class Menu extends Phaser.Scene {
    w!: number
    h!: number
    constructor() {
        super('Menu')
    }
    preload(){
        this.load.image('troll', troll)
        this.load.image('goat', goat)
        this.load.audio('selectsound', selectsound)
        this.load.audio('bgsound', bgsound)
    }
    setUp() {
        this.w = this.game.config.width as number
        this.h = this.game.config.height as number
        
        this.sound.play('bgsound', {
            loop: true,
            volume: 0.5
        
        })
        this.add.rectangle(this.w/2, this.h/2, this.w, 100, 0x7f6000)
        this.add.rectangle(0, this.h/2+50, this.w*0.1, this.h/2, 0x6aa84f).setOrigin(0)
        this.add.rectangle(this.w*0.9, this.h/2+50, this.w*0.1, this.h/2, 0x6aa84f).setOrigin(0)
        this.add.rectangle(this.w*0.1, this.h/2+100, this.w*0.8, this.h/2, 0x0b5394).setOrigin(0)
        let banner = this.add.rectangle(this.w/2, this.h*0.2, this.w*0.6, 200, 0xbf9000)
        this.add.text(banner.x, banner.y, 'He is a dancer, and this is his bridge.', 
        {fontSize: '40px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)

        // this.add.image(this.w*0.8, this.h/2-25, 'goat').setOrigin(0.5,1).setScale(0.8)
        // this.add.image(this.w*0.9, this.h/2-25, 'goat').setOrigin(0.5,1).setScale(0.5)
        // this.add.image(this.w*0.95, this.h/2-25, 'goat').setOrigin(0,1).setScale(0.4)
        this.add.image(this.w/2, this.h/2-25, 'troll').setOrigin(0.5,1)

        let beginBtn = this.add.rectangle(this.w/2, this.h*0.7, this.w*0.1, 100, 0x6aa84f)
        this.add.text(beginBtn.x, beginBtn.y, 'Begin', {fontSize: '40px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        beginBtn.setInteractive({useHandCursor: true})
        beginBtn.on('pointerdown', () => {
            this.sound.play('selectsound')
            this.sound.stopByKey('bgsound')
            this.scene.start('Game')
        })
        let controlsBtn = this.add.rectangle(this.w/2, this.h*0.9, this.w*0.1, 100, 0x6aa84f)
        controlsBtn.setInteractive({useHandCursor: true})
        this.add.text(controlsBtn.x, controlsBtn.y, 'Controls', {fontSize: '40px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        controlsBtn.on('pointerdown', () => {
            this.sound.play('selectsound')
            this.sound.stopByKey('bgsound')
            this.scene.start('Controls')
        })
    }
    create() {
        this.setUp()

        
    }
    update() {
    }
}
class Controls extends Phaser.Scene {
    w!: number
    h!: number
    constructor() {
        super('Controls')
    }
    create() {
        this.w = this.game.config.width as number
        this.h = this.game.config.height as number
        let str = `The three billy goats gruff want to pass your bridge, so you’ll just have to intimidate them into doing otherwise…through dance!



Controls:

Up Arrow: A

Left Arrow: S

Right Arrow: K

Down Arrow: L

Press any key to begin`
        
        this.add.text(this.w/2, this.h/2, str, {
            fontSize: '40px',
             color: '#000000',
              fontStyle: 'bold', 
                align: 'center',
                wordWrap: {width: this.w*0.8, useAdvancedWrap: true}
            }).setOrigin(0.5)
        //on any input or keypress, start the game
        this.input.on('pointerdown', () => {
            this.scene.start('Game')
        })
        this.input.keyboard?.on('keydown', () => {
            this.scene.start('Game')
        })

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
    scene: [Menu, Controls, Game]
})

declare global {
    interface Window { game: Phaser.Game }
}

window.game = game;
