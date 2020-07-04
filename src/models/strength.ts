export interface Strength {
  /**
   * Count of combatants in this category
   */

  numberOfUnits: number;
  /**
   * Number of units of opposition that this 1 unit can defeat
   */
  tacklingPower: number;
  /**
   * Deployment Position from left to right amoungst other type of combatants within its own army
   */
  deploymentPosition: number;
}
