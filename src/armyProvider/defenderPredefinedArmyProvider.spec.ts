import { PLANET_NAMES } from '../constants';
import { DefenderPredefinedArmyProvider } from './defenderPredefinedArmyProvider';

describe('DefenderPredefinedArmyProvider', () => {
  it('should return predefined army object', () => {
    const provider = new DefenderPredefinedArmyProvider();
    const army = provider.getArmy();
    expect(army).toBeTruthy();
    expect(army.name).toBe(PLANET_NAMES.LENGABURU);
    expect(army.forces).toBeTruthy();
    expect(army.forces.size).toBe(4);
  });
});
