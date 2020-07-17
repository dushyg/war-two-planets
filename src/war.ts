import Container from 'typedi';
import { BattleCreator } from './battleCreator';
import { Army, Battle, WarResult } from './models';
import { SubstitutionManager } from './substitutionManager/substitutionManager';
import {
  SubstitutionManagerService,
  WarRuleTemplateService,
} from './typediConfig';
import { getRequiredDefendersCount } from './warUtils';
import { WarRuleTemplate } from './warRules/warRuleTemplate';

export class War {
  public fight(invadingArmy: Army, defendingArmy: Army): WarResult {
    const battleCreator: BattleCreator = Container.get(BattleCreator);
    const battles: Battle[] = battleCreator.createBattles(
      invadingArmy,
      defendingArmy,
    );

    // const updatedBattles: Map<string, Battle> = this.counterInvaders(battles);

    // // obtain the war result after first round without substitution
    // const warResult: WarResult = this.getWarResult(updatedBattles);
    // // console.log('After First Defence ', warResult);

    // if (!warResult.isDefenceSuccessful) {
    //   const substitutionManager: SubstitutionManager = Container.get(
    //     SubstitutionManagerService
    //   );

    //   const updatedBattlesAfterSubstitution: Map<
    //     string,
    //     Battle
    //   > = substitutionManager.getBattlesAfterSubstitutionAttempt(
    //     updatedBattles
    //   );

    const warRuleChain: WarRuleTemplate = Container.get(WarRuleTemplateService);
    const updatedBattlesAfterCounteringAttack = warRuleChain.execute(battles);
    return this.getWarResult(updatedBattlesAfterCounteringAttack);
    //   return warResultAfterSubstitution;
    // } else {
    //   return warResult;
    // }
  }

  private getWarResult(battles: Battle[]): WarResult {
    const warResult: WarResult = {
      forcesUsed: new Map<string, number>(),
      isDefenceSuccessful: true,
    };

    return battles.reduce((result, currentBattle) => {
      if (currentBattle.untackledInvadersCount > 0) {
        result.isDefenceSuccessful = false;
      }
      result.forcesUsed.set(
        currentBattle.defenderCombatantCode,
        currentBattle.engagedDefendersCount,
      );
      return result;
    }, warResult);
  }
}
