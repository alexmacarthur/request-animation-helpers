import { replaceRaf } from "raf-stub";
import {
  requestNextAnimationFrame,
  allRequestIds,
} from "./request-animation-helpers";

replaceRaf();

describe("requestNextAnimationFrame", () => {
  it("returns unique ID", () => {
    const id = requestNextAnimationFrame(() => {});

    expect(id).toBeGreaterThan(0);
  });

  it("requests persist when repaints have not occurred", () => {
    const id = requestNextAnimationFrame(() => {});

    expect(allRequestIds).toHaveProperty(id.toString());
  });

  it("requests is deleted after callbacks have fired.", () => {
    const id = requestNextAnimationFrame(() => {});

    requestAnimationFrame.step();
    requestAnimationFrame.step();

    expect(allRequestIds).not.toHaveProperty(id.toString());
  });

  it("does not fire callback before next repaint", () => {
    const mockFunction = jest.fn();
    requestNextAnimationFrame(mockFunction);

    requestAnimationFrame.step();

    expect(mockFunction.mock.calls.length).toBe(0);
  });

  it("fires callback after next repaint", () => {
    const mockFunction = jest.fn();
    requestNextAnimationFrame(mockFunction);

    requestAnimationFrame.step();
    requestAnimationFrame.step();

    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
