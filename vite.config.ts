import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: './index.html',
        randomCircles: './random-circles.html',
        bouncingBall: './bouncing-ball.html',
      },
    },
  },
});