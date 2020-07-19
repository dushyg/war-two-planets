import { WarRuleTemplate } from './warRuleTemplate';
import { Battle } from '../models';
import { SubstitutionManager } from '../substitutionManager/substitutionManager';
import Container from 'typedi';
import { SubstitutionManagerService } from '../typediConfig';
/**
 * The rule that dicates how to substitute available defenders for engaged defenders when defenders in current unit as all engaged
 */
export class SubstitutionRule extends WarRuleTemplate {
  /**
   * The actual object that will execute the substitution
   */
  private substitutionManager: SubstitutionManager;
  /**
   * @param shouldThisRuleExecute The predicate function that decides if current rule will execute
   * @param nextRule Next rule that needs to be run to take the war forward or null if this is the last rule in the chain of steps
   */
  constructor(
    shouldThisRuleExecute: (battles: Battle[]) => boolean,
    nextRule: WarRuleTemplate | null,
  ) {
    super(shouldThisRuleExecute, nextRule);
    this.substitutionManager = Container.get(SubstitutionManagerService);
  }

  /**
   * Returns updated arry of battles after applying current war rule logic.
   * @param battles Array of ongoing battles
   * @returns Updated array of battles after applying curent rule logic
   */
  public updateBattleMapAsPerRule(battles: Battle[]): Battle[] {
    return this.substitutionManager.getBattlesAfterSubstitutionAttempt(battles);
  }
}
