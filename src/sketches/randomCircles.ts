import p5 from 'p5';

export class RandomCirclesSketch {
    private p5Instance: p5 | null = null;
    private isPaused: boolean = false;

    constructor(containerElementId: string) {
        const container = document.getElementById(containerElementId);
        if (!container) {
            throw new Error(`Element with id '${containerElementId}' not found`);
        }
        this.p5Instance = new p5(this.sketch.bind(this), container);
    }

    private sketch(p: p5): void {
        p.setup = () => {
            p.createCanvas(800, 600);
            p.background(255);
        };

        p.draw = () => {
            if (!this.isPaused) {
                // Example drawing logic - random circles
                p.fill(p.random(255), p.random(255), p.random(255), 100);
                p.ellipse(p.random(p.width), p.random(p.height), 50, 50);
            }
        };
    }

    public togglePause(): void {
        this.isPaused = !this.isPaused;
    }

    public getPausedState(): boolean {
        return this.isPaused;
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
