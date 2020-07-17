import { Combatant, Army } from '../models';
import { CombatantMatcher } from './combatantMatcher';
import { FORCE_CODES } from '../constants';

/**
 * Implements the Like for Like rule and finds defender based on codeName
 */
export class NameBasedCombatantMatcher implements CombatantMatcher {
  public getDefender(invader: Combatant, defenderArmy: Army): Combatant {
    const defender = defenderArmy.forces.get(invader.codeName);
    if (defender) {
      return defender;
    }
    return {
      codeName: FORCE_CODES.NONE,
      deploymentPosition: -1,
      numberOfUnits: 0,
      tacklingPower: 0,
    } as Combatant;
  }
}
