import { Army, Battle } from '../models';
import { Token } from 'typedi';

export interface SubstitutionManager {
  getBattlesAfterSubstitutionAttempt(
    battles: Map<string, Battle>
  ): Map<string, Battle>;
}

// export const SubstitutionManagerService = new Token<SubstitutionManager>();
