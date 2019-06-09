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
      expect(service).toBeTruthy();
    })
  );

  it(
    "resetTest() method should reset initial values of testState",
    inject([DataService], (service: DataService) => {
      service.resetTest();
      expect(service.isTestStarted).toEqual(false);
    })
  );

  it(
    "number set can be changed",
    inject([DataService], (service: DataService) => {
      service.updateNumberSet(3);
      expect(service.getSelectedNumberSets()).toEqual([2, 3]);
      service.updateNumberSet(3);
      expect(service.getSelectedNumberSets()).toEqual([2]);
    })
  );

  it(
    "startTest() method should set appropriate values in testState",
    inject([DataService], (service: DataService) => {
      service.startTest();
      expect(service.isTestStarted).toEqual(true);
    })
  );

  it(
    "cancelTest() method should set appropriate values in testState",
    inject([DataService], (service: DataService) => {
      service.startTest();
      expect(service.isTestStarted).toEqual(true);
      service.cancelTest();
      expect(service.isTestStarted).toEqual(false);
    })
  );

  it(
    "number can be entered into answer buffer",
    inject([DataService], (service: DataService) => {
      service.enterAnswer(3);
      expect(service.answerBuffer).toEqual("3");
    })
  );

  it(
    "number can't be entered into answer buffer where buffer length == 3",
    inject([DataService], (service: DataService) => {
      service.answerBuffer = "111";
      service.enterAnswer(3);
      expect(service.answerBuffer).toEqual("111");
    })
  );

  it(
    "backspace works on answer buffer",
    inject([DataService], (service: DataService) => {
      service.enterAnswer(3);
      service.doBackspace();
      expect(service.answerBuffer).toEqual("");
    })
  );

  it(
    "verifyAnswer() handles correct result",
    inject([DataService], (service: DataService) => {
      service.startTest();

      const y = service.currentY; // 2
      expect(y).toEqual(2);

      service.currentX = 6; // random
      const x = service.currentX; // 6
      expect(x).toEqual(6);

      const computedAnswer = x * y;
      service.answerBuffer = computedAnswer.toString(); // random

      const result: boolean = service.verifyAnswer();
      expect(result).toEqual(true);

      const currentSet = service.sets.find(set => set.y === y);

      expect(currentSet.completedX.length).toEqual(1);
      expect(currentSet.completedX[0]).toEqual(x);
      expect(currentSet.remainingX.length).toEqual(11);

      expect(service.isTestComplete).toEqual(false);
      expect(service.isTestStarted).toEqual(true);
      expect(service.answerBuffer).toEqual("");

    })
  );

  it(
    "verifyAnswer() handles incorrect result",
    inject([DataService], (service: DataService) => {
      service.startTest();

      const y = service.currentY; // 2
      expect(y).toEqual(2);

      service.currentX = 6; // random
      const x = service.currentX; // 6
      expect(x).toEqual(6);

      const computedAnswer = (x * y) + 3;
      service.answerBuffer = computedAnswer.toString(); // random

      const result: boolean = service.verifyAnswer();
      expect(result).toEqual(false);

      const currentSet = service.sets.find(set => set.y === y);

      expect(currentSet.incorrectX.length).toEqual(1);
      expect(currentSet.completedX.length).toEqual(0);
      expect(currentSet.remainingX.length).toEqual(12);

      expect(service.answerBuffer).toEqual("");
      expect(service.isTestComplete).toEqual(false);
      expect(service.isTestStarted).toEqual(true);
    })
  );

  it(
    "verifyAnswer() ends test appropriately",
    inject([DataService], (service: DataService) => {
      service.startTest();

      const y = service.currentY; // 2
      expect(y).toEqual(2);

      service.currentX = 6; // random
      const x = service.currentX; // 6
      expect(x).toEqual(6);

      const computedAnswer = x * y;
      service.answerBuffer = computedAnswer.toString(); // random

      const currentSet = service.sets.find(set => set.y === y);

      currentSet.remainingX = [x];

      const result: boolean = service.verifyAnswer();
      expect(result).toEqual(true);

      expect(currentSet.completedX.length).toEqual(1);
      expect(currentSet.remainingX.length).toEqual(0);
      expect(service.isTestComplete).toEqual(true);
      expect(service.isTestStarted).toEqual(false);

    })
  );

});
