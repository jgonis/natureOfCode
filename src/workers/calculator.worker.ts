self.onmessage = function (event) {
    const data = event.data;

    if (data.operation === 'calculate') {
        // Perform example calculation - factorial
        const result = performCalculation(data.value);
        self.postMessage({ result });
    }
};

function performCalculation(n: number): number {
    // Example: Calculate factorial
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

export { };