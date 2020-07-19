import { Battle } from '../models';
/**
 * An interface that needs to be implemented to substitute available defending combatants for exhausted combatants
 */
export interface SubstitutionManager {
  /**
   * Gives an updated array of Battles after attempting substitution of defender forces
   * @param battles Array of ongoing battles
   * @returns Array of updated battles
   */
  getBattlesAfterSubstitutionAttempt(battles: Battle[]): Battle[];
}
