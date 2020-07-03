import { ERRORS } from '../constants';
import { SpaceDelimitedInputParser } from './spaceDelimitedInputParser';

describe('SpaceDelimitedInputParser', () => {
  it('should be able to parse input when input is in correct format', () => {
    const enemyMap: Map<
      string,
      number
    > = new SpaceDelimitedInputParser().parseString(
      'FALICORNIA_ATTACK 250H 50E 3AT 15SG'
    );
    expect(enemyMap).toBeTruthy();
    expect(enemyMap.size).toEqual(4);
    expect(enemyMap.get('H')).toEqual(250);
    expect(enemyMap.get('E')).toEqual(50);
    expect(enemyMap.get('AT')).toEqual(3);
    expect(enemyMap.get('SG')).toEqual(15);
  });

  it('should throw an error when no or empty input is passed', () => {
    expect(() => {
      new SpaceDelimitedInputParser().parseString('');
    }).toThrowError(ERRORS.noOrEmptyInputString);
  });
});
