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
            defenderTacklingPower: defender.tacklingPower,
            invaderCombatantCode: combatantCode,
            untackledInvadersCount: combatant.numberOfUnits,
            engagedDefendersCount: 0,
          } as Battle,
        ];
      })
    );
  }
}
