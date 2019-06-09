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
    this.remainingX = [1, 2];
    this.completedX = [];
    this.incorrectX = [];
    this.y = y === undefined ? defaultNumberSet : y;
  }
}
