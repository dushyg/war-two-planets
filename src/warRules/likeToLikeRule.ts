import { Battle } from '../models';
import { getRequiredDefendersCount } from '../warUtils';
import { WarRuleTemplate } from './warRuleTemplate';
/**
 * The rule that dictates that only a combatant with same combatant code can be used to tackle an attaking combatant
 */
export class LikeToLikeRule extends WarRuleTemplate {
  /**
   * @param shouldThisRuleExecute The predicate function that decides if current rule will execute
   * @param nextRule Next rule that needs to be run to take the war forward
   */
  constructor(
    shouldThisRuleExecute: (battles: Battle[]) => boolean,
    nextRule: WarRuleTemplate | null,
  ) {
    super(shouldThisRuleExecute, nextRule);
  }

  /**
   * Returns updated arry of battles after applying current war rule logic.
   * @param battles Array of ongoing battles
   * @returns Updated array of battles after applying curent rule logic
   */
  public updateBattleMapAsPerRule(battles: Battle[]): Battle[] {
    const getUpdatedBattle = this.updateCombatantBattle.bind(this);
    return battles.map(getUpdatedBattle);
  }

  /**
   * Updates count of available & engaged defenders along with untackled attackers count
   * @param battle Battle that needs to be updated as per current rule
   * @returns Updated battle
   */
  private updateCombatantBattle(battle: Battle): Battle {
    const statusAfterBattle: {
      freeDefendersAfterBattle: number;
      engagedDefendersAfterBattle: number;
      untackledInvadersCountAfterBattle: number;
    } = this.getStatusAfterBattle(battle);

    return {
      ...battle,
      availableDefendersCount: statusAfterBattle.freeDefendersAfterBattle,
      engagedDefendersCount: statusAfterBattle.engagedDefendersAfterBattle,
      untackledInvadersCount:
        statusAfterBattle.untackledInvadersCountAfterBattle,
    } as Battle;
  }

  /**
   * Determines the count of available & engaged defenders along with untackled attackers count after this war is fought
   * @param battle Battle that is being currently fought
   * @returns Object having fields for engagedDefendersAfterBattle, freeDefendersAfterBattle, untackledInvadersCountAfterBattle
   */
  private getStatusAfterBattle(battle: Battle) {
    const status = {
      engagedDefendersAfterBattle: 0,
      freeDefendersAfterBattle: 0,
      untackledInvadersCountAfterBattle: 0,
    };
    // Calculate defendersRequired based on their tackling Power
    const defendersRequired = getRequiredDefendersCount(
      battle.untackledInvadersCount,
      battle.defenderTacklingPower,
    );
    status.freeDefendersAfterBattle =
      battle.availableDefendersCount - defendersRequired;

    // if we still have defenders available to take on more attackers,
    // or if freeDefendersAfterBattle is 0 (i.e not negative)
    // it means we have successfully tackled all attackers
    if (status.freeDefendersAfterBattle >= 0) {
      status.untackledInvadersCountAfterBattle = 0;

      status.engagedDefendersAfterBattle =
        battle.engagedDefendersCount + defendersRequired;
    } else {
      // if freeDefendersAfterBattle is negative that means there were more attackers
      // than could be handled
      status.engagedDefendersAfterBattle =
        battle.engagedDefendersCount + battle.availableDefendersCount;

      status.untackledInvadersCountAfterBattle =
        battle.untackledInvadersCount -
        battle.availableDefendersCount * battle.defenderTacklingPower;

      status.freeDefendersAfterBattle = 0;
    }

    return status;
  }
}
