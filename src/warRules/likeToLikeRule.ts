import { Battle } from '../models';
import { getRequiredDefendersCount } from '../warUtils';
import { WarRuleTemplate } from './warRuleTemplate';

export class LikeToLikeRule extends WarRuleTemplate {
  constructor(
    shouldThisRuleExecute: (battles: Battle[]) => boolean,
    nextRule: WarRuleTemplate | null
  ) {
    super(shouldThisRuleExecute, nextRule);
  }

  public updateBattleMapAsPerRule(battles: Battle[]): Battle[] {
    const getUpdatedBattle = this.updateCombatantBattle.bind(this);
    return battles.map(getUpdatedBattle);
  }

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

  private getStatusAfterBattle(battle: Battle) {
    const status = {
      engagedDefendersAfterBattle: 0,
      freeDefendersAfterBattle: 0,
      untackledInvadersCountAfterBattle: 0,
    };
    // Calculate defendersRequired based on their tackling Power
    const defendersRequired = getRequiredDefendersCount(
      battle.untackledInvadersCount,
      battle.defenderTacklingPower
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
