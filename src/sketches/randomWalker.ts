import p5 from 'p5';

export class RandomWalkerSketch {
    private p5Instance: p5 | null = null;
    private isPaused: boolean = false;
    private canvasWidth: number = 1000;
    private canvasHeight: number = 800;
    private walker: Walker;

    constructor(containerElementId: string) {
        const container = document.getElementById(containerElementId);
        if (!container) {
            throw new Error(`Element with id '${containerElementId}' not found`);
        }
        this.p5Instance = new p5(this.sketch.bind(this), container);
        this.walker = new Walker(this.canvasWidth, this.canvasHeight);
    }

    private sketch(p: p5): void {
        p.setup = () => {
            p.createCanvas(this.canvasWidth, this.canvasHeight);
            p.pixelDensity(1);
            p.background(255);
        };

        p.draw = () => {
            if (!this.isPaused) {
                this.walker.step(p.mouseX, p.mouseY);
                p.stroke(0);
                p.point(this.walker.getX(), this.walker.getY());
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

class Walker {
    private x: number;
    private y: number;
    private canvasWidth: number;
    private canvasHeight: number;
    private stepSize: number = 1;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.floor(canvasWidth / 2);
        this.y = Math.floor(canvasHeight / 2);
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    public step(mouseX: number, mouseY: number): void {
        const followMouse = Math.random();
        if (followMouse < 0.5) {
            const length = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
            const xOffset = (mouseX - this.x) / length;
            const yOffset = (mouseY - this.y) / length;
            this.x = Math.round(this.x + xOffset);
            this.y = Math.round(this.y + yOffset);
        } else {
            const choice = Math.floor(Math.random() * 4);
            switch (choice) {
                case 0:
                    this.x = Math.max(this.x - this.stepSize, 0);
                    break;
                case 1:
                    this.y = Math.max(this.y - this.stepSize, 0);
                    break;
                case 2:
                    this.x = Math.min(this.x + this.stepSize, this.canvasWidth - 1);
                    break;
                case 3:
                    this.y = Math.min(this.y + this.stepSize, this.canvasHeight - 1);
                    break;
            }
        }
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }
}
