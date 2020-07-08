import { CombatantMatcher } from './combatantMatcher/combatantMatcher';
import { Army, Battle, Combatant } from './models';
import { Container } from 'typedi';
import { CombatantMatcherService } from './typediConfig';

// @Service()
export class BattleCreator {
  private combatantMatcher: CombatantMatcher;
  constructor() {
    // private combatantMatcher: CombatantMatcher // @Inject((type) => CombatantMatcherService)
    this.combatantMatcher = Container.get(CombatantMatcherService);
  }
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
