import { PaintSplatSimulatorSketch } from "../sketches/paintSplatSimulator";

// Create sketch instance
const sketch = new PaintSplatSimulatorSketch('canvas-container');

// Get button references from HTML
const pauseButton = document.getElementById('pause-button') as HTMLButtonElement;
const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

// Pause/Resume functionality
pauseButton.addEventListener('click', () => {
    sketch.togglePause();
    pauseButton.textContent = sketch.getPausedState() ? 'Resume' : 'Pause';
});

// Reset functionality
resetButton.addEventListener('click', () => {
    sketch.reset();
});

