import { Injectable } from "@angular/core";
import { NumberSet } from "./models/NumberSet";

@Injectable()
export class DataService {
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

  // Private methods
  private resetSets(): void {
    this.sets.forEach(set => {
      set.resetSet(set.y);
    });
  }
  private getSetsWithRemainingQuestions(): Array<NumberSet> {
    return this.sets.filter(set => set.remainingX.length > 0);
  }
  private getRandomSetWithRemainingQuestions(): NumberSet {
    const remainingSets = this.getSetsWithRemainingQuestions();
    return remainingSets[Math.floor(Math.random() * remainingSets.length)];
  }
  private areTestQuestionsRemaining(): boolean {
    const result = this.getSetsWithRemainingQuestions();
    return result.length > 0;
  }
  private getRandomQuestion(): [number, number] {
    const set = this.getRandomSetWithRemainingQuestions();
    const randomX =
      set.remainingX[Math.floor(Math.random() * set.remainingX.length)];
    return [randomX, set.y];
  }
  private clearAnswerBuffer(): void {
    this.answerBuffer = "";
  }
  private resetTestData() {
    this.resetSets();
    this.clearAnswerBuffer();
    this.isTestStarted = false;
    this.isTestComplete = false;
    this.elapsedMilliSeconds = 0;
    this.finalMilliSeconds = 0;
  }

  // Public methods
  public cancelTest = (): void => {
    this.resetTest();
  }
  public resetTest(): void {
    this.resetTestData();
  }
  public startTest(): void {
    this.getQuestionPair();
    this.isTestStarted = true;
  }
  public updateNumberSet(y: number): void {
    const found: NumberSet = this.sets.find(item => item.y === y);
    if (found) {
      // Remove
      const index = this.sets.indexOf(found);
      const temp = [...this.sets];
      temp.splice(index, 1);
      this.sets = temp;
    } else {
      // Add
      this.sets.push(new NumberSet(y));
    }
  }
  public getSelectedNumberSets(): Array<number> {
    return this.sets.map(set => set.y);
  }
  public getQuestionPair(): void {
    const question: [number, number] = this.getRandomQuestion();
    this.currentX = question[0];
    this.currentY = question[1];
  }
  public enterAnswer(answer: number): void {
    // Limit answer buffer to 3 chars
    if (this.answerBuffer.length < 3) {
      this.answerBuffer = this.answerBuffer + answer.toString();
    }
  }
  public doBackspace(): void {
    this.answerBuffer = this.answerBuffer.substring(
      0,
      this.answerBuffer.length - 1
    );
  }

  public verifyAnswer(): boolean {
    // Is it correct
    const computedAnswer: number = this.currentX * this.currentY;
    const isCorrect: boolean =
      parseInt(this.answerBuffer, 10) === computedAnswer;

    // Find the current set we're working with
    const thisNumberSet: NumberSet = this.sets.find(
      set => set.y === this.currentY
    );

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
      this.clearAnswerBuffer();
      this.getQuestionPair();
    } else {
      this.isTestComplete = true;
      this.isTestStarted = false;
      this.finalMilliSeconds = this.elapsedMilliSeconds;
    }

    return isCorrect;
  }

  // Results
  public numberOfQuestionsTotal(): number {
    return this.sets.length * 12;
  }
  public numberOfQuestionsComplete(): number {
    let result = 0;
    this.sets.forEach(set => (result = result + set.completedX.length));
    return result;
  }
  public numberOfQuestionsIncorrect(): number {
    let result = 0;
    this.sets.forEach(set => (result = result + set.incorrectX.length));
    return result;
  }
  public setsTestedArray(): Array<number> {
    return this.sets.sort().map(set => {
      return set.y;
    });
  }
  public setsTestedReport(): string {
    let result = "";
    this.setsTestedArray().forEach(y => {
      result += `${y}x `;
    });
    return result;
  }
  public incorrectAnswerReport(): string {
    let result = "";
    this.sets.forEach(set => {
      if (set.incorrectX.length > 0) {
        const uniqueSet = [...new Set(set.incorrectX)];
        uniqueSet.sort().forEach(incorrectResult => {
          result += `${incorrectResult}x${set.y} `;
        });
      }
    });
    return result;
  }
  public accuracyPercentage(): number {
    return ((12 - this.numberOfQuestionsIncorrect()) / this.numberOfQuestionsTotal() * 100);
  }

}
