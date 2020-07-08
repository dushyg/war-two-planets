// import 'reflect-metadata';
import { Army, Combatant } from '../models';
import { Token } from 'typedi';

export interface CombatantMatcher {
  getDefender(invader: Combatant, defenderArmy: Army): Combatant;
}

// export const CombatantMatcherService = new Token<CombatantMatcher>();
