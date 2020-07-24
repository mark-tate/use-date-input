import callAll from "../callAll";

describe("given callAll", () => {
  it("calls multiple defined methods from one function", () => {
    const funcA = jest.fn();
    const funcB = jest.fn();
    const combinedFunc = callAll(funcA, undefined, funcB);
    combinedFunc("arg1", "arg2");
    expect(funcA).toHaveBeenCalledWith("arg1", "arg2");
    expect(funcB).toHaveBeenCalledWith("arg1", "arg2");
  });
});
