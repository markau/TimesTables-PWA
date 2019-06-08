const initialXSet: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const defaultNumberSet = 2;

export class NumberSet {
  remainingX: number[];
  completedX: number[];
  incorrectX: number[];
  y: number;
  constructor(y?: number) {
    this.resetSet(y);
  }
  resetSet(y?: number) {
    this.remainingX = initialXSet;
    this.completedX = [];
    this.incorrectX = [];
    this.y = y === undefined ? defaultNumberSet : y;
  }
}
