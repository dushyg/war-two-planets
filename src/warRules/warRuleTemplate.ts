import { Battle } from '../models';
/**
 * The base class representing a Rule based on which war will be fought.
 * This class provides a template method 'execute' that dictates the steps that need to take place while executing this rule.
 * First we need to check if the rule needs to run and then update the array of Battles as per the rule.
 * Concrete classes that extend this class will need to provide implementation for 'updateBattleMapAsPerRule' method.
 * Current rule is executed if 'shouldThisRuleExecute' returns true and then it invokes the 'execute' method on the next rule if it exists.
 */
export abstract class WarRuleTemplate {
  /**
   * A predicate function that will be used to determine if current rule logic needs to execute or not
   */
  shouldThisRuleExecute: (battles: Battle[]) => boolean;
  /**
   * Next rule that needs to execute on top of the updates made by current rule to Battle array
   */
  nextRule: WarRuleTemplate | null;

  /**
   *
   * @param shouldThisRuleExecute A predicate function that will be used to determine if current rule logic needs to execute or not
   * @param nextRule Next rule that needs to execute on top of the updates made by current rule to Battle array
   */
  constructor(
    shouldThisRuleExecute: (battles: Battle[]) => boolean,
    nextRule: WarRuleTemplate | null,
  ) {
    this.shouldThisRuleExecute = shouldThisRuleExecute;
    this.nextRule = nextRule;
  }
  /**
   * Returns updated arry of battles after applying current war rule logic.
   * This method needs to be implemented by classes executing this base class
   * @param battles Array of onging battles that will be updated by the current rule
   * @returns Array of updated battles after applying current rule logic
   */
  abstract updateBattleMapAsPerRule(battles: Battle[]): Battle[];

  /**
   * The method which executes the current rule logic
   * @param battles Array of onging battles that will be updated by the current rule
   * @returns Array of updated battles after applying current rule logic
   */
  execute(battles: Battle[]): Battle[] {
    let updatedBattles: Battle[] = battles;
    if (this.shouldThisRuleExecute(battles)) {
      updatedBattles = this.updateBattleMapAsPerRule(battles);
    }

    if (this.nextRule) {
      return this.nextRule.execute(updatedBattles);
    } else {
      return updatedBattles;
    }
  }
}
