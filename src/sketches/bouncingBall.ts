import p5 from 'p5';
import { Point } from '../lib/Point';

export class BouncingBallSketch {
    private p5Instance: p5 | null = null;
    private isPaused: boolean = false;
    private position: Point = new Point(100, 100);
    private velocity: Point = new Point(3, 4);

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
                p.background(255, 255, 255, 25); // Slight trail effect

                // Update position using Point class
                this.position = this.position.add(this.velocity);

                // Bounce off edges
                if (this.position.x > p.width - 25 || this.position.x < 25) {
                    this.velocity = new Point(-this.velocity.x, this.velocity.y);
                }
                if (this.position.y > p.height - 25 || this.position.y < 25) {
                    this.velocity = new Point(this.velocity.x, -this.velocity.y);
                }

                // Draw ball
                p.fill(100, 150, 255);
                p.ellipse(this.position.x, this.position.y, 50, 50);
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
            this.position = new Point(100, 100);
            this.velocity = new Point(3, 4);
            this.p5Instance.clear();
            this.p5Instance.background(255);
        }
    }

    public getP5Instance(): p5 | null {
        return this.p5Instance;
    }
}
