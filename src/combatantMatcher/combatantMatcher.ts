import { Army, Combatant } from '../models';

export interface CombatantMatcher {
  getDefender(invader: Combatant, defenderArmy: Army): Combatant;
}
