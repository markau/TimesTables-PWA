import { MinuteSecondsPipe } from "./minute-seconds.pipe";

describe("MinuteSecondsPipe", () => {
  it("create an instance", () => {
    const pipe = new MinuteSecondsPipe();
    expect(pipe).toBeTruthy();
  });
  it("returns seconds", () => {
    const pipe = new MinuteSecondsPipe();
    const result = pipe.transform(20000, false, false);
    expect(result).toEqual("20");
  });
  it("returns seconds with decimal", () => {
    const pipe = new MinuteSecondsPipe();
    const result = pipe.transform(22990, true, false);
    expect(result).toEqual("22.99");
  });
  it("returns zero minutes and seconds", () => {
    const pipe = new MinuteSecondsPipe();
    const result = pipe.transform(20000, false, true);
    expect(result).toEqual("00:20");
  });
  it("returns minutes and seconds", () => {
    const pipe = new MinuteSecondsPipe();
    const result = pipe.transform(130000, false, false);
    expect(result).toEqual("02:10");
  });
});
