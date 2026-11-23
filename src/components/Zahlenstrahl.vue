<script setup lang="ts">
// A Zahlenstrahl with a magnifier. The learner picks one of ten sections; the magnifier shows it ten times finer:
// the upper line is the scale before, with the chosen section and a magnifying glass on it, and lines lead from the
// section to the full width of the finer scale below. Its logic is in Zahlenstrahl.ts.
// Operation with the keyboard: Tab to a button, Enter or Space presses it.
import { computed, ref } from "vue";
import { canZoom, fill, group, position, ticks, zoomIn, type Window } from "./Zahlenstrahl.ts";

const props = defineProps<{
  /** Start of the number line. */
  from: number;
  /** End of the number line. */
  to: number;
  /** Text of the description of the scale, with {from} and {to}. */
  scale: string;
  /** Label of the button of one section, with {from} and {to}. */
  section: string;
  /** Label of the button that zooms out to the first scale. */
  resetLabel: string;
  /** Hint line below the buttons. */
  hint: string;
  /** Line when the magnifier cannot go finer, with {from} and {to}. */
  done: string;
  /** Description of the magnifier picture, with {from} and {to} of the section and of the finer scale. */
  lens: string;
}>();

const win = ref<Window>({ from: props.from, to: props.to });
const parents = ref<Window[]>([]);
const parent = computed<Window | undefined>(() => parents.value[parents.value.length - 1]);
const marks = computed(() => ticks(win.value));
const parentMarks = computed(() => (parent.value ? ticks(parent.value) : []));
const zoomable = computed(() => canZoom(win.value));
const sections = computed(() => marks.value.slice(0, 10).map((m, i) => ({ from: m, to: marks.value[i + 1] ?? m })));
const left = 20;
const width = 320;
const xAt = (w: Window, n: number): number => left + position(w, n) * width;
const lowerY = computed(() => (parent.value ? 120 : 30));
const height = computed(() => (parent.value ? 160 : 70));
const description = computed(() =>
  parent.value
    ? fill(props.lens, {
        from: group(win.value.from),
        to: group(win.value.to),
        parentFrom: group(parent.value.from),
        parentTo: group(parent.value.to),
      })
    : fill(props.scale, { from: group(win.value.from), to: group(win.value.to) }),
);
const lensX = computed(() =>
  parent.value ? (xAt(parent.value, win.value.from) + xAt(parent.value, win.value.to)) / 2 : 0,
);

function zoom(index: number): void {
  if (!zoomable.value) return;
  parents.value = [...parents.value, win.value];
  win.value = zoomIn(win.value, index);
}
function reset(): void {
  parents.value = [];
  win.value = { from: props.from, to: props.to };
}
</script>

<template>
  <div class="zahlenstrahl">
    <svg :viewBox="`0 0 360 ${height}`" role="img" :aria-label="description">
      <g v-if="parent">
        <line :x1="left" y1="30" :x2="left + width" y2="30" stroke="currentColor" stroke-width="2" />
        <g v-for="(m, i) in parentMarks" :key="`p${i}`">
          <line :x1="xAt(parent, m)" y1="24" :x2="xAt(parent, m)" y2="36" stroke="currentColor" stroke-width="1.5" />
          <text v-if="i % 5 === 0" :x="xAt(parent, m)" y="18" font-size="11" text-anchor="middle" fill="currentColor">
            {{ group(m) }}
          </text>
        </g>
        <rect
          :x="xAt(parent, win.from)"
          y="22"
          :width="xAt(parent, win.to) - xAt(parent, win.from)"
          height="16"
          class="zs-chosen"
        />
        <circle :cx="lensX" cy="30" r="13" class="zs-lens" />
        <line :x1="lensX + 9" y1="40" :x2="lensX + 19" y2="52" class="zs-handle" />
        <line :x1="xAt(parent, win.from)" y1="38" :x2="left" :y2="lowerY - 8" class="zs-ray" />
        <line :x1="xAt(parent, win.to)" y1="38" :x2="left + width" :y2="lowerY - 8" class="zs-ray" />
      </g>
      <line :x1="left" :y1="lowerY" :x2="left + width" :y2="lowerY" stroke="currentColor" stroke-width="2" />
      <g v-for="(m, i) in marks" :key="i">
        <line
          :x1="xAt(win, m)"
          :y1="lowerY - 8"
          :x2="xAt(win, m)"
          :y2="lowerY + 8"
          stroke="currentColor"
          stroke-width="2"
        />
        <text
          v-if="i % 5 === 0"
          :x="xAt(win, m)"
          :y="lowerY + 26"
          font-size="12"
          text-anchor="middle"
          fill="currentColor"
        >
          {{ group(m) }}
        </text>
      </g>
    </svg>
    <div class="zs-sections">
      <button
        v-for="(s, i) in sections"
        :key="i"
        type="button"
        :aria-disabled="!zoomable"
        :aria-label="fill(section, { from: group(s.from), to: group(s.to) })"
        @click="zoom(i)"
      >
        {{ group(s.from) }}
      </button>
    </div>
    <p aria-live="polite">
      {{ zoomable ? hint : fill(done, { from: group(win.from), to: group(win.to) }) }}
    </p>
    <button type="button" :aria-disabled="parents.length === 0" @click="reset">{{ resetLabel }}</button>
  </div>
</template>

<style scoped>
.zahlenstrahl svg {
  width: 100%;
  height: auto;
  color: var(--page-text);
}
.zs-chosen {
  fill: var(--page-accent);
  fill-opacity: 0.35;
  stroke: var(--page-accent);
  stroke-width: 1.5;
}
.zs-lens {
  fill: var(--page-surface);
  fill-opacity: 0.6;
  stroke: var(--page-text);
  stroke-width: 2.5;
}
.zs-handle {
  stroke: var(--page-text);
  stroke-width: 4;
  stroke-linecap: round;
}
.zs-ray {
  stroke: var(--page-accent);
  stroke-width: 1.5;
  stroke-dasharray: 4 3;
}
.zs-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
button[aria-disabled="true"] {
  opacity: 0.6;
}
button {
  min-width: 2.75rem;
  min-height: 2.75rem;
}
</style>
