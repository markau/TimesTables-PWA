import { NumberSet } from "./NumberSet";

export class TestData {
  sets: Array<NumberSet>;
  currentX: number;
  currentY: number;
  answerBuffer: string;
  isTestStarted: boolean;
  isTestComplete: boolean;
  elapsedMilliSeconds: number;
  finalMilliSeconds: number;
  constructor() {
    this.sets = [new NumberSet()];
    this.resetTestData();
  }
  resetTestData() {
    this.resetSets();
    this.answerBuffer = "";
    this.getQuestionPair();
    this.isTestStarted = false;
    this.isTestComplete = false;
    this.elapsedMilliSeconds = 0;
    this.finalMilliSeconds = 0;
  }
  resetSets(): void {
    this.sets.forEach(set => {
      set.resetSet(set.y);
    });
  }
  updateNumberSet(y: number): void {
    const found: NumberSet = this.sets.find(item => item.y !== y);
    if (found) {
      // Remove
      const index = this.sets.indexOf(found);
      this.sets = this.sets.splice(index);
    } else {
      // Add
      this.sets.push(new NumberSet(y));
    }
  }
  getSelectedNumberSets(): Array<number> {
    return this.sets.map(set => set.y);
  }
  getQuestionPair(): void {
    const randomSet = this.sets[Math.floor(Math.random() * this.sets.length)];
    const randomX =
      randomSet.remainingX[
        Math.floor(Math.random() * randomSet.remainingX.length)
      ];
    this.currentX = randomX;
    this.currentY = randomSet.y;
  }
  enterAnswer(answer: number): void {
    // Limit answer buffer to 3 chars
    if (this.answerBuffer.length < 3) {
      this.answerBuffer = this.answerBuffer + answer.toString();
    }
  }
  doBackspace(): void {
    this.answerBuffer = this.answerBuffer.substring(
      0,
      this.answerBuffer.length - 1
    );
  }
  areTestQuestionsRemaining(): boolean {
    this.sets.forEach(set => {
      if (set.remainingX.length > 0) {
        return true;
      }
    });
    return false;
  }

  verifyAnswer(): boolean {
    // Is it correct
    const computedAnswer: number = this.currentX * this.currentY;
    const isCorrect = parseInt(this.answerBuffer, 10) === computedAnswer;

    // Find the current set we're working with
    const thisNumberSet = this.sets.find(set => set.y === this.currentY);

    if (isCorrect) {
      thisNumberSet.completedX.push(this.currentX);
      thisNumberSet.remainingX.splice(
        thisNumberSet.remainingX.indexOf(this.currentX),
        1
      );
    } else {
      thisNumberSet.incorrectX.push(this.currentX);
    }

    // setup for next question
    if (this.areTestQuestionsRemaining()) {
      this.answerBuffer = "";
      this.getQuestionPair();
    } else {
      this.isTestComplete = true;
      this.isTestStarted = false;
      this.finalMilliSeconds = this.elapsedMilliSeconds;
    }

    return isCorrect;
  }
}
