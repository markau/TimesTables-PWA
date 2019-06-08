import { Injectable } from "@angular/core";
import { TestData } from "./models/TestData";

@Injectable()
export class DataService {
  private testState: TestData;

  constructor() {
    this.testState = new TestData();
  }
  public resetTest = (): void => {
    this.testState.resetTestData();
  }
  public changeNumberSet = (number: number): void => {
    this.testState.updateNumberSet(number);
  }
  public selectedNumberSets = (): Array<number> => {
    return this.testState.getSelectedNumberSets();
  }
  public startTest = (): void => {
    this.testState.isTestStarted = true;
  }
  public cancelTest = (): void => {
    this.resetTest();
  }
  public doBackspace = (): void => {
    this.testState.doBackspace();
  }
  public enterNumberIntoAnswerBuffer = (answer: number): void => {
    this.testState.enterAnswer(answer);
  }
  public verifyAnswer = (): boolean => {
    return this.testState.verifyAnswer();
  }
}
