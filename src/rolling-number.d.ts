export interface RollingNumberElement extends HTMLElement {
  update(next: number): void;
  readonly value: number;
}
export function createRollingNumber(options?: {
  value?: number;
  fontSize?: number;
  color?: string;
  weight?: number | string;
}): RollingNumberElement;
