import { WarRuleTemplate } from './warRuleTemplate';
import { Battle } from '../models';

export class PowerRule extends WarRuleTemplate {
  constructor(
    private tacklingPower: number,
    shouldThisRuleExecute: (battleMap: Map<string, Battle>) => boolean,
    nextRule: WarRuleTemplate | null
  ) {
    super(shouldThisRuleExecute, nextRule);
  }

  public updateBattleMapAsPerRule(
    battleMap: Map<string, Battle>
  ): Map<string, Battle> {
    const tacklingPower = this.tacklingPower;
    return new Map<string, Battle>(
      Array.from(battleMap, ([combatantCode, battle]) => [
        combatantCode,
        { ...battle, defenderTacklingPower: tacklingPower } as Battle,
      ])
    );
  }
}
