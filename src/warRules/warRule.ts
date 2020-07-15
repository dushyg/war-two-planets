import { Battle } from '../models';

export interface WarRule {
  shouldThisRuleExecute: (battleMap: Map<string, Battle>) => boolean;

  nextRule: WarRule | null;

  execute(battleMap: Map<string, Battle>): Map<string, Battle>;
}
