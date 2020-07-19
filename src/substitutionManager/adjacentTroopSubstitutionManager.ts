import { SUBSTITUTION_POWER } from '../constants';
import { Battle } from '../models';
import {
  areAnyInvadersUntackled,
  getRequiredDefendersCount,
} from '../warUtils';
import { SubstitutionManager } from './substitutionManager';

/**
 * Interface representing the outcome of a substitution attempt
 */
interface SubstitutionInfo {
  isSubstitutionPossible: boolean;
  substitutingDefendersCount: number;
  substitutedDefendersCount: number;
  substituingDefenderPosition: number;
}

/**
 * An implementation of SubstitutionManager interface that substitutes available adjacent defending combatants for exhausted combatants
 */
export class AdjacentTroopSubstitutionManager implements SubstitutionManager {
  /**
   * Iterates over battle array to see if defending forces in each battle are falling short
   * and need help to fight untackled invaders.
   * If any defender needs help and defending combatants are available either to the left or right of that defender,
   * then it tries to determine if adjacent units have enough available combatants.
   * If enough combatants are available with the adjacent friendly units, it brings over those combatatnts and updates the battle object.
   * @param battles Array of ongoing battles
   * @returns Updated array of Battle objects after attempting substitution.
   */
  public getBattlesAfterSubstitutionAttempt(battles: Battle[]): Battle[] {
    // creating a clone of batle array as we will need to update these battles
    // to reflect status after taking help from adjacent defenders i.e substitution
    const battlesToBeUpdated: Battle[] = battles.map((b) => ({ ...b }));

    return this.attemptSubstitutionOnAllBattles(battlesToBeUpdated);
  }

