import 'phaser';
import * as Tone from 'tone';

class TestScene extends Phaser.Scene {
    synth: Tone.Synth
// gaming
    constructor() {
        super('test');

        this.synth = new Tone.Synth().toDestination()
    }

    create() {
        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.synth.triggerAttackRelease("C4", "8n")
        })
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
    parent: 'app',
    title: "ARTG120 Final",
    scene: [TestScene]
})

declare global {
    interface Window { game: Phaser.Game }
}

window.game = game;
