// Logic of the Stellenwerttafel: plates per column, bundling ten to one of the next column to the left.
// Columns are ordered from the highest to the lowest place value (index 0 = highest).

/** A number with groups of three digits, separated by a narrow no-break space (from five digits on). */
export function group(n: number): string {
  const digits = String(Math.trunc(Math.abs(n)));
  if (digits.length < 5) return digits;
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** The number the plates stand for. */
export function value(counts: number[]): number {
  return counts.reduce((sum, count) => sum * 10 + count, 0);
}

/** Whether some column other than the highest holds ten plates or more, so that bundling does something. */
export function canBundle(counts: number[]): boolean {
  return counts.some((count, index) => index > 0 && count >= 10);
}

/** Bundles ten plates of a column to one plate of the column to the left, as far as possible. */
export function bundle(counts: number[]): number[] {
  const next = [...counts];
  for (let i = next.length - 1; i > 0; i--) {
    const here = next[i] ?? 0;
    next[i - 1] = (next[i - 1] ?? 0) + Math.floor(here / 10);
    next[i] = here % 10;
  }
  return next;
}

/** One plate more or less in a column; never below zero. */
export function change(counts: number[], index: number, by: 1 | -1): number[] {
  const next = [...counts];
  next[index] = Math.max(0, (next[index] ?? 0) + by);
  return next;
}

/** The start counts from the props, padded or cut to the number of columns. */
export function start(columns: number, counts: number[]): number[] {
  return Array.from({ length: columns }, (_, i) => Math.max(0, counts[i] ?? 0));
}

/** Fills {name} placeholders. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
