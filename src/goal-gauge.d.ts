export interface GoalGaugeElement extends HTMLElement {
  setCurrent(n: number): GoalGaugeElement;
  setTarget(n: number): GoalGaugeElement;
  setStatus(s: 'filling' | 'unlocked' | 'failed'): GoalGaugeElement;
  getState(): { current: number; target: number; status: string };
}
export function createGoalGauge(options?: {
  current?: number;
  target?: number;
  label?: string;
  caption?: string;
  theme?: 'dark' | 'light';
  status?: 'filling' | 'unlocked' | 'failed';
}): GoalGaugeElement;
