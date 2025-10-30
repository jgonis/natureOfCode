/**
 * Represents a 2D point with x and y coordinates
 */
export class Point {
    constructor(
        public x: number,
        public y: number
    ) { }

    /**
     * Calculate the distance between this point and another point
     */
    public distanceTo(other: Point): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Add another point to this point and return a new Point
     */
    public add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    /**
     * Subtract another point from this point and return a new Point
     */
    public subtract(other: Point): Point {
        return new Point(this.x - other.x, this.y - other.y);
    }

    /**
     * Multiply this point by a scalar and return a new Point
     */
    public multiply(scalar: number): Point {
        return new Point(this.x * scalar, this.y * scalar);
    }

    /**
     * Get the magnitude (length) of the vector from origin to this point
     */
    public magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Normalize this point (convert to unit vector)
     */
    public normalize(): Point {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Point(0, 0);
        }
        return new Point(this.x / mag, this.y / mag);
    }

    /**
     * Clone this point
     */
    public clone(): Point {
        return new Point(this.x, this.y);
    }

    /**
     * Check if this point equals another point
     */
    public equals(other: Point): boolean {
        return this.x === other.x && this.y === other.y;
    }

    /**
     * Convert point to string representation
     */
    public toString(): string {
        return `Point(${this.x}, ${this.y})`;
    }
}
