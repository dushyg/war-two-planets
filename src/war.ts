import Container from 'typedi';
import { BattleCreator } from './battleCreator';
import { Army, Battle, WarResult } from './models';
import { WarRuleTemplateService } from './typediConfig';
import { WarRuleTemplate } from './warRules/warRuleTemplate';

export class War {
  public fight(invadingArmy: Army, defendingArmy: Army): WarResult {
    const battleCreator: BattleCreator = Container.get(BattleCreator);
    const battles: Battle[] = battleCreator.createBattles(
      invadingArmy,
      defendingArmy,
    );

    const warRuleChain: WarRuleTemplate = Container.get(WarRuleTemplateService);
    const updatedBattlesAfterCounteringAttack = warRuleChain.execute(battles);
    return this.getWarResult(updatedBattlesAfterCounteringAttack);
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
