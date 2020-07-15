import { Battle } from '../models';

export abstract class WarRuleTemplate {
  shouldThisRuleExecute: (battles: Battle[]) => boolean;
  nextRule: WarRuleTemplate | null;

  constructor(
    shouldThisRuleExecute: (battles: Battle[]) => boolean,
    nextRule: WarRuleTemplate | null
  ) {
    this.shouldThisRuleExecute = shouldThisRuleExecute;
    this.nextRule = nextRule;
  }

  abstract updateBattleMapAsPerRule(battles: Battle[]): Battle[];

  execute(battles: Battle[]): Battle[] {
    let updatedBattles: Battle[] = battles;
    if (this.shouldThisRuleExecute(battles)) {
      updatedBattles = this.updateBattleMapAsPerRule(battles);
    }

    if (this.nextRule) {
      return this.nextRule?.execute(updatedBattles);
    } else {
      return updatedBattles;
    }
  }
}
