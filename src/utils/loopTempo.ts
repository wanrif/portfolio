export interface LoopTempo {
  beat: number;
  pulse: number;
  pulseSlow: number;
  sweep: number;
  sweepPause: number;
  sway: number;
  orbit: number;
  hover: number;
  barBase: number;
  barStep: number;
  stagger: number;
}

export const getLoopTempo = (isMobile: boolean): LoopTempo => {
  // Every loop duration is derived from the same beat for exact tempo ratios.
  const beat = isMobile ? 0.18 : 0.15;

  return {
    beat,
    pulse: beat * 5,
    pulseSlow: beat * 6,
    sweep: beat * 18,
    sweepPause: beat * 6,
    sway: beat * 18,
    orbit: beat * 120,
    hover: beat * 2,
    barBase: beat * 3,
    barStep: beat,
    stagger: beat,
  };
};
