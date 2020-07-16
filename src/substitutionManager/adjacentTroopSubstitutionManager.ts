import { SUBSTITUTION_POWER } from '../constants';
import { Battle } from '../models';
import {
  areAnyInvadersUntackled,
  getRequiredDefendersCount,
} from '../warUtils';
import { SubstitutionManager } from './substitutionManager';

export class AdjacentTroopSubstitutionManager implements SubstitutionManager {
  public getBattlesAfterSubstitutionAttempt(battles: Battle[]): Battle[] {
    // creating a clone of batle array as we will need to update these battles
    // to reflect status after taking help from adjacent defenders i.e substitution
    const battlesToBeUpdated: Battle[] = battles.map((b) => ({ ...b }));

    return this.attemptSubstitutionOnAllBattles(battlesToBeUpdated);
  }

  private attemptSubstitutionOnAllBattles(battleArray: Battle[]): Battle[] {
    let didSubstitutionHappen = false;
    battleArray.forEach((battle) => {
      const currentDefenderPosition = battle.defenderDeploymentPosition;
      const info: {
        didSubstitutionHappen: boolean;
        allSubstitutionsComplete: boolean;
      } = this.checkForSubstitution(currentDefenderPosition, battleArray);
      if (info.didSubstitutionHappen) {
        didSubstitutionHappen = true;
      }
    });

    if (!didSubstitutionHappen) {
      return battleArray;
    }
    if (!areAnyInvadersUntackled(battleArray)) {
      return battleArray;
    }
    // using tail call optimization for runtime and memory performance
    return this.attemptSubstitutionOnAllBattles(battleArray);
  }

  private checkForSubstitution(
    currentDefenderPosition: number,
    battleArray: Battle[]
  ) {
    let leftCandidateBattle;
    let rightCandidateBattle;

    const currentBattle = battleArray[currentDefenderPosition];
    if (currentBattle && currentBattle.untackledInvadersCount === 0) {
      return { didSubstitutionHappen: false, allSubstitutionsComplete: false };
    }
    let leftCandidateSubstitutionInfo;
    let rightCandidateSubstitutionInfo;

    // calculating if substitution is possible with left defender
    const leftPosition = currentDefenderPosition - 1;
    if (leftPosition >= 0) {
      leftCandidateBattle = battleArray[leftPosition];
      leftCandidateSubstitutionInfo = this.getSubstitutionInfo(
        currentBattle,
        leftCandidateBattle
      );
      // substitute with left defender if all enemies can be tackled with left forces
      if (
        leftCandidateSubstitutionInfo.isSubstitutionPossible &&
        leftCandidateBattle
      ) {
        this.substitute(
          currentBattle,
          leftCandidateBattle,
          leftCandidateSubstitutionInfo
        );
        return { didSubstitutionHappen: true, allSubstitutionsComplete: true };
      }
    }

    // calculating if substitution is possible with right defender
    const rightPosition = currentDefenderPosition + 1;
    if (rightPosition <= battleArray.length - 1) {
      rightCandidateBattle = battleArray[rightPosition];
      rightCandidateSubstitutionInfo = this.getSubstitutionInfo(
        battleArray[currentDefenderPosition],
        rightCandidateBattle
      );
      // substitute with right defender if all enemies can be tackled with right forces
      if (
        rightCandidateSubstitutionInfo.isSubstitutionPossible &&
        rightCandidateBattle
      ) {
        this.substitute(
          currentBattle,
          rightCandidateBattle,
          rightCandidateSubstitutionInfo
        );
        return { didSubstitutionHappen: true, allSubstitutionsComplete: true };
      }
    }

    if (leftCandidateSubstitutionInfo && leftCandidateBattle) {
      // if left and right both couldnt fully tackle all enemies then bring over whatever forces
      // we can from left if left exists
      if (leftCandidateBattle.availableDefendersCount > 0) {
        this.substitute(
          currentBattle,
          leftCandidateBattle,
          leftCandidateSubstitutionInfo
        );
        return { didSubstitutionHappen: true, allSubstitutionsComplete: false };
      }
    }

    if (rightCandidateSubstitutionInfo && rightCandidateBattle) {
      // if left defender doesnt exist and right couldnt fully tackle all enemies then bring over whatever forces
      // we can from right
      if (rightCandidateBattle.availableDefendersCount > 0) {
        this.substitute(
          currentBattle,
          rightCandidateBattle,
          rightCandidateSubstitutionInfo
        );
        return { didSubstitutionHappen: true, allSubstitutionsComplete: false };
      }
    }
    return { didSubstitutionHappen: false, allSubstitutionsComplete: false };
  }

