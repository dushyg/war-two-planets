import { PLANET_NAMES } from '../constants';
import { PreDefinedArmyManager } from './preDefinedArmyManager';

describe('PredefinedArmyManager', () => {
  it('should return initilized army object', () => {
    const manager = new PreDefinedArmyManager();
    const army = manager.getInitializeArmy(PLANET_NAMES.FALICORNIA);
    expect(army).toBeTruthy();
    expect(army.name).toBe(PLANET_NAMES.FALICORNIA);
    expect(army.forces).toBeTruthy();
    expect(army.forces.size).toBe(4);
  });
});
