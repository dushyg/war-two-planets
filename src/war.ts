import { BattleCreator } from './battleCreator';
import { CombatantMatcher } from './combatantMatcher/combatantMatcher';
import { Army, Battle, WarResult } from './models';
import { StateManager } from './state/stateManager';
import { SubstitutionManager } from './substitutionManager/substitutionManager';
import { getRequiredDefendersCount } from './warUtils';

export class War {
  constructor(
    private stateManager: StateManager,
    private combatantMatcher: CombatantMatcher
  ) {}

  public fight(invadingArmy: Army, defendingArmy: Army): WarResult {
    const battles: Map<string, Battle> = new BattleCreator(
      this.combatantMatcher
    ).createBattles(invadingArmy, defendingArmy);

    const updatedBattles: Map<string, Battle> = this.counterInvaders(battles);

    // obtain the war result after first round without substitution
    let warResult: WarResult = this.getWarResult(updatedBattles);
    console.log(JSON.stringify(warResult.forcesUsed));

    if (warResult.isDefenceSuccessful) {
      console.log('WINS');
    } else {
      console.log('LOSES');
    }

    return warResult;
  }

  public counterInvaders(battles: Map<string, Battle>): Map<string, Battle> {
    // battles.forEach((battle, combatantCode) => {
    //   // counter invader with available defenders
    //   if (battle.uncounteredInvadersCount > 0) {
    //   }
    // });
    const updatedBattles = new Map<string, Battle>(
      Array.from(battles, this.getUpdatedCombatantBattleKeyValuePair)
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

      // untackledInvadersCountAfterBattle will be double of defenders we were short on
      status.untackledInvadersCountAfterBattle =
        -1 * status.freeDefendersAfterBattle * battle.defenderTacklingPower;
      status.freeDefendersAfterBattle = 0;
    }

    return status;
  }

  private getVictor(
    battles: Map<string, Battle>,
    invadingArmyName: string,
    defendingArmyName: string
  ): string {
    const combatantCodes = battles.keys();

    const iterator: string[] = Array.from(combatantCodes);

    const areAllAttackersTackled = iterator.some((combatantCode) => {
      const battle = battles.get(combatantCode);
      return !battle?.untackledInvadersCount;
    });

    return areAllAttackersTackled ? defendingArmyName : invadingArmyName;
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