  /**
   * A recursive function that attempts substitution on all the battles if needed, until no defenders are available from adjacent units or attack is successfully defended.
   * The recursion stops if either substitution cant happen any more or if all attackers are tackled.
   * @param battleArray Array of ongoing battles
   */
  private attemptSubstitutionOnAllBattles(battleArray: Battle[]): Battle[] {
    let didSubstitutionHappen = false;
    battleArray.forEach((battle) => {
      const currentDefenderPosition = battle.defenderDeploymentPosition;
      if (
        this.didSubstitutionHappenForCurrentBattle(
          currentDefenderPosition,
          battleArray,
        )
      ) {
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

  /**
   *
   * @param currentDefenderPosition 0 based index of current battle / defender in battle array
   * @param battleArray Array of Battle objects representing ongoing battles
   * @returns true if a partial or a full substitution take place between defending combatants
   */
  private didSubstitutionHappenForCurrentBattle(
    currentDefenderPosition: number,
    battleArray: Battle[],
  ): boolean {
    let leftCandidateBattle;
    let rightCandidateBattle;

    const currentBattle = battleArray[currentDefenderPosition];
    // If all invading combatants have already been tackled, there is no need for substitution.
    if (currentBattle && currentBattle.untackledInvadersCount === 0) {
      return false;
    }
    let leftCandidateSubstitutionInfo;
    let rightCandidateSubstitutionInfo;

    // Checking if substitution is possible with defending unit to the left of current combatant
    const leftPosition = currentDefenderPosition - 1;
    // Check if there is any defending unit to the left of current defending unit
    if (leftPosition >= 0) {
      leftCandidateBattle = battleArray[leftPosition];
      leftCandidateSubstitutionInfo = this.getSubstitutionInfo(
        currentBattle,
        leftCandidateBattle,
      );
      // Perform substitution if enough combatants are available with the left unit to help the current unit
      if (
        leftCandidateSubstitutionInfo.isSubstitutionPossible &&
        leftCandidateBattle
      ) {
        this.substitute(
          currentBattle,
          leftCandidateBattle,
          leftCandidateSubstitutionInfo,
        );
        return true;
      }
    }

    // Checking if substitution is possible with defending unit to the right of current combatant
    const rightPosition = currentDefenderPosition + 1;
    if (rightPosition <= battleArray.length - 1) {
      rightCandidateBattle = battleArray[rightPosition];
      rightCandidateSubstitutionInfo = this.getSubstitutionInfo(
        battleArray[currentDefenderPosition],
        rightCandidateBattle,
      );
      // Perform substitution if enough combatants are available with the right unit to help the current unit
      if (
        rightCandidateSubstitutionInfo.isSubstitutionPossible &&
        rightCandidateBattle
      ) {
        this.substitute(
          currentBattle,
          rightCandidateBattle,
          rightCandidateSubstitutionInfo,
        );
        return true;
      }
    }

    if (leftCandidateSubstitutionInfo && leftCandidateBattle) {
      // if left and right units both couldnt fully tackle all enemies then bring over whatever combatants
      // we can from left unit (perform partial substitution that is possible if left unit exists)
      if (leftCandidateBattle.availableDefendersCount > 0) {
        this.substitute(
          currentBattle,
          leftCandidateBattle,
          leftCandidateSubstitutionInfo,
        );
        return true;
      }
    }

    // if left and right units both couldnt fully tackle all enemies then bring over whatever combatants
    // we can from right unit (perform partial substitution that is possible if right unit exists)
    if (rightCandidateSubstitutionInfo && rightCandidateBattle) {
      if (rightCandidateBattle.availableDefendersCount > 0) {
        this.substitute(
          currentBattle,
          rightCandidateBattle,
          rightCandidateSubstitutionInfo,
        );
        return true;
      }
    }
    return false;
  }

  /**
   * This method checks if total or partial susbtitution is possible and returns the information needed to perform actual substitution
   * @param currentBattle Current Battle that might need substitution
   * @param candidateBattle Adjacent Battle that might be the candidate to be substituted with current battle
   * @returns SubstitutionInfo object that tells if complete substition was possible or not. Also it gives the count of substituted defenders
   */
  private getSubstitutionInfo(
    currentBattle: Battle,
    candidateBattle: Battle,
  ): SubstitutionInfo {
    const substitutionInfo: SubstitutionInfo = {
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
        currentBattle.defenderTacklingPower,
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
        candidateBattle.availableDefendersCount,
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

  /**
   * Calculates the number of combatants that can be substituted and the number of combatants that are substituting, based on their relative strengths
   * @param additionalReplacedDefendersRequired
   * @param replacementPower
   * @param availableDefendersCount
   * @returns An object specifying substituting and substituted defenders count. Also tells if complete substitution is possible.
   */
  private getSubstitutionCount(
    additionalReplacedDefendersRequired: number,
    replacementPower: number,
    availableDefendersCount: number,
  ) {
    const substitutionInfo = {
      isSubstitutionPossible: false,
      substitutingDefendersCount: 0,
      substitutedDefendersCount: 0,
    };
    const requiredReplacingDefenders = Math.ceil(
      additionalReplacedDefendersRequired / replacementPower,
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

  /**
   * The method that actually performs the substitution and updates the curent and candidate battle objects
   * @param currentBattle Current Battle that might need substitution
   * @param candidateBattle Adjacent Battle that might be the candidate to be substituted with current battle
   * @param substitutionInfo SubstitutionInfo object that has details needed to perform the substitution
   */
  private substitute(
    currentBattle: Battle,
    candidateBattle: Battle,
    substitutionInfo: SubstitutionInfo,
  ): void {
    currentBattle.untackledInvadersCount =
      currentBattle.untackledInvadersCount -
      substitutionInfo.substitutedDefendersCount *
        currentBattle.defenderTacklingPower;
    candidateBattle.engagedDefendersCount =
      candidateBattle.engagedDefendersCount +
      substitutionInfo.substitutingDefendersCount;
    candidateBattle.availableDefendersCount =
      candidateBattle.availableDefendersCount -
      substitutionInfo.substitutingDefendersCount;
  }
}
