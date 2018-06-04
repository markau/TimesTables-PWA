import { TestBed, inject } from "@angular/core/testing";

import { DataService } from "./data.service";

describe("DataService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });
  });

  it(
    "should be created",
    inject([DataService], (service: DataService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    "testState object should be instantiated",
    inject([DataService], (service: DataService) => {
      expect(service.testState).toBeTruthy();
      expect(service.testState.y).toEqual(2);
    })
  );

  it(
    "resetTest() method should reset initial values of testState",
    inject([DataService], (service: DataService) => {
      service.testState.y = 4;
      service.resetTest();
      expect(service.testState.y).toEqual(2);
      expect(service.testState.isTestStarted).toEqual(false);
    })
  );

  it(
    "startTest() method should set appropriate values in testState",
    inject([DataService], (service: DataService) => {
      service.startTest();
      expect(service.testState.isTestStarted).toEqual(true);
    })
  );

  it(
    "cancelTest() method should set appropriate values in testState",
    inject([DataService], (service: DataService) => {
      service.startTest();
      expect(service.testState.isTestStarted).toEqual(true);
      service.cancelTest();
      expect(service.testState.isTestStarted).toEqual(false);
    })
  );

  it(
    "verifyAnswer() handles correct result",
    inject([DataService], (service: DataService) => {
      service.startTest();

      const y = service.testState.y; // 2
      expect(y).toEqual(2);

      service.testState.x = 6; // random
      const x = service.testState.x; // 6
      expect(x).toEqual(6);

      const computedAnswer = x * y;
      service.testState.answerBuffer = computedAnswer.toString(); // random

      const result: boolean = service.verifyAnswer();
      expect(result).toEqual(true);

      expect(service.testState.completedX.length).toEqual(1);
      expect(service.testState.completedX[0]).toEqual(x);

      expect(service.testState.remainingX.length).toEqual(11);
      expect(service.testState.answerBuffer).toEqual("");
      expect(service.testState.isTestComplete).toEqual(false);
      expect(service.testState.isTestStarted).toEqual(true);
    })
  );

  it(
    "verifyAnswer() handles incorrect result",
    inject([DataService], (service: DataService) => {
      service.startTest();

      const y = service.testState.y; // 2
      expect(y).toEqual(2);

      service.testState.x = 6; // random
      const x = service.testState.x; // 6
      expect(x).toEqual(6);

      const computedAnswer = (x * y) + 3;
      service.testState.answerBuffer = computedAnswer.toString(); // random

      const result: boolean = service.verifyAnswer();
      expect(result).toEqual(false);

      expect(service.testState.incorrectX.length).toEqual(1);
      expect(service.testState.completedX.length).toEqual(0);

      expect(service.testState.remainingX.length).toEqual(12);
      expect(service.testState.answerBuffer).toEqual("");
      expect(service.testState.isTestComplete).toEqual(false);
      expect(service.testState.isTestStarted).toEqual(true);
    })
  );

  it(
    "verifyAnswer() ends test appropriately",
    inject([DataService], (service: DataService) => {
      service.startTest();

      const y = service.testState.y; // 2
      expect(y).toEqual(2);

      service.testState.x = 6; // random
      const x = service.testState.x; // 6
      expect(x).toEqual(6);

      const computedAnswer = x * y;
      service.testState.answerBuffer = computedAnswer.toString(); // random

      service.testState.remainingX = [x];

      const result: boolean = service.verifyAnswer();
      expect(result).toEqual(true);

      expect(service.testState.completedX.length).toEqual(1);
      expect(service.testState.remainingX.length).toEqual(0);
      // expect(service.testState.answerBuffer).toEqual("");
      expect(service.testState.isTestComplete).toEqual(true);
      expect(service.testState.isTestStarted).toEqual(false);

    })
  );

});
