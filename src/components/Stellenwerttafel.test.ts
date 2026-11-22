import { expect, test } from "vite-plus/test";
import { bundle, canBundle, change, fill, group, start, value } from "./Stellenwerttafel.ts";

test("value reads the plates as a number", () => {
  expect(value([1, 2, 3, 4])).toBe(1234);
  expect(value([2, 0, 0, 7])).toBe(2007);
  expect(value(start(4, [3, 5]))).toBe(3500);
});

test("bundling moves ten plates to one in the next column and keeps the number", () => {
  const counts = [0, 3, 14, 27];
  const bundled = bundle(counts);
  expect(bundled).toEqual([0, 4, 6, 7]);
  expect(canBundle(counts)).toBe(true);
  expect(canBundle(bundled)).toBe(false);
  expect(value(bundled)).toBe(value(counts));
});

test("the highest column may hold ten plates or more; nothing is lost", () => {
  expect(bundle([12, 0])).toEqual([12, 0]);
  expect(canBundle([12, 0])).toBe(false);
});

test("a column never holds fewer than zero plates", () => {
  expect(change([0, 1], 0, -1)).toEqual([0, 1]);
  expect(change([0, 1], 1, 1)).toEqual([0, 2]);
});

test("numbers have groups of three from five digits on, none below", () => {
  expect(group(2024)).toBe("2024");
  expect(group(12345)).toBe("12 345");
  expect(group(1000000)).toBe("1 000 000");
});

test("fill replaces named placeholders", () => {
  expect(fill("{name}: {n}", { name: "Zehner", n: 3 })).toBe("Zehner: 3");
});
