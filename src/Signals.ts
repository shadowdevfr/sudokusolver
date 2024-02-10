import { signal } from "@preact/signals";

const highlightSignal = signal({x: 0, y:0});
const vitesseSignal = signal(0);

export {highlightSignal, vitesseSignal}
