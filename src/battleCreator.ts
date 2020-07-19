import { CombatantMatcher } from './combatantMatcher/combatantMatcher';
import { Army, Battle, Combatant } from './models';
import { Container } from 'typedi';
import { CombatantMatcherService } from './typediConfig';

/**
 * The class that creates battles between combatants from invading army against defending army
 */
export class BattleCreator {
  /**
   * Object that helps identify which defending combatant should be used to tackle attacking combatant
   */
  private combatantMatcher: CombatantMatcher;
  constructor() {
    this.combatantMatcher = Container.get(CombatantMatcherService);
  }

  /**
   * Creates an array of battels being fought based on combatant matcher's judgement
   * @param invadingArmy Invading Army object
   * @param defendingArmy Defending Army object
   * @returns Array of battles being fought
   */
  public createBattles(invadingArmy: Army, defendingArmy: Army): Battle[] {
    return Array.from(invadingArmy.forces, ([combatantCode, combatant]) => {
      const defender: Combatant = this.combatantMatcher.getDefender(
        combatant,
        defendingArmy,
      );
      return {
        availableDefendersCount: defender.numberOfUnits,
        defenderCombatantCode: defender.codeName,
        defenderDeploymentPosition: defender.deploymentPosition,
        defenderTacklingPower: defender.tacklingPower,
        engagedDefendersCount: 0,
        invaderCombatantCode: combatantCode,
        untackledInvadersCount: combatant.numberOfUnits,
      } as Battle;
    });
  }
}
