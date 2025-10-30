# P5.js Vite TypeScript Project

A modular p5.js project built with TypeScript and Vite, featuring multiple sketches with separate pages.

## Project Structure

```
p5-vite-app/
├── index.html                      # Main gallery page
├── random-circles.html             # Random circles sketch page
├── bouncing-ball.html              # Bouncing ball sketch page
├── src/
│   ├── sketches/                   # Sketch classes
│   │   ├── randomCircles.ts        # Random circles sketch
│   │   └── bouncingBall.ts         # Bouncing ball sketch
│   ├── pages/                      # Page entry points
│   │   ├── randomCirclesPage.ts    # Random circles page script
│   │   └── bouncingBallPage.ts     # Bouncing ball page script
│   ├── lib/                        # Reusable utility classes
│   │   └── Point.ts                # 2D Point class
│   ├── workers/                    # Web Workers
│   │   └── calculator.worker.ts    # Example worker for calculations
│   ├── __tests__/                  # Unit tests
│   │   └── Point.test.ts           # Point class tests
│   └── styles.css                  # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts                # Test configuration
```

## Features

- ✅ TypeScript with strict type checking
- ✅ Object-oriented sketch architecture
- ✅ Multiple sketches on separate pages
- ✅ Pause/Resume control for each sketch
- ✅ Reset functionality
- ✅ Web Worker example for background calculations
- ✅ Modular and extensible design
- ✅ Unit testing with Vitest
- ✅ Reusable utility library (Point class)

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Navigate to `http://localhost:5173/` to see the sketch gallery.

### Build for production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

### Run tests
```bash
npm test              # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:run      # Run tests once (for CI)
```

## Creating a New Sketch

1. **Create a new sketch class** in `src/sketches/`:

```typescript
import p5 from 'p5';

export class MyNewSketch {
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
                // Your drawing logic here
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
}
```

2. **Create a page script** in `src/pages/myNewSketchPage.ts`

3. **Create an HTML page** `my-new-sketch.html`

4. **Update `vite.config.ts`** to include the new HTML entry point

5. **Add a link** to the new sketch in `index.html`

## Architecture

Each sketch is a self-contained class with:
- **Private state** (pause state, animation variables)
- **Public API** (togglePause, getPausedState, reset)
- **Encapsulation** of p5 instance logic
- **Type safety** with full TypeScript support and IntelliSense

This design allows you to:
- Create multiple independent sketches
- Reuse common patterns
- Test sketches in isolation
- Maintain clean, modular code

## Testing

This project uses **Vitest** for unit testing, which is optimized for Vite projects.

### Writing Tests

Tests are located in `src/__tests__/` and follow the naming convention `*.test.ts`.

Example test structure:
```typescript
import { describe, it, expect } from 'vitest';
import { Point } from '../lib/Point';

describe('Point', () => {
    it('should create a point with x and y coordinates', () => {
        const point = new Point(3, 4);
        expect(point.x).toBe(3);
        expect(point.y).toBe(4);
    });
});
```

### Running Tests

- **Watch mode** (recommended for development):
  ```bash
  npm test
  ```
  Tests will re-run automatically when files change.

- **UI mode** (visual test runner):
  ```bash
  npm run test:ui
  ```
  Opens a browser-based UI for running and debugging tests.

- **Single run** (for CI/CD):
  ```bash
  npm run test:run
  ```

### Reusable Library

The `src/lib/` folder contains reusable utility classes:

- **Point.ts**: A comprehensive 2D point class with methods for:
  - Distance calculation
  - Vector addition, subtraction, multiplication
  - Magnitude and normalization
  - Cloning and equality checking

You can use the Point class in your sketches:
```typescript
import { Point } from '../lib/Point';

const p1 = new Point(100, 200);
const p2 = new Point(300, 400);
const distance = p1.distanceTo(p2);
```

- The drawing canvas is displayed in the center of the screen.
- Use the "Pause" button to pause the simulation.
- Use the "Reset" button to clear the canvas.
- Click the "Launch Worker" button to perform a calculation in a separate thread.

## Dependencies

- p5.js: A JavaScript library for creative coding.
- Vite: A fast build tool and development server for modern web projects.

## License

This project is licensed under the MIT License.