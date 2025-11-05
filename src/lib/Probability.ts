function AcceptRejectProbability(): number {
    while (true) {
        let r1 = Math.random();
        let probability = r1;
        let r2 = Math.random();
        if (r2 < probability) {
            return r1;
        }
    }
}