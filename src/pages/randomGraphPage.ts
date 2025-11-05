import { NoiseType, PauseButtonState } from '../lib/Enums';
import { RandomGraphSketch } from '../sketches/randomGraphSketch';

// Create sketch instance
const sketch = new RandomGraphSketch('canvas-container');

// Get button references from HTML
const pauseButton = document.getElementById('pause-button') as HTMLButtonElement;
const noiseTypeSelect = document.getElementById('noise-type') as HTMLSelectElement;

// Noise type selection functionality
noiseTypeSelect.addEventListener('change', (event) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    sketch.setNoiseType(NoiseType[selectedValue as keyof typeof NoiseType]);
});

// Pause/Resume functionality
pauseButton.addEventListener('click', () => {
    sketch.togglePause();
    pauseButton.textContent = PauseButtonState.toUIString(sketch.getPausedState());
});

