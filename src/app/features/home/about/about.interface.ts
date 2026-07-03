/** A single highlight statistic rendered in the About stats bar. */
export interface AboutStat {
  /** Target numeric value the counter animates up to. */
  value: number;
  /** Text appended after the animated number, e.g. "+". */
  suffix: string;
  /** Label describing the statistic. */
  label: string;
}
