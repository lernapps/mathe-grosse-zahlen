<script setup lang="ts">
// A Zahlenstrahl with a magnifier. The learner picks one of ten sections; the magnifier shows it ten times finer.
// Its logic is in Zahlenstrahl.ts. Operation with the keyboard: Tab to a button, Enter or Space presses it.
import { computed, ref } from "vue";
import { canZoom, fill, group, ticks, zoomIn, type Window } from "./Zahlenstrahl.ts";

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
}>();

const win = ref<Window>({ from: props.from, to: props.to });
const marks = computed(() => ticks(win.value));
const zoomable = computed(() => canZoom(win.value));
const sections = computed(() => marks.value.slice(0, 10).map((m, i) => ({ from: m, to: marks.value[i + 1] ?? m })));
const x = (n: number): number => 20 + ((n - win.value.from) / (win.value.to - win.value.from)) * 320;

function zoom(index: number): void {
  if (zoomable.value) win.value = zoomIn(win.value, index);
}
function reset(): void {
  win.value = { from: props.from, to: props.to };
}
</script>

<template>
  <div class="zahlenstrahl">
    <svg viewBox="0 0 360 80" role="img" :aria-label="fill(scale, { from: group(win.from), to: group(win.to) })">
      <line x1="20" y1="30" x2="340" y2="30" stroke="currentColor" stroke-width="2" />
      <g v-for="(m, i) in marks" :key="i">
        <line :x1="x(m)" y1="22" :x2="x(m)" y2="38" stroke="currentColor" stroke-width="2" />
        <text v-if="i % 5 === 0" :x="x(m)" y="58" font-size="12" text-anchor="middle" fill="currentColor">
          {{ group(m) }}
        </text>
      </g>
    </svg>
    <div class="zs-sections">
      <button
        v-for="(s, i) in sections"
        :key="i"
        type="button"
        :disabled="!zoomable"
        :aria-label="fill(section, { from: group(s.from), to: group(s.to) })"
        @click="zoom(i)"
      >
        {{ group(s.from) }}
      </button>
    </div>
    <p>{{ hint }}</p>
    <button type="button" @click="reset">{{ resetLabel }}</button>
  </div>
</template>

<style scoped>
.zahlenstrahl svg {
  width: 100%;
  height: auto;
  color: var(--page-text);
}
.zs-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
button {
  min-width: 2.75rem;
  min-height: 2.75rem;
}
</style>
