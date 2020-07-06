import { CombatantMatcher } from './combatantMatcher/combatantMatcher';
import { Army, Battle, Combatant } from './models';

export class BattleCreator {
  constructor(private combatantMatcher: CombatantMatcher) {}
  public createBattles(
    invadingArmy: Army,
    defendingArmy: Army
  ): Map<string, Battle> {
    return new Map<string, Battle>(
      Array.from(invadingArmy.forces, ([combatantCode, combatant]) => {
        const defender: Combatant = this.combatantMatcher.getDefender(
          combatant,
          defendingArmy
        );
        return [
          combatantCode,
          {
            availableDefendersCount: defender.numberOfUnits,
            defenderCombatantCode: defender.codeName,
            defenderDeploymentPosition: defender.deploymentPosition,
            defenderTacklingPower: defender.tacklingPower,
            engagedDefendersCount: 0,
            invaderCombatantCode: combatantCode,
            untackledInvadersCount: combatant.numberOfUnits,
          } as Battle,
        ];
      })
    );
  }
}
