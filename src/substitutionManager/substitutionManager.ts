import { Army, Battle } from '../models';
import { Token } from 'typedi';

export interface SubstitutionManager {
  getBattlesAfterSubstitutionAttempt(battles: Battle[]): Battle[];
}

// export const SubstitutionManagerService = new Token<SubstitutionManager>();
