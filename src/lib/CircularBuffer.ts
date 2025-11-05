export class CircularBuffer<T> implements Iterable<T> {
    private buffer: T[];
    private capacity: number;
    private currentIndex: number = 0;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.buffer = [];
    }
    [Symbol.iterator]() {
        let count = 0;
        let currentIndex = this.buffer.length < this.capacity ? 0 : this.currentIndex;
        return {
            next: (): IteratorResult<T> => {
                if (count === this.buffer.length) {
                    return {
                        done: true,
                        value: null
                    };
                } else {
                    const value = this.buffer[currentIndex];
                    count += 1;
                    currentIndex = (currentIndex + 1) % this.buffer.length;
                    return {
                        done: false,
                        value: value
                    };
                }
            }
        };
    }

    public add(item: T): [number, number, number] {
        if (this.buffer.length < this.capacity) {
            this.buffer.push(item);
        } else {
            this.buffer[this.currentIndex] = item;
        }
        this.currentIndex = (this.currentIndex + 1) % this.capacity;
        return [this.currentIndex, this.buffer.length < this.capacity ? 0 : this.currentIndex, this.buffer.length];
    }

    public getBuffer(): T[] {
        return this.buffer;
    }
}