  private getSubstitutionInfo(currentBattle: Battle, candidateBattle: Battle) {
    const substitutionInfo = {
      isSubstitutionPossible: false,
      substitutingDefendersCount: 0,
      substitutedDefendersCount: 0,
      substituingDefenderPosition: -1,
    };

    if (
      candidateBattle &&
      candidateBattle.untackledInvadersCount === 0 &&
      candidateBattle.availableDefendersCount > 0
    ) {
      const additionalReplacedDefendersRequired = getRequiredDefendersCount(
        currentBattle.untackledInvadersCount,
        currentBattle.defenderTacklingPower
      );
      let replacementPower;
      if (
        currentBattle.defenderDeploymentPosition <
        candidateBattle.defenderDeploymentPosition
      ) {
        replacementPower = SUBSTITUTION_POWER.LEFT;
      } else {
        replacementPower = SUBSTITUTION_POWER.RIGHT;
      }

      const info = this.getSubstitutionCount(
        additionalReplacedDefendersRequired,
        replacementPower,
        candidateBattle.availableDefendersCount
      );
      substitutionInfo.isSubstitutionPossible = info.isSubstitutionPossible;
      substitutionInfo.substitutingDefendersCount =
        info.substitutingDefendersCount;
      substitutionInfo.substituingDefenderPosition =
        candidateBattle.defenderDeploymentPosition;
      substitutionInfo.substitutedDefendersCount =
        info.substitutedDefendersCount;
    }
    return substitutionInfo;
  }

  private getSubstitutionCount(
    additionalReplacedDefendersRequired: number,
    replacementPower: number,
    availableDefendersCount: number
  ) {
    const substitutionInfo = {
      isSubstitutionPossible: false,
      substitutingDefendersCount: 0,
      substitutedDefendersCount: 0,
    };
    const requiredReplacingDefenders = Math.ceil(
      additionalReplacedDefendersRequired / replacementPower
    );
    if (availableDefendersCount >= requiredReplacingDefenders) {
      substitutionInfo.isSubstitutionPossible = true;
      substitutionInfo.substitutingDefendersCount = requiredReplacingDefenders;
      substitutionInfo.substitutedDefendersCount = additionalReplacedDefendersRequired;
      return substitutionInfo;
    } else {
      substitutionInfo.substitutingDefendersCount = availableDefendersCount;
      substitutionInfo.substitutedDefendersCount =
        availableDefendersCount * replacementPower;
      return substitutionInfo;
    }
  }

  private substitute(
    currentBattle: Battle,
    candidateBattle: Battle,
    candidateSubstitutionInfo: {
      isSubstitutionPossible: boolean;
      substitutingDefendersCount: number;
      substitutedDefendersCount: number;
      substituingDefenderPosition: number;
    }
  ) {
    currentBattle.untackledInvadersCount =
      currentBattle.untackledInvadersCount -
      candidateSubstitutionInfo.substitutedDefendersCount *
        currentBattle.defenderTacklingPower;
    candidateBattle.engagedDefendersCount =
      candidateBattle.engagedDefendersCount +
      candidateSubstitutionInfo.substitutingDefendersCount;
    candidateBattle.availableDefendersCount =
      candidateBattle.availableDefendersCount -
      candidateSubstitutionInfo.substitutingDefendersCount;
  }
}
