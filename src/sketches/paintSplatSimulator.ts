import p5 from 'p5';

export class PaintSplatSimulatorSketch {
    private p5Instance: p5 | null = null;
    private isPaused: boolean = false;
    private canvasWidth: number = 1000;
    private canvasHeight: number = 800;
    private brushRadius: number = 40;
    private brushGraphics: p5.Graphics | null = null;

    constructor(containerElementId: string) {
        const container = document.getElementById(containerElementId);
        if (!container) {
            throw new Error(`Element with id '${containerElementId}' not found`);
        }
        this.p5Instance = new p5(this.sketch.bind(this), container);
    }

    private sketch(p: p5): void {
        p.setup = () => {
            p.createCanvas(this.canvasWidth, this.canvasHeight);
            p.pixelDensity(1);
            p.background(255);
        };
        p.mouseClicked = (event: MouseEvent) => {
            // Create new brush stroke image to use for dragging
            const inmemoryCanvas = p.createGraphics(this.brushRadius * 2, this.brushRadius * 2);
            inmemoryCanvas.background(p.color(255, 255, 255, 0));
            inmemoryCanvas.stroke(0, 200);
            inmemoryCanvas.strokeWeight(3);
            for (let i = 0; i < 500; i++) {
                inmemoryCanvas.stroke(0, 200);
                inmemoryCanvas.strokeWeight(3);
                const brushX = p.randomGaussian(this.brushRadius, 12);
                const brushY = p.randomGaussian(this.brushRadius, 12);
                inmemoryCanvas.point(brushX, brushY);
            }
            this.brushGraphics = inmemoryCanvas;
            p.image(inmemoryCanvas, event.offsetX - this.brushRadius, event.offsetY - this.brushRadius);
        };
        p.mouseDragged = (event: MouseEvent) => {
            if (this.brushGraphics) {
                p.image(this.brushGraphics, event.offsetX - this.brushRadius, event.offsetY - this.brushRadius);
            }
        }
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

