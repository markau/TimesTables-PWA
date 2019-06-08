import { NumberSet } from "./NumberSet";

describe("NumberSetClass", () => {
  it("Should create class", () => {
    const numberSet = new NumberSet();
    expect(numberSet instanceof NumberSet).toBe(true);
    expect(numberSet.remainingX).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(numberSet.incorrectX).toEqual([]);
    expect(numberSet.completedX).toEqual([]);
    expect(numberSet.y).toEqual(2);
    numberSet.resetSet(3);
    expect(numberSet.y).toEqual(3);
  });
});
