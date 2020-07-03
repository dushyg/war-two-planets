import { StringInputParser } from './stringInputParser';
import { ERRORS, CONFIG, ATTACK_INPUT_STRING_START_TOKEN } from '../constants';

export class SpaceDelimitedInputParser implements StringInputParser {
  /**
   * Parses a string into a map listing enemy attack forces
   * @param input String describing enemy forces like FALICORNIA_ATTACK 250H 50E 20AT 15SG
   * @returns A map of enemy combatant code name to their count
   */
  public parseString(input: string): Map<string, number> {
    const attackString = input ? input.trim() : input;
    if (!input) {
      throw new Error(ERRORS.noOrEmptyInputString);
    }
    if (!this.validateInput(attackString)) {
      throw new Error(ERRORS.invalidInputString);
    }

    return this.extractCount(['H', 'E', 'AT', 'SG'], attackString);
  }

  // FALICORNIA_ATTACK 250H 50E 3AT 15SG
  private validateInput(attackString: string): boolean {
    const regex = new RegExp(
      `^${ATTACK_INPUT_STRING_START_TOKEN} \\d+H \\d+E \\d+AT \\d+SG$`
    );
    return regex.test(attackString);
  }

  private extractCount(
    codeArr: string[],
    attackString: string
  ): Map<string, number> {
    const regex = new RegExp(
      // tslint:disable-next-line: max-line-length
      `${ATTACK_INPUT_STRING_START_TOKEN} (\\d+)${codeArr[0]} (\\d+)${codeArr[1]} (\\d+)${codeArr[2]} (\\d+)${codeArr[3]}`
    );
    const matches = attackString.match(regex);

    if (matches) {
      return codeArr.reduce((countMap, code, index) => {
        countMap.set(code, parseInt(matches[index + 1], 10));
        return countMap;
      }, new Map<string, number>());
    }
    return new Map<string, number>();
  }
}
