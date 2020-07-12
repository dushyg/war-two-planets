// import 'reflect-metadata';
import { InvaderArgsArmyProvider } from './invaderArgsArmyProvider';
import { ArgsInputGetter } from '../inputGetter/argsInputGetter';
import { SpaceDelimitedInputParser } from '../inputParser/spaceDelimitedInputParser';
import { PLANET_NAMES, FORCE_CODES } from '../constants';
import Container from 'typedi';
import { InputGetterService, StringInputParserService } from '../typediConfig';

describe('InvaderArgsArmyInfoProvider', () => {
  it('should create and return an army object if valid input is passed as arguments', () => {
    Container.set(InputGetterService, new ArgsInputGetter());
    Container.set(StringInputParserService, new SpaceDelimitedInputParser());
    const provider = new InvaderArgsArmyProvider();
    process.argv = ['node', 'jest', 'src\\testInputs\\warInput.txt'];

    const army = provider.getArmy();

    expect(army).toBeTruthy();
    expect(army.name).toBe(PLANET_NAMES.FALICORNIA);
    expect(army.forces).toBeTruthy();
    expect(army.forces.size).toBe(4);
    expect(army.forces.get(FORCE_CODES.H)).toBeTruthy();
    expect(army.forces.get(FORCE_CODES.H)?.numberOfUnits).toEqual(250);
    expect(army.forces.get(FORCE_CODES.E)).toBeTruthy();
    expect(army.forces.get(FORCE_CODES.E)?.numberOfUnits).toEqual(50);
    expect(army.forces.get(FORCE_CODES.AT)).toBeTruthy();
    expect(army.forces.get(FORCE_CODES.AT)?.numberOfUnits).toEqual(20);
    expect(army.forces.get(FORCE_CODES.SG)).toBeTruthy();
    expect(army.forces.get(FORCE_CODES.SG)?.numberOfUnits).toEqual(15);
  });
});
