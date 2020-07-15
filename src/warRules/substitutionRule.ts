import { WarRuleTemplate } from './warRuleTemplate';
import { Battle } from '../models';
import { SubstitutionManager } from '../substitutionManager/substitutionManager';
import Container from 'typedi';
import { SubstitutionManagerService } from '../typediConfig';

export class SubstitutionRule extends WarRuleTemplate {
  private substitutionManager: SubstitutionManager;
  constructor(
    shouldThisRuleExecute: (battleMap: Map<string, Battle>) => boolean,
    nextRule: WarRuleTemplate | null
  ) {
    super(shouldThisRuleExecute, nextRule);
    this.substitutionManager = Container.get(SubstitutionManagerService);
  }

  public updateBattleMapAsPerRule(
    battleMap: Map<string, Battle>
  ): Map<string, Battle> {
    return this.substitutionManager.getBattlesAfterSubstitutionAttempt(
      battleMap
    );
  }
}
