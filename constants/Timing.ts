/* pixels to scroll each time */
export enum SCROLL_DISTANCE {
  Fastest = 1.85,
  EvenFaster = 1.75,
  Faster = 1.5,
  Fast = 1.25,
  Medium = 1,
  Slow = 0.75,
  Slower = 0.5,
  EvenSlower = 0.25,
  Slowest = 0.15,
}

/* high/mid/low bpms */
export const MAX_BPM = 220;
export const DEFAULT_BPM = 130;
export const MIN_BPM = 40;

/* assign scroll speed based on where bpm falls in range from min to max */
export const GetScrollDistanceForBPM = (bpm: number): number => {
  if (bpm >= 200) return SCROLL_DISTANCE.Fastest;
  if (bpm >= 180) return SCROLL_DISTANCE.EvenFaster;
  if (bpm >= 160) return SCROLL_DISTANCE.Faster;
  if (bpm >= 140) return SCROLL_DISTANCE.Fast;
  if (bpm >= 120) return SCROLL_DISTANCE.Medium;
  if (bpm >= 100) return SCROLL_DISTANCE.Slow;
  if (bpm >= 80) return SCROLL_DISTANCE.Slower;
  if (bpm >= 60) return SCROLL_DISTANCE.EvenSlower;
  return SCROLL_DISTANCE.Slowest;
}

/* TODO: needs to be a constant for now, as it is a factor in determining how fast the `ScrollView` scrolls */
export const FONT_SIZE : number = 20;

/* millisecond interval between each incremental scroll, _performance hits may occur at intervals lower than 16ms_ */
export const SCROLL_SPEED : number = 16;
