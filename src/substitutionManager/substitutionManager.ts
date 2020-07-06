import { Army, Battle } from '../models';

export interface SubstitutionManager {
  getBattlesAfterSubstitutionAttempt(
    battles: Map<string, Battle>
  ): Map<string, Battle>;
}
