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
        this.sound.on(Phaser.Sound.Events.UNLOCKED, () => Tone.start())

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
            this.synth.unsync()
            this.synth.sync()
            
            Tone.Transport.stop()
            Tone.Transport.bpm.value = 60 / (1000 / 1000);
            const seq = new Tone.Sequence((time, note) => {
                this.synth.triggerAttackRelease(note, 0.1, time);
                // subdivisions are given as subarrays
                this.circles[i].setAlpha(0.5)
                i++
            }, ["C4", "C4", "C4", "C5"], "4n").start(0, 0);
            seq.loop = 1;
            Tone.Transport.start();
        })


    }
    create() {
        this.setUp()

        const graphics = this.add.graphics()
        graphics.fillStyle(0x00aaff, 1)
        let iconRect = this.add.rectangle(this.w * 0.9, this.h * 0.2, 200, 200).setOrigin(0.5)
        let tool = this.add.text(iconRect.x, iconRect.y, "🥁", {
            fontSize: 100,

        }).setOrigin(0.5).setPadding(10)
        let mask = graphics.fillRoundedRect(0, 0, 200, 200, 32)//.setDepth(iconRect.depth + 1)
        mask.copyPosition({
            x: iconRect.x - iconRect.width / 2,
            y: iconRect.y - iconRect.height / 2
        })
        iconRect.createGeometryMask(mask)
        iconRect.setInteractive({ useHandCursor: true, draggable: true })
        iconRect.on(Phaser.Input.Events.DRAG, (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {

            iconRect.x = dragX
            iconRect.y = dragY
            tool.x = dragX
            tool.y = dragY
            mask.copyPosition({
                x: iconRect.x - iconRect.width / 2,
                y: iconRect.y - iconRect.height / 2
            })
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
    backgroundColor: '#cccccc',
    parent: 'app',
    title: "ARTG120 Final",
    scene: [TestScene]
})

declare global {
    interface Window { game: Phaser.Game }
}

window.game = game;
