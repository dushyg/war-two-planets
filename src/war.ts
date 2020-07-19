import Container from 'typedi';
import { BattleCreator } from './battleCreator';
import { Army, Battle, WarResult } from './models';
import { WarRuleTemplateService } from './typediConfig';
import { WarRuleTemplate } from './warRules/warRuleTemplate';

/**
 * The class that represents the war being currently fought
 */
export class War {
  /**
   * Kicks of the various battles in the war and returns the war result
   * @param invadingArmy Invading army
   * @param defendingArmy Defending army
   * @returns WarResult - State of fighting forces the war is over
   */
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

  /**
   * Gets an object representing the result of war after the war is over
   * @param battles Array of battles after the war is over
   * @returns WarResult - State of fighting forces the war is over
   */
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
