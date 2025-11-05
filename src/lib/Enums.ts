export namespace PauseButtonState {
    export enum State {
        PAUSE = 'Pause',
        RESUME = 'Resume'
    }
    export function toUIString(state: State): string {
        return state == State.PAUSE ? 'Resume' : 'Pause';
    }
}

export enum NoiseType {
    RANDOM = 'random',
    PERLIN = 'perlin'
}