import p5 from 'p5';
import { NoiseType, PauseButtonState } from '../lib/Enums';
import { CircularBuffer } from '../lib/CircularBuffer';
import { Point } from '../lib/Point';

export class RandomGraphSketch {
    private p5Instance: p5 | null = null;
    private isPaused: boolean = false;
    private noiseType: NoiseType = NoiseType.RANDOM;
    private readonly SKETCH_WIDTH = 800;
    private readonly SKETCH_HEIGHT = 600;
    private readonly STEP_WIDTH = 4;
    private points: CircularBuffer<number> = new CircularBuffer<number>(this.SKETCH_WIDTH / this.STEP_WIDTH);

    constructor(containerElementId: string) {
        const container = document.getElementById(containerElementId);
        if (!container) {
            throw new Error(`Element with id '${containerElementId}' not found`);
        }
        this.p5Instance = new p5(this.sketch.bind(this), container);
    }

    private sketch(p: p5): void {
        p.setup = () => {
            p.createCanvas(this.SKETCH_WIDTH, this.SKETCH_HEIGHT);
            p.background(255);
            p.strokeWeight(2);
            p.frameRate(60);
            for (let i = 0; i < this.SKETCH_WIDTH / this.STEP_WIDTH; i++) {
                const new_y = p.random(0, this.SKETCH_HEIGHT)
                this.points.add(new_y);
            }
        };

        p.draw = () => {
            if (!this.isPaused) {
                p.background(255);
                let lastY: number = 0;
                const new_y = p.random(0, this.SKETCH_HEIGHT)
                this.points.add(new_y);
                let currentX = 0;
                for (const y of this.points) {
                    if (currentX === 0) {
                        lastY = y;
                        p.point(currentX, y);
                    } else {
                        p.line(currentX - this.STEP_WIDTH, lastY, currentX, y);
                    }
                    lastY = y;
                    currentX += this.STEP_WIDTH;
                }
            }
        };
    }

    public togglePause(): void {
        this.isPaused = !this.isPaused;
    }

    public getPausedState(): PauseButtonState.State {
        return this.isPaused ? PauseButtonState.State.PAUSE : PauseButtonState.State.RESUME;
    }

    public setNoiseType(type: NoiseType): void {
        this.noiseType = type;
        // Stub: Logic to switch between random and perlin noise will go here
    }

    public reset(): void {
        if (this.p5Instance) {
            this.p5Instance.clear();
            this.p5Instance.background(255);
        }
    }

    public getP5Instance(): p5 | null {
        return this.p5Instance;
    }
}
