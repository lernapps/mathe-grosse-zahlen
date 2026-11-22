// Logic of the Zahlenstrahl with a magnifier: a window of the number line is split into ten equal sections;
// the learner picks a section and the magnifier shows it ten times finer.

export interface Window {
  from: number;
  to: number;
}

/** Narrow no-break space between groups of three digits, from five digits on. */
export function group(n: number): string {
  const digits = String(Math.trunc(Math.abs(n)));
  const grouped = digits.length < 5 ? digits : digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return n < 0 ? `−${grouped}` : grouped;
}

/** The eleven tick values of a window (ten sections). */
export function ticks(window: Window): number[] {
  const step = (window.to - window.from) / 10;
  return Array.from({ length: 11 }, (_, i) => window.from + i * step);
}

/** The window of one section (0 to 9) of a window, ten times finer. */
export function zoomIn(window: Window, section: number): Window {
  const step = (window.to - window.from) / 10;
  const i = Math.min(9, Math.max(0, Math.trunc(section)));
  return { from: window.from + i * step, to: window.from + (i + 1) * step };
}

/** Whether the magnifier can still go finer: the sections must stay whole numbers. */
export function canZoom(window: Window): boolean {
  const width = window.to - window.from;
  return width >= 100 && Number.isInteger(width / 100);
}

/** Fills {name} placeholders. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
