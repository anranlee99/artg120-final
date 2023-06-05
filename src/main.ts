import 'phaser';
import YAML from 'yaml';
import arrow from './assets/arrow.png'
import troll from './assets/troll.png'
import goat from './assets/goat.png'
import selectsound from './assets/selectsound.mp3'
import bgsound from './assets/waterambience.mp3'
import youQua from './assets/you.qua?url'
import drTimeQua from './assets/dr_time.qua?url'

import drTimeAudio from './assets/dr_time.mp3'
import youAudio from './assets/you.mp3'
import {Qua, HitObject} from './qua-type.ts'
import {Row} from './Row.ts'

class Game extends Phaser.Scene {
    w!: number
    h!: number
    qua!: Qua
    startTime!: number
    rows!: Row[]
    aBlock!: Phaser.GameObjects.Rectangle
    sBlock!: Phaser.GameObjects.Rectangle
    kBlock!: Phaser.GameObjects.Rectangle
    lBlock!: Phaser.GameObjects.Rectangle
    river!: Phaser.GameObjects.Rectangle
    score!: number
    scoreText!: Phaser.GameObjects.Text
    init(data: any) {
        this.qua = this.cache.addCustom('yaml').get(data.song)
    }
    constructor() {
        super('Game');
        this.score = 0;
    }
    preload(){
        this.load.image('arrow', arrow)
        this.load.image('troll', troll)
        this.load.image('goat', goat)
        this.load.audio('dr_time', drTimeAudio)
        this.load.audio('You', youAudio)

    }
    loadSong(){
        this.sound.play(this.qua.Title)
        this.startTime = this.time.now
        this.rows = [
            new Row(this, 1, this.qua.HitObjects),
            new Row(this, 2, this.qua.HitObjects),
            new Row(this, 3, this.qua.HitObjects),
            new Row(this, 4, this.qua.HitObjects),
        ]
        this.rows.forEach((row: Row, i: number) => {
            row.HitObjects.forEach((HitObject: HitObject) => {
                console.log(HitObject)
                let mark: Phaser.GameObjects.Image | undefined;
                switch(i){
                    case 0:
                        mark = this.add.image(this.w, this.aBlock.y, 'arrow').setOrigin(0.5).setScale(0.15)
                        break;
                    case 1:
                        mark = this.add.image(125, this.sBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(270)
                        break;
                    case 2:
                        mark = this.add.image(125, this.kBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(90)
                        break;
                    case 3:
                        mark = this.add.image(125, this.lBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(180)
                        break;
                }
                mark!.setVisible(false)
                this.time.addEvent({
                    delay: HitObject.StartTime - 5000,
                    callback: () => {
                        mark!.setVisible(true)
                        this.tweens.add({
                            targets: mark,
                            x: {from: this.river.x + this.river.displayWidth, to: 250},
                            duration: 5000,
                            onComplete: () => {
                                mark!.destroy()
                            }
                        })
                    }
                })
            })
        })
    }
    setUp() {
        this.w = this.game.config.width as number
        this.h = this.game.config.height as number
        this.scoreText = this.add.text(this.w*0.1, 50, 'Score: 0', {fontSize: '64px', color: '#000'}).setOrigin(0)
        this.add.rectangle(this.w/2, this.h/2, this.w, 100, 0x7f6000)
        this.add.rectangle(0, this.h/2+50, this.w*0.1, this.h/2, 0x6aa84f).setOrigin(0)
        this.add.rectangle(this.w*0.9, this.h/2+50, this.w*0.1, this.h/2, 0x6aa84f).setOrigin(0)
        this.river = this.add.rectangle(this.w*0.1, this.h/2+100, this.w*0.8, this.h/2, 0x0b5394).setOrigin(0)

        this.aBlock = this.add.rectangle(125, this.h/2+175, 75, this.river.displayHeight*0.15, 0xffff00).setOrigin(0.5)
        this.sBlock = this.add.rectangle(125, this.h/2+200 + this.aBlock.displayHeight, 75, this.river.displayHeight*0.15, 0x00ff00).setOrigin(0.5)
        this.kBlock = this.add.rectangle(125, this.h/2+225 + this.aBlock.displayHeight*2, 75, this.river.displayHeight*0.15, 0xff0000).setOrigin(0.5)
        this.lBlock = this.add.rectangle(125, this.h/2+250 + this.aBlock.displayHeight*3, 75, this.river.displayHeight*0.15, 0xff9900).setOrigin(0.5)
        this.add.image(250, this.h/2+175, 'arrow').setOrigin(0.5).setScale(0.15)
        this.add.image(250, this.sBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(270)
        this.add.image(250, this.kBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(90)
        this.add.image(250, this.lBlock.y, 'arrow').setOrigin(0.5).setScale(0.15).setAngle(180)

        this.add.text(this.aBlock.x, this.aBlock.y, 'A', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        this.add.text(this.sBlock.x, this.sBlock.y, 'S', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        this.add.text(this.kBlock.x, this.kBlock.y, 'K', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        this.add.text(this.lBlock.x, this.lBlock.y, 'L', {fontSize: '32px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
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
            this.score += this.rows[0].hit(this.time.now)
            this.scoreText.text = 'Score: ' + this.score
            //bold aBlock border
            this.aBlock.setStrokeStyle(5, 0x000000)
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
            this.aBlock.setStrokeStyle(0, 0x000000)
        })
        this.input.keyboard?.on('keydown-S', () => {
            this.score += this.rows[1].hit(this.time.now)
            this.scoreText.text = 'Score: ' + this.score
            //bold sBlock border
            this.sBlock.setStrokeStyle(5, 0x000000)
            troll.setScale(0.5, 1)
        })
        this.input.keyboard?.on('keyup-S', () => {
            //unbold sBlock border
            this.sBlock.setStrokeStyle(0, 0x000000)
            troll.setScale(1)
        })
        this.input.keyboard?.on('keydown-K', () => {
            this.score += this.rows[2].hit(this.time.now)
            this.scoreText.text = 'Score: ' + this.score
            //bold kBlock border
            this.kBlock.setStrokeStyle(5, 0x000000)
            troll.setScale(0.5, 1)
            troll.flipX = true
        })
        this.input.keyboard?.on('keyup-K', () => {
            //unbold kBlock border
            this.kBlock.setStrokeStyle(0, 0x000000)
            troll.setScale(1)
            troll.flipX = false
        })
        this.input.keyboard?.on('keydown-L', () => {
            this.score += this.rows[3].hit(this.time.now)
            this.scoreText.text = 'Score: ' + this.score
            //bold lBlock border
            this.lBlock.setStrokeStyle(5, 0x000000)
            troll.setScale(1, 0.5)
        })
        this.input.keyboard?.on('keyup-L', () => {
            //unbold lBlock border
            this.lBlock.setStrokeStyle(0, 0x000000)
            troll.setScale(1)
        })
        
    }
    create() {
        this.setUp()
        this.loadSong()
        
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

        this.load.yaml('you_qua', youQua)
        this.load.yaml('dr_time_qua', drTimeQua)
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
        this.add.image(this.w/2, this.h/2-25, 'troll').setOrigin(0.5,1)

        let beginBtn = this.add.rectangle(this.w/2, this.h*0.7, this.w*0.1, 100, 0x6aa84f)
        this.add.text(beginBtn.x, beginBtn.y, 'Begin', {fontSize: '40px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        beginBtn.setInteractive({useHandCursor: true})
        beginBtn.on('pointerdown', () => {
            this.sound.play('selectsound')
            this.sound.stopByKey('bgsound')
            this.scene.start('SongSelect')
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
class SongSelect extends Phaser.Scene {
    w!: number
    h!: number
    constructor() {
        super('SongSelect')
    }
    create(){
        this.w = this.game.config.width as number
        this.h = this.game.config.height as number
        this.add.text(this.w/2, this.h*0.1, 'Song Select', {fontSize: '64px', color: '#000000', fontStyle: 'bold'}).setOrigin(0.5)
        let l1 = this.add.rectangle(this.w/3, this.h/2, this.w/4, 400, 0x6aa84f)
        let l2 = this.add.rectangle(this.w*2/3, this.h/2, this.w/4, 400, 0x6aa84f)
        this.add.text(l1.x, l1.y, 'Doctor Time OST \n- Connor Green', {
            fontSize: '40px', 
            color: '#000000', 
            fontStyle: 'bold', 
            align: 'center',
            wordWrap: {width: l1.width*0.9, useAdvancedWrap: true}
        }).setOrigin(0.5)
        this.add.text(l2.x, l2.y, 'You \n- Connor Green', {fontSize: '40px', color: '#000000', fontStyle: 'bold', align: 'center', wordWrap: {width: l1.width*0.9, useAdvancedWrap: true}}).setOrigin(0.5)
        l1.setInteractive({useHandCursor: true})
        l2.setInteractive({useHandCursor: true})
        l1.on('pointerdown', () => {
            this.sound.stopByKey('bgsound')
            this.scene.start('Game', {song: 'dr_time_qua'})
        })
        l2.on('pointerdown', () => {
            this.sound.stopByKey('bgsound')
            this.scene.start('Game', {song: 'you_qua'})
        })
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

class YamlFile extends Phaser.Loader.File {
    constructor(loader: Phaser.Loader.LoaderPlugin, key: string, url: string) {
        super(loader, { type: 'yaml', key, url });
        this.cache = this.loader.cacheManager.addCustom('yaml');
    }

    onProcess() {
        if (this.state !== Phaser.Loader.FILE_POPULATED) {
            this.state = Phaser.Loader.FILE_PROCESSING;

            this.data = YAML.parse(this.xhrLoader!.responseText)
        }

        this.onProcessComplete();
    }
}

class YamlFilePlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager: Phaser.Plugins.PluginManager) {
        super(pluginManager);

        pluginManager.registerFileType('yaml', this.yamlFileCallback)
    }

    yamlFileCallback(key: string, url: string) {
        // @ts-ignore
        this.addFile(new YamlFile(this, key, url))
        return this
    }
}

let game = new Phaser.Game({
    type: Phaser.WEBGL,
    plugins: {
        global: [
            { key: 'YamlFilePlugin', plugin: YamlFilePlugin, start: true },
        ]
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    backgroundColor: '#9fc5e8',
    parent: 'app',
    title: "ARTG120 Final",
    scene: [Menu, SongSelect, Controls, Game]
})

declare global {
    interface Window { game: Phaser.Game }
}

window.game = game;
