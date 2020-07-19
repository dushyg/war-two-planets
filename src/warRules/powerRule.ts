import { WarRuleTemplate } from './warRuleTemplate';
import { Battle } from '../models';

/**
 * The rule that sets up tackling power of a defender combatant vs attcker combatant.
 */
export class PowerRule extends WarRuleTemplate {
  /**
   *
   * @param tacklingPower Number of attackers that a defender can tackle
   * @param shouldThisRuleExecute The predicate function that decides if current rule will execute
   * @param nextRule Next rule that needs to be run to take the war forward
   */
  constructor(
    private tacklingPower: number,
    shouldThisRuleExecute: (battles: Battle[]) => boolean,
    nextRule: WarRuleTemplate | null,
  ) {
    super(shouldThisRuleExecute, nextRule);
  }

  /**
   *
   * @param battles Array of ongoing battles
   * @returns Array of updated battles after setting up tackling power of defenders
   */
  public updateBattleMapAsPerRule(battles: Battle[]): Battle[] {
    return battles.map((battle) => ({
      ...battle,
      defenderTacklingPower: this.tacklingPower,
    }));
  }
}
