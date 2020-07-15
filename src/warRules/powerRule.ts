import { WarRuleTemplate } from './warRuleTemplate';
import { Battle } from '../models';

export class PowerRule extends WarRuleTemplate {
  constructor(
    private tacklingPower: number,
    shouldThisRuleExecute: (battles: Battle[]) => boolean,
    nextRule: WarRuleTemplate | null
  ) {
    super(shouldThisRuleExecute, nextRule);
  }

  public updateBattleMapAsPerRule(battles: Battle[]): Battle[] {
    return battles.map((battle) => ({
      ...battle,
      defenderTacklingPower: this.tacklingPower,
    }));
  }
}
