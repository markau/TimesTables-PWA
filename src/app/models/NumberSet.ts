export class NumberSet {
    remainingX: number[];
    completedX: number[];
    incorrectX: number[];
    y: number;
    constructor(
        remainingX: number[],
        completedX: number[],
        incorrectX: number[],
        y: number
    ) {
        this.remainingX = remainingX;
        this.completedX = completedX;
        this.incorrectX = incorrectX;
        this.y = y;
    }
}
