import { describe, it, expect } from 'vitest';
import { Point } from '../lib/Point';

describe('Point', () => {
    describe('constructor', () => {
        it('should create a point with x and y coordinates', () => {
            const point = new Point(3, 4);
            expect(point.x).toBe(3);
            expect(point.y).toBe(4);
        });
    });

    describe('distanceTo', () => {
        it('should calculate the distance between two points', () => {
            const p1 = new Point(0, 0);
            const p2 = new Point(3, 4);
            expect(p1.distanceTo(p2)).toBe(5);
        });

        it('should return 0 for the same point', () => {
            const p1 = new Point(5, 5);
            const p2 = new Point(5, 5);
            expect(p1.distanceTo(p2)).toBe(0);
        });
    });

    describe('add', () => {
        it('should add two points together', () => {
            const p1 = new Point(1, 2);
            const p2 = new Point(3, 4);
            const result = p1.add(p2);
            expect(result.x).toBe(4);
            expect(result.y).toBe(6);
        });

        it('should not modify the original points', () => {
            const p1 = new Point(1, 2);
            const p2 = new Point(3, 4);
            p1.add(p2);
            expect(p1.x).toBe(1);
            expect(p1.y).toBe(2);
        });
    });

    describe('subtract', () => {
        it('should subtract one point from another', () => {
            const p1 = new Point(5, 7);
            const p2 = new Point(2, 3);
            const result = p1.subtract(p2);
            expect(result.x).toBe(3);
            expect(result.y).toBe(4);
        });
    });

    describe('multiply', () => {
        it('should multiply a point by a scalar', () => {
            const p = new Point(2, 3);
            const result = p.multiply(3);
            expect(result.x).toBe(6);
            expect(result.y).toBe(9);
        });

        it('should handle negative scalars', () => {
            const p = new Point(4, 5);
            const result = p.multiply(-1);
            expect(result.x).toBe(-4);
            expect(result.y).toBe(-5);
        });
    });

    describe('magnitude', () => {
        it('should calculate the magnitude of the vector', () => {
            const p = new Point(3, 4);
            expect(p.magnitude()).toBe(5);
        });

        it('should return 0 for origin', () => {
            const p = new Point(0, 0);
            expect(p.magnitude()).toBe(0);
        });
    });

    describe('normalize', () => {
        it('should normalize a vector to unit length', () => {
            const p = new Point(3, 4);
            const normalized = p.normalize();
            expect(normalized.x).toBeCloseTo(0.6);
            expect(normalized.y).toBeCloseTo(0.8);
            expect(normalized.magnitude()).toBeCloseTo(1);
        });

        it('should handle zero vector', () => {
            const p = new Point(0, 0);
            const normalized = p.normalize();
            expect(normalized.x).toBe(0);
            expect(normalized.y).toBe(0);
        });
    });

    describe('clone', () => {
        it('should create a copy of the point', () => {
            const p1 = new Point(5, 10);
            const p2 = p1.clone();
            expect(p2.x).toBe(5);
            expect(p2.y).toBe(10);
            expect(p2).not.toBe(p1); // Different instances
        });
    });

    describe('equals', () => {
        it('should return true for equal points', () => {
            const p1 = new Point(3, 4);
            const p2 = new Point(3, 4);
            expect(p1.equals(p2)).toBe(true);
        });

        it('should return false for different points', () => {
            const p1 = new Point(3, 4);
            const p2 = new Point(3, 5);
            expect(p1.equals(p2)).toBe(false);
        });
    });

    describe('toString', () => {
        it('should return a string representation of the point', () => {
            const p = new Point(3, 4);
            expect(p.toString()).toBe('Point(3, 4)');
        });
    });
});
