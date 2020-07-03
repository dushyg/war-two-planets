export interface Force {
  name: string;
  /**
   * The code name with which it is passed as an input to the app
   */
  code: string;
  /**
   * Number of enemy units that can be countered with 1 of this unit
   */
  power: number;
}
