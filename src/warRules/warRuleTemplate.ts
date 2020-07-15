import { WarRule } from './warRule';
import { Battle } from '../models';

export abstract class WarRuleTemplate {
  shouldThisRuleExecute: (battleMap: Map<string, Battle>) => boolean;
  nextRule: WarRuleTemplate | null;

  constructor(
    shouldThisRuleExecute: (battleMap: Map<string, Battle>) => boolean,
    nextRule: WarRuleTemplate | null
  ) {
    this.shouldThisRuleExecute = shouldThisRuleExecute;
    this.nextRule = nextRule;
  }

  abstract updateBattleMapAsPerRule(
    battleMap: Map<string, Battle>
  ): Map<string, Battle>;

  execute(battleMap: Map<string, Battle>): Map<string, Battle> {
    let updatedBattleMap: Map<string, Battle> = battleMap;
    if (this.shouldThisRuleExecute(battleMap)) {
      updatedBattleMap = this.updateBattleMapAsPerRule(battleMap);
    }

    if (this.nextRule) {
      return this.nextRule?.execute(updatedBattleMap);
    } else {
      return updatedBattleMap;
    }
  }
}
