import Container from 'typedi';
import { ArmyProvider } from './armyProvider/armyProvider';
import { ERRORS } from './constants';
import { WarResult } from './models';
import {
  DefenderPredefinedArmyProviderService,
  initializeTypeDiContainer,
  InvaderArgsArmyProviderService,
  WarResultFormatterService,
} from './typediConfig';
import path from 'path';
import { War } from './war';
import { WarResultStringFormatter } from './warResultFormatter/warResultStringFormatter';
describe('War', () => {
  let defenderArmyProvider: ArmyProvider;
  let invaderArmyProvider: ArmyProvider;
  let warResultStringFormatter: WarResultStringFormatter;
  const inputFilePath: string = path.join('src', 'testInputs');
  beforeEach(() => {
    process.argv = ['node', 'jest'];
    initializeTypeDiContainer();
    defenderArmyProvider = Container.get(DefenderPredefinedArmyProviderService);
    invaderArmyProvider = Container.get(InvaderArgsArmyProviderService);
    warResultStringFormatter = Container.get(WarResultFormatterService);
  });
  it('should return correct output when like for like rule is enough - FALICORNIA_ATTACK 2H 4E 0AT 6SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput1.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('WINS 1H 2E 0AT 3SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 250H 50E 20AT 15SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('LOSES 100H 38E 10AT 5SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 204H 20E 0AT 0SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput2.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('WINS 100H 11E 0AT 0SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 0H 0E 14AT 12SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput3.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('WINS 0H 0E 9AT 5SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 50H 104E 6AT 2SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput4.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('WINS 29H 50E 3AT 1SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 200H 100E 25AT 8SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput8.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('LOSES 100H 50E 10AT 5SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 250H 50E 3AT 1SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput5.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('WINS 100H 38E 2AT 1SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK FALICORNIA_ATTACK 100H 70E 26AT 12SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput6.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('LOSES 50H 41E 10AT 5SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 200H 58E 18AT 12SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput7.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);
    expect(output).toEqual('LOSES 100H 29E 10AT 5SG');
  });

  it('should return correct output when input is FALICORNIA_ATTACK 198H 102E 20AT 8SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput9.txt'));
    const war = new War();
    const warResult: WarResult = war.fight(
      invaderArmyProvider.getArmy(),
      defenderArmyProvider.getArmy(),
    );
    const output = warResultStringFormatter.format(warResult);

    expect(output).toEqual('LOSES 100H 50E 10AT 4SG');
  });

  it('should return error when forces are in incorrect order FALICORNIA_ATTACK 50E 250H 20AT 15SG', () => {
    process.argv.push(path.join(inputFilePath, 'errorIncorrectOrderInput.txt'));
    const war = new War();

    expect(() => {
      war.fight(invaderArmyProvider.getArmy(), defenderArmyProvider.getArmy());
    }).toThrow(ERRORS.INVALID_INPUT_STRING);
  });

  it('should return error when there are spaces after input text |FALICORNIA_ATTACK 250H 50E 20AT 15SG |', () => {
    process.argv.push(path.join(inputFilePath, 'errorExtraSpaceInput1.txt'));
    const war = new War();

    expect(() => {
      war.fight(invaderArmyProvider.getArmy(), defenderArmyProvider.getArmy());
    }).toThrow(ERRORS.INVALID_INPUT_STRING);
  });

  it('should return error when there are spaces before input text | FALICORNIA_ATTACK 250H 50E 20AT 15SG|', () => {
    process.argv.push(path.join(inputFilePath, 'errorExtraSpaceInput2.txt'));
    const war = new War();

    expect(() => {
      war.fight(invaderArmyProvider.getArmy(), defenderArmyProvider.getArmy());
    }).toThrow(ERRORS.INVALID_INPUT_STRING);
  });

  it('should return error when input file is empty', () => {
    process.argv.push(path.join(inputFilePath, 'errorEmptyFile.txt'));
    const war = new War();

    expect(() => {
      war.fight(invaderArmyProvider.getArmy(), defenderArmyProvider.getArmy());
    }).toThrow(ERRORS.NO_OR_EMPTY_INPUT_STRING);
  });

  it('should return error when input file path is invalid', () => {
    process.argv.push(path.join(inputFilePath, 'invalidFile.txt'));
    const war = new War();

    expect(() => {
      war.fight(invaderArmyProvider.getArmy(), defenderArmyProvider.getArmy());
    }).toThrow(ERRORS.INVALID_INPUT_FILE_PATH);
  });

  it('should return error when no input file path is passed while invoking app', () => {
    const war = new War();

    expect(() => {
      war.fight(invaderArmyProvider.getArmy(), defenderArmyProvider.getArmy());
    }).toThrow(ERRORS.NO_INPUT_FILE_PATH);
  });
});
