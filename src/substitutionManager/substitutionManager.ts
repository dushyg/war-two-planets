import { Battle } from '../models';

export interface SubstitutionManager {
  getBattlesAfterSubstitutionAttempt(battles: Battle[]): Battle[];
}
