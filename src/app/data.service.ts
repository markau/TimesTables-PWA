import { Injectable } from "@angular/core";

@Injectable()
export class DataService {
  constructor() {}

  public testState = {
    x: 0,
    y: 2,
    remainingX: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    // remainingX: [1, 2],
    completedX: [],
    incorrectX: [],
    answerBuffer: "",
    isTestStarted: false,
    isTestComplete: false,
    elapsedMilliSeconds: 0,
    finalMilliSeconds: 0
  };

  public resetTest = () => {
    this.testState.x = 0;
    this.testState.y = 2;
    this.testState.remainingX = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // this.testState.remainingX = [1, 2];
    this.testState.completedX = [];
    this.testState.incorrectX = [];
    this.testState.answerBuffer = "";
    this.testState.isTestStarted = false;
    this.testState.isTestComplete = false;
    this.testState.elapsedMilliSeconds = 0;
    this.testState.finalMilliSeconds = 0;
  }

  public changeNumberSet = (number) => {
    this.testState.y = number;
  }

  public startTest = () => {
    this.testState.x = this.testState.remainingX[
      Math.floor(Math.random() * this.testState.remainingX.length)
    ];
    this.testState.isTestStarted = true;
  }

  public cancelTest = () => {
    this.resetTest();
  }

  public doBackspace = () => {
    this.testState.answerBuffer = this.testState.answerBuffer.substring(
      0,
      this.testState.answerBuffer.length - 1
    );
  }

  public enterNumberIntoAnswerBuffer = (number) => {
      // Add entry to buffer if it won't be exceeding 3
      if (this.testState.answerBuffer.length < 3) {
        this.testState.answerBuffer =
          this.testState.answerBuffer + number;
      }
  }

  public verifyAnswer = () => {
    // Is it correct
    const computedAnswer = this.testState.x * this.testState.y;
    const isCorrect =
      parseInt(this.testState.answerBuffer, 10) === computedAnswer;

    if (isCorrect) {
      this.testState.completedX.push(this.testState.x);
      this.testState.remainingX.splice(
        this.testState.remainingX.indexOf(this.testState.x),
        1
      );
    } else {
      this.testState.incorrectX.push(this.testState.x);
    }

    // setup for next question
    if (this.testState.remainingX.length === 0) {
      this.testState.isTestComplete = true;
      this.testState.isTestStarted = false;
      this.testState.finalMilliSeconds = this.testState.elapsedMilliSeconds;
    } else {
      this.testState.answerBuffer = "";
      this.testState.x = this.testState.remainingX[
        Math.floor(Math.random() * this.testState.remainingX.length)
      ];
    }

    return isCorrect;
  }
}
