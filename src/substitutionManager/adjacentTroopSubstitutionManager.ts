import { SubstitutionManager } from './substitutionManager';
import { Army, Battle } from '../models';
import { FORCE_CODES, SUBSTITUTION_POWER } from '../constants';
import { getRequiredDefendersCount } from '../warUtils';

export class AdjacentTroopSubstitutionManager implements SubstitutionManager {
  public getBattlesAfterSubstitutionAttempt(
    battles: Map<string, Battle>
  ): Map<string, Battle> {
    const battleArray: Battle[] = Array.from(battles).map((b) => ({ ...b[1] }));

    battleArray.forEach((battle, index, array) => {
      const currentDefenderPosition = battle.defenderDeploymentPosition;
      this.checkForSubstitution(currentDefenderPosition, battleArray);
    });
    return new Map<string, Battle>(
      battleArray.map((battle) => [battle.defenderCombatantCode, battle])
    );
  }

  public checkForSubstitution(
    currentDefenderPosition: number,
    battleArray: Battle[]
  ): void {
    let leftCandidateBattle;
    let rightCandidateBattle;

    let candidatePosition = -1;
    const currentBattle = battleArray[currentDefenderPosition];

    let leftCandidateSubstitutionInfo;
    let rightCandidateSubstitutionInfo;

    const leftPosition = currentDefenderPosition - 1;
    if (leftPosition >= 0) {
      leftCandidateBattle = battleArray[leftPosition];
      candidatePosition = leftPosition;
      leftCandidateSubstitutionInfo = this.getInfoForCandidateSubstitute(
        currentBattle,
        leftCandidateBattle
      );
    } else {
      const rightPosition = currentDefenderPosition + 1;
      if (rightPosition <= battleArray.length - 1) {
        rightCandidateBattle = battleArray[rightPosition];
        candidatePosition = rightPosition;
        rightCandidateSubstitutionInfo = this.getInfoForCandidateSubstitute(
          battleArray[currentDefenderPosition],
          rightCandidateBattle
        );
      }
    }
    // substitute with left defender if all enemies can be tackled with left forces
    if (
      leftCandidateSubstitutionInfo &&
      leftCandidateSubstitutionInfo.isSubstitutionPossible &&
      leftCandidateBattle
    ) {
      this.substitute(
        currentBattle,
        leftCandidateBattle,
        leftCandidateSubstitutionInfo
      );
    } else if (
      rightCandidateSubstitutionInfo &&
      rightCandidateSubstitutionInfo.isSubstitutionPossible &&
      rightCandidateBattle
    ) {
      // substitute with right defender if all enemies can be tackled with right forces
      this.substitute(
        currentBattle,
        rightCandidateBattle,
        rightCandidateSubstitutionInfo
      );
    } else if (leftCandidateSubstitutionInfo && leftCandidateBattle) {
      // if left and right both couldnt fully tackle all enemies then bring over whatever forces
      // we can from left if left exists
      this.substitute(
        currentBattle,
        leftCandidateBattle,
        leftCandidateSubstitutionInfo
      );
    } else if (rightCandidateSubstitutionInfo && rightCandidateBattle) {
      // if left defender doesnt exist and right couldnt fully tackle all enemies then bring over whatever forces
      // we can from right
      this.substitute(
        currentBattle,
        rightCandidateBattle,
        rightCandidateSubstitutionInfo
      );
    }
  }

  private substitute(
    currentBattle: Battle,
    leftCandidateBattle: Battle,
    leftCandidateSubstitutionInfo: {
      isSubstitutionPossible: boolean;
      substitutingDefendersCount: number;
      substituingDefenderPosition: number;
    }
  ) {
    currentBattle.untackledInvadersCount = 0;
    leftCandidateBattle.engagedDefendersCount =
      leftCandidateBattle.engagedDefendersCount +
      leftCandidateSubstitutionInfo.substitutingDefendersCount;
    leftCandidateBattle.availableDefendersCount =
      leftCandidateBattle.availableDefendersCount -
      leftCandidateSubstitutionInfo.substitutingDefendersCount;
  }

  private getInfoForCandidateSubstitute(
    currentBattle: Battle,
    candidateBattle: Battle
  ) {
    const substitutionInfo = {
      isSubstitutionPossible: false,
      substitutingDefendersCount: 0,
      substituingDefenderPosition: -1,
    };

    if (
      candidateBattle &&
      candidateBattle.untackledInvadersCount === 0 &&
      candidateBattle.availableDefendersCount > 0
    ) {
      const info = this.getSubstitutionInfo(currentBattle, candidateBattle);
      substitutionInfo.isSubstitutionPossible = info.isSubstitutionPossible;
      substitutionInfo.substitutingDefendersCount =
        info.substitutingDefendersCount;
      substitutionInfo.substituingDefenderPosition =
        candidateBattle.defenderDeploymentPosition;
    }
    return substitutionInfo;
  }

  private getSubstitutionInfo(
    replacedCombatantBattle: Battle,
    replacingCombatantBattle: Battle
  ) {
    const additionalReplacedDefendersRequired = getRequiredDefendersCount(
      replacedCombatantBattle.untackledInvadersCount,
      replacedCombatantBattle.defenderTacklingPower
    );
    let replacementPower;
    if (
      replacedCombatantBattle.defenderDeploymentPosition <
      replacingCombatantBattle.defenderDeploymentPosition
    ) {
      replacementPower = SUBSTITUTION_POWER.LEFT;
    } else {
      replacementPower = SUBSTITUTION_POWER.RIGHT;
    }
    return this.getSubstitutionCount(
      additionalReplacedDefendersRequired,
      replacementPower,
      replacingCombatantBattle.availableDefendersCount
    );
  }

  private getSubstitutionCount(
    additionalReplacedDefendersRequired: number,
    replacementPower: number,
    availableDefendersCount: number
  ) {
    const substitutionInfo = {
      isSubstitutionPossible: false,
      substitutingDefendersCount: 0,
    };
    const requiredReplacingDefenders = Math.ceil(
      additionalReplacedDefendersRequired / replacementPower
    );
    if (availableDefendersCount >= requiredReplacingDefenders) {
      substitutionInfo.isSubstitutionPossible = true;
      substitutionInfo.substitutingDefendersCount = requiredReplacingDefenders;
      return substitutionInfo;
    } else {
      substitutionInfo.substitutingDefendersCount = availableDefendersCount;
      return substitutionInfo;
    }
  }
}
