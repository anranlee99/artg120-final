type TimingPoint = {
    StartTime: number,
    Bpm: number,
    SliderVelocities: number[],
}
export type HitObject = {
    StartTime: number,
    Lane: number,
    KeySounds: string[], //any?
}
export type Qua = {
    AudioFile: string,
    SongPreviewTime: number,
    BackgroundFile: string,
    MapId: string,
    Mode: string,
    Tiitle: string,
    Artist: string,
    Source: string,
    Tags: string[],
    Creator: string,
    DifficultyName: string,
    Description: string,
    EditorLayers: string[], //any?
    CustomAudioSamples: string[], //any?
    SoundEffects: string[], //any?
    TimingPoints: TimingPoint,
    SliderVelocities: number[], //any?
    HitObjects: HitObject[],
}