<script setup lang="ts">
// A Stellenwerttafel with plates: the learner adds and removes plates per column and bundles ten to one in the next
// column to the left. It shows the number the plates stand for. Its logic is in Stellenwerttafel.ts.
// Operation with the keyboard: Tab to a button, Enter or Space presses it.
import { computed, ref } from "vue";
import { bundle, canBundle, change, fill, group, start, value } from "./Stellenwerttafel.ts";

const props = defineProps<{
  /** The full names of the columns from the highest, e.g. "Tausender". */
  names: string[];
  /** The short names of the columns, e.g. "T". */
  shorts: string[];
  /** The plates at the start, one number per column. */
  plates: number[];
  /** Label of the button for one plate more, with {name}. */
  more: string;
  /** Label of the button for one plate less, with {name}. */
  less: string;
  /** Label of the bundle button. */
  bundleLabel: string;
  /** Label of the button that sets the start state back. */
  resetLabel: string;
  /** Sentence below the table, with {n} for the number and {parts} for the plates per column in words. */
  result: string;
  /** Sentence for a column with plates, with {count} and {name}. */
  part: string;
}>();

const counts = ref<number[]>(start(props.names.length, props.plates));
const number = computed(() => value(counts.value));
const bundleable = computed(() => canBundle(counts.value));
const parts = computed(() =>
  counts.value
    .map((count, i) => (count > 0 ? fill(props.part, { count, name: props.names[i] ?? "" }) : ""))
    .filter(Boolean)
    .join(", "),
);

function add(index: number, by: 1 | -1): void {
  counts.value = change(counts.value, index, by);
}
function doBundle(): void {
  counts.value = bundle(counts.value);
}
function reset(): void {
  counts.value = start(props.names.length, props.plates);
}
</script>

<template>
  <div class="stellenwerttafel">
    <div class="sw-columns">
      <div v-for="(name, i) in names" :key="name" class="sw-column">
        <div class="sw-head">
          <strong>{{ shorts[i] }}</strong>
          <span class="sw-name">{{ name }}</span>
        </div>
        <div class="sw-plates" aria-hidden="true">
          <span v-for="n in counts[i]" :key="n" class="sw-plate">{{ shorts[i] }}</span>
        </div>
        <div class="sw-count">{{ counts[i] }}</div>
        <div class="sw-buttons">
          <button type="button" :aria-label="fill(more, { name })" @click="add(i, 1)">+</button>
          <button type="button" :aria-label="fill(less, { name })" :disabled="counts[i] === 0" @click="add(i, -1)">
            −
          </button>
        </div>
      </div>
    </div>
    <div class="sw-actions">
      <button type="button" :disabled="!bundleable" @click="doBundle">{{ bundleLabel }}</button>
      <button type="button" @click="reset">{{ resetLabel }}</button>
    </div>
    <p aria-live="polite">{{ fill(result, { n: group(number), parts: parts || "0" }) }}</p>
  </div>
</template>

<style scoped>
.sw-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.sw-column {
  flex: 1 1 5.5rem;
  min-width: 5.5rem;
  border: 1px solid var(--page-border);
  border-radius: 0.25rem;
  padding: 0.5rem;
  background: var(--page-surface);
  text-align: center;
}
.sw-head {
  display: flex;
  flex-direction: column;
}
.sw-name {
  font-size: 0.75rem;
  overflow-wrap: anywhere;
  color: var(--page-muted);
}
.sw-plates {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.2rem;
  min-height: 2.6rem;
  margin: 0.4rem 0;
}
.sw-plate {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: 1px solid var(--page-text);
  background: var(--page-accent);
  color: var(--page-on-accent);
  font-size: 0.65rem;
}
.sw-count {
  font-size: 1.25rem;
  font-weight: bold;
}
.sw-buttons,
.sw-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
button {
  min-width: 2.75rem;
  min-height: 2.75rem;
}
</style>
