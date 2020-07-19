import { Combatant, Army } from '../models';
import { CombatantMatcher } from './combatantMatcher';
import { FORCE_CODES } from '../constants';

/**
 * Helps find defender to tackle an enemy based on codeName
 */
export class NameBasedCombatantMatcher implements CombatantMatcher {
  /**
   * Finds a defender capable of tackling an enemy combatant
   * @param invader Combatant instance of the invading force
   * @param defenderArmy Army instance representing defending Army
   * @returns Defending Combatant instance
   */
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
