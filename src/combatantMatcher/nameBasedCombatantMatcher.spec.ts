import { NameBasedCombatantMatcher } from './nameBasedCombatantMatcher';
import { Combatant, Army } from '../models';

describe('NameBasedCombatantMatcher', () => {
  it('getDefender should return default object when no match is found', () => {
    const combatant: Combatant = new NameBasedCombatantMatcher().getDefender(
      {} as Combatant,
      { forces: new Map<string, Combatant>() } as Army,
    );

    expect(combatant).toMatchSnapshot();
  });
});
