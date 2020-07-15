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
    const battles: Map<string, Battle> = battleCreator.createBattles(
      invadingArmy,
      defendingArmy
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

  public counterInvaders(battles: Map<string, Battle>): Map<string, Battle> {
    const updatedBattles = new Map<string, Battle>(
      Array.from(battles, this.getUpdatedCombatantBattleKeyValuePair.bind(this))
    );

    return updatedBattles;
  }

  private getUpdatedCombatantBattleKeyValuePair([combatantCode, battle]: [
    string,
    Battle
  ]): [string, Battle] {
    const statusAfterBattle: {
      freeDefendersAfterBattle: number;
      engagedDefendersAfterBattle: number;
      untackledInvadersCountAfterBattle: number;
    } = this.getStatusAfterBattle(battle);

    return [
      combatantCode,
      {
        ...battle,
        availableDefendersCount: statusAfterBattle.freeDefendersAfterBattle,
        engagedDefendersCount: statusAfterBattle.engagedDefendersAfterBattle,
        untackledInvadersCount:
          statusAfterBattle.untackledInvadersCountAfterBattle,
      } as Battle,
    ];
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

  private getWarResult(battles: Map<string, Battle>): WarResult {
    const warResult: WarResult = {
      forcesUsed: new Map<string, number>(),
      isDefenceSuccessful: true,
    };

    battles.forEach((battle, combatantCode) => {
      if (battle.untackledInvadersCount > 0) {
        warResult.isDefenceSuccessful = false;
      }
      warResult.forcesUsed.set(combatantCode, battle.engagedDefendersCount);
    });

    return warResult;
  }
}
