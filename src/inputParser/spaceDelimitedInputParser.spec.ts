import {
  ERRORS,
  ATTACK_INPUT_STRING_START_TOKEN,
  FORCE_CODES,
} from '../constants';
import { SpaceDelimitedInputParser } from './spaceDelimitedInputParser';

describe('SpaceDelimitedInputParser', () => {
  let tokensToParse: string[];
  beforeEach(() => {
    tokensToParse = [
      ATTACK_INPUT_STRING_START_TOKEN,
      FORCE_CODES.H,
      FORCE_CODES.E,
      FORCE_CODES.AT,
      FORCE_CODES.SG,
    ];
  });
  it('should be able to parse input when input is in correct format', () => {
    const enemyMap: Map<
      string,
      number
    > = new SpaceDelimitedInputParser().parseString(
      `${ATTACK_INPUT_STRING_START_TOKEN} 250H 50E 3AT 15SG`,
      tokensToParse
    );
    expect(enemyMap).toBeTruthy();
    expect(enemyMap.size).toEqual(4);
    expect(enemyMap.get(FORCE_CODES.H)).toEqual(250);
    expect(enemyMap.get(FORCE_CODES.E)).toEqual(50);
    expect(enemyMap.get(FORCE_CODES.AT)).toEqual(3);
    expect(enemyMap.get(FORCE_CODES.SG)).toEqual(15);
  });

  it('should be able to parse input with all 0 values', () => {
    const enemyMap: Map<
      string,
      number
    > = new SpaceDelimitedInputParser().parseString(
      `${ATTACK_INPUT_STRING_START_TOKEN} 0H 0E 0AT 0SG`,
      tokensToParse
    );
    expect(enemyMap).toBeTruthy();
    expect(enemyMap.size).toEqual(4);
    expect(enemyMap.get(FORCE_CODES.H)).toEqual(0);
    expect(enemyMap.get(FORCE_CODES.E)).toEqual(0);
    expect(enemyMap.get(FORCE_CODES.AT)).toEqual(0);
    expect(enemyMap.get(FORCE_CODES.SG)).toEqual(0);
  });

  it('should throw an error when no or empty input is passed', () => {
    expect(() => {
      new SpaceDelimitedInputParser().parseString('', tokensToParse);
    }).toThrowError(ERRORS.noOrEmptyInputString);
  });

  it('should throw an error when input has leading spaces', () => {
    expect(() => {
      new SpaceDelimitedInputParser().parseString(
        `   ${ATTACK_INPUT_STRING_START_TOKEN} 250H 50E 3AT 15SG`,
        tokensToParse
      );
    }).toThrowError(ERRORS.invalidInputString);
  });

  it('should throw an error when input has trailing spaces', () => {
    expect(() => {
      new SpaceDelimitedInputParser().parseString(
        `${ATTACK_INPUT_STRING_START_TOKEN} 250H 50E 3AT 15SG  `,
        tokensToParse
      );
    }).toThrowError(ERRORS.invalidInputString);
  });
  it('should throw an error when input doesnt start with ATTACK_INPUT_STRING_START_TOKEN', () => {
    expect(() => {
      new SpaceDelimitedInputParser().parseString(
        '250H 50E 3AT 15SG',
        tokensToParse
      );
    }).toThrowError(ERRORS.invalidInputString);
  });

  it('should throw an error when input doesnt have H, E, AT, SG in order', () => {
    expect(() => {
      new SpaceDelimitedInputParser().parseString(
        `${ATTACK_INPUT_STRING_START_TOKEN} 50E 250H 3AT 15SG`,
        tokensToParse
      );
    }).toThrowError(ERRORS.invalidInputString);
  });

  it('should be able to parse input even with more than 4 combatants', () => {
    tokensToParse = tokensToParse.concat('C');
    const enemyMap: Map<
      string,
      number
    > = new SpaceDelimitedInputParser().parseString(
      `${ATTACK_INPUT_STRING_START_TOKEN} 250H 50E 3AT 15SG 10C`,
      tokensToParse
    );
    expect(enemyMap).toBeTruthy();
    expect(enemyMap.size).toEqual(5);
    expect(enemyMap.get('H')).toEqual(250);
    expect(enemyMap.get('E')).toEqual(50);
    expect(enemyMap.get('AT')).toEqual(3);
    expect(enemyMap.get('SG')).toEqual(15);
    expect(enemyMap.get('C')).toEqual(10);
  });

  it('should be able to parse input with different start string', () => {
    tokensToParse[0] = 'ATTACK_INPUT_STRING_START_TOKEN';
    tokensToParse = tokensToParse.concat('C');
    const enemyMap: Map<
      string,
      number
    > = new SpaceDelimitedInputParser().parseString(
      `ATTACK_INPUT_STRING_START_TOKEN 250H 50E 3AT 15SG 10C`,
      tokensToParse
    );
    expect(enemyMap).toBeTruthy();
    expect(enemyMap.size).toEqual(5);
    expect(enemyMap.get('H')).toEqual(250);
    expect(enemyMap.get('E')).toEqual(50);
    expect(enemyMap.get('AT')).toEqual(3);
    expect(enemyMap.get('SG')).toEqual(15);
    expect(enemyMap.get('C')).toEqual(10);
  });
});
