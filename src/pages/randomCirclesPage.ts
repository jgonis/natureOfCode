import { RandomCirclesSketch } from '../sketches/randomCircles';

// Create sketch instance
const sketch = new RandomCirclesSketch('canvas-container');

// Get button references from HTML
const pauseButton = document.getElementById('pause-button') as HTMLButtonElement;
const resetButton = document.getElementById('reset-button') as HTMLButtonElement;
const workerButton = document.getElementById('worker-button') as HTMLButtonElement;

// Pause/Resume functionality
pauseButton.addEventListener('click', () => {
    sketch.togglePause();
    pauseButton.textContent = sketch.getPausedState() ? 'Resume' : 'Pause';
});

// Reset functionality
resetButton.addEventListener('click', () => {
    sketch.reset();
});

// Web Worker functionality
workerButton.addEventListener('click', () => {
    const worker = new Worker(new URL('../workers/calculator.worker.ts', import.meta.url), {
        type: 'module'
    });

    worker.postMessage({ operation: 'calculate', value: 42 });

    worker.onmessage = (event) => {
        console.log('Result from worker:', event.data);
        alert(`Worker calculation result: ${event.data.result}`);
    };

    worker.onerror = (error) => {
        console.error('Worker error:', error);
    };
});
