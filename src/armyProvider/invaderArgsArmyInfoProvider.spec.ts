import { InvaderArgsArmyProvider } from './invaderArgsArmyProvider';
import { ArgsInputGetter } from '../inputGetter/argsInputGetter';
import { SpaceDelimitedInputParser } from '../inputParser/spaceDelimitedInputParser';
import { PLANET_NAMES, FORCE_CODES } from '../constants';

describe('InvaderArgsArmyInfoProvider', () => {
  it('should create and return an army object if valid input is passed as arguments', () => {
    const provider = new InvaderArgsArmyProvider(
      new ArgsInputGetter(),
      new SpaceDelimitedInputParser()
    );
    process.argv = ['node', 'jest', 'FALICORNIA_ATTACK 250H 50E 20AT 15SG'];

    const army = provider.getArmy();

    expect(army).toBeTruthy();
    expect(army.name).toBe(PLANET_NAMES.FALICORNIA);
    expect(army.forces).toBeTruthy();
    expect(army.forces.size).toBe(4);
    expect(army.forces.get(FORCE_CODES.H)).toEqual(250);
    expect(army.forces.get(FORCE_CODES.E)).toEqual(50);
    expect(army.forces.get(FORCE_CODES.AT)).toEqual(20);
    expect(army.forces.get(FORCE_CODES.SG)).toEqual(15);
  });
});
