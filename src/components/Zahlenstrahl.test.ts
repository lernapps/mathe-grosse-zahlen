import { expect, test } from "vite-plus/test";
import { canZoom, fill, group, ticks, zoomIn } from "./Zahlenstrahl.ts";

test("a window has eleven ticks with equal steps", () => {
  expect(ticks({ from: 0, to: 1000 })).toEqual([0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
});

test("zooming into a section gives a window ten times finer", () => {
  const first = zoomIn({ from: 0, to: 1000 }, 3);
  expect(first).toEqual({ from: 300, to: 400 });
  expect(ticks(first)[1]).toBe(310);
  expect(zoomIn(first, 9)).toEqual({ from: 390, to: 400 });
});

test("a section outside the window is held inside it", () => {
  expect(zoomIn({ from: 0, to: 100 }, 12)).toEqual({ from: 90, to: 100 });
  expect(zoomIn({ from: 0, to: 100 }, -2)).toEqual({ from: 0, to: 10 });
});

test("the magnifier stops when the sections would not be whole numbers", () => {
  expect(canZoom({ from: 0, to: 1000 })).toBe(true);
  expect(canZoom({ from: 300, to: 400 })).toBe(true);
  expect(canZoom({ from: 310, to: 320 })).toBe(false);
});

test("large numbers have groups, negative ones the minus sign", () => {
  expect(group(1500)).toBe("1500");
  expect(group(25000)).toBe("25 000");
  expect(group(-5)).toBe("−5");
});

test("fill replaces named placeholders", () => {
  expect(fill("{a} bis {b}", { a: 1, b: 2 })).toBe("1 bis 2");
});
