import { replaceRaf } from "raf-stub";
import {
  afterFuturePaint,
  cancelAfterFuturePaint,
  allRequestIds,
} from "./request-animation-helpers";

replaceRaf();

describe("afterFuturePaint", () => {
  it("returns unique ID", () => {
    const id = afterFuturePaint(() => {});

    expect(id).toBeGreaterThan(0);
  });

  it("requests persist when repaints have not occurred", () => {
    const id = afterFuturePaint(() => {});

    expect(allRequestIds).toHaveProperty(id.toString());
  });

  it("requests is deleted after callbacks have fired.", () => {
    const id = afterFuturePaint(() => {});

    requestAnimationFrame.step();
    requestAnimationFrame.step();

    expect(allRequestIds).not.toHaveProperty(id.toString());
  });

  it("does not fire callback before next repaint", () => {
    const mockFunction = jest.fn();
    afterFuturePaint(mockFunction);

    requestAnimationFrame.step();

    expect(mockFunction.mock.calls.length).toBe(0);
  });

  it("fires callback after next repaint", () => {
    const mockFunction = jest.fn();
    afterFuturePaint(mockFunction);

    requestAnimationFrame.step();
    requestAnimationFrame.step();

    expect(mockFunction.mock.calls.length).toBe(1);
  });

  it("fires callback after several future paints", () => {
    const mockFunction = jest.fn();
    afterFuturePaint(mockFunction, 5);

    for (let i in new Array(5).fill()) {
      requestAnimationFrame.step();
    }

    expect(mockFunction.mock.calls.length).toBe(0);

    requestAnimationFrame.step();

    expect(mockFunction.mock.calls.length).toBe(1);
  });
});

describe("cancelAfterFuturePaint", () => {
  it("cancels by id", () => {
    const id = afterFuturePaint(() => {});
    const idAsString = Number(id).toString();

    expect(allRequestIds).toHaveProperty(idAsString);

    cancelAfterFuturePaint(id);

    expect(allRequestIds).not.toHaveProperty(idAsString);
  });
});
