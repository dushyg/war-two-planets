import { Army, Combatant } from '../models';
/**
 * Interface to be implemented by classes that match invader with defender
 */
export interface CombatantMatcher {
  getDefender(invader: Combatant, defenderArmy: Army): Combatant;
}
