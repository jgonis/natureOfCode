import { describe, it, expect } from 'vitest';
import { Point } from '../lib/Point';
import { CircularBuffer } from '../lib/CircularBuffer';

describe('CircularBuffer', () => {
    describe('constructor', () => {
        it('should create a circular buffer with a given size', () => {
            const buffer = new CircularBuffer(5);
            expect(buffer.getBuffer().length).toBe(0);
        });
    });
});

describe('add value to buffer', () => {
    it('should add a value to the buffer', () => {
        const buffer = new CircularBuffer(5);
        buffer.add(1);
        expect(buffer.getBuffer()).toEqual([1]);
    });

    it('buffer should wrap around after exceeding capacity', () => {
        const buffer = new CircularBuffer(5);
        buffer.add(1);
        buffer.add(2);
        buffer.add(3);
        buffer.add(4);
        buffer.add(5);
        buffer.add(6);
        expect(buffer.getBuffer()).toEqual([6, 2, 3, 4, 5]);
    });

    it('buffer should wrap around after exceeding capacity', () => {
        const buffer = new CircularBuffer(3);
        let result = buffer.add(1);
        expect(result[0]).toEqual(1);
        expect(result[1]).toEqual(0);
        expect(result[2]).toEqual(1);
        result = buffer.add(2);
        expect(result[0]).toEqual(2);
        expect(result[1]).toEqual(0);
        expect(result[2]).toEqual(2);
        result = buffer.add(3);
        expect(result[0]).toEqual(0);
        expect(result[1]).toEqual(0);
        expect(result[2]).toEqual(3);
        expect(buffer.getBuffer()).toEqual([1, 2, 3]);
        result = buffer.add(4);
        expect(buffer.getBuffer()).toEqual([4, 2, 3]);
        expect(result[0]).toEqual(1);
        expect(result[1]).toEqual(1);
        expect(result[2]).toEqual(3);
        // expect(buffer.getBuffer()).toEqual([6, 2, 3, 4, 5]);
    });

    it('buffer iteration tests', () => {
        const buffer = new CircularBuffer(3);
        let result = [];
        buffer.add(1);
        for (const val of buffer) {
            result.push(val);
        }
        expect(result).toEqual([1]);
        buffer.add(2);
        buffer.add(3);
        result = [];
        for (const val of buffer) {
            result.push(val);
        }
        expect(result).toEqual([1, 2, 3]);

        buffer.add(4);
        result = [];
        for (const val of buffer) {
            result.push(val);
        }
        expect(result).toEqual([2, 3, 4]);
    });

});
