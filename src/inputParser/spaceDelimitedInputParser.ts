import { StringInputParser } from './stringInputParser';
import { ERRORS } from '../constants';

export class SpaceDelimitedInputParser implements StringInputParser {
  /**
   * Parses a string into a map listing enemy attack forces.
   * Throws an error if input string doesnt match expected pattern.
   * Returns an empty map if input doesnt match expected input.
   * @param input String describing enemy forces like FALICORNIA_ATTACK 250H 50E 20AT 15SG
   * @param tokensToParse An array of tokens to parse like ['FALICORNIA_ATTACK','H', 'E', 'AT', 'SG']
   * @returns A map of enemy combatant code name to their count.
   */
  public parseString(
    input: string,
    tokensToParse: string[],
  ): Map<string, number> {
    if (!this.validateInput(input, tokensToParse)) {
      throw new Error(ERRORS.INVALID_INPUT_STRING);
    }

    return this.createEnemyCountMap(tokensToParse, input);
  }

  /**
   * Validates the attackString to search for all the tokens passed in that order.
   * Returns true if attackString is an exact match else false.
   * Throws error if input passed is empty
   * @param attackString Input string to parse like FALICORNIA_ATTACK 250H 50E 3AT 15SG
   * @param tokensToParse An array of tokens to parse like ['FALICORNIA_ATTACK','H', 'E', 'AT', 'SG']
   * @returns true, if input was valid else false
   */
  private validateInput(
    attackString: string,
    tokensToParse: string[],
  ): boolean {
    if (!attackString) {
      throw new Error(ERRORS.NO_OR_EMPTY_INPUT_STRING);
    }
    // Regex which tries to verify an exact match between attack string and expected format
    const regex = this.createMatcherRegexFromTokens(tokensToParse);
    return regex.test(attackString);
  }

  /**
   * Creates a regex object of the form 'FALICORNIA_ATTACK \d+H \d+E \d+AT \d+SG'
   * @param tokensToParse An array of tokens to parse like ['FALICORNIA_ATTACK','H', 'E', 'AT', 'SG']
   */
  private createMatcherRegexFromTokens(tokensToParse: string[]): RegExp {
    const regexString = tokensToParse.reduce(
      this.buildRegex('\\d+'),
      tokensToParse[0],
    );
    return new RegExp(`^${regexString}$`);
  }

  /**
   * Creates and returns a map of enemy combatant code to their count.
   * Returns an empty map if attackString doesnt match
   * @param tokensToParse An array of tokens to parse like ['FALICORNIA_ATTACK','H', 'E', 'AT', 'SG']
   * @param attackString Input string to parse like FALICORNIA_ATTACK 250H 50E 3AT 15SG
   */
  private createEnemyCountMap(
    tokensToParse: string[],
    attackString: string,
  ): Map<string, number> {
    const regex = this.createRegexToExtractCounts(tokensToParse);
    const matches = attackString.match(regex);

    if (matches) {
      return this.extractEnemyCounts(tokensToParse.slice(1), matches.slice(1));
    }
    return new Map<string, number>();
  }

  /**
   * Creates a RegExp object of the form 'FALICORNIA_ATTACK (\d+)H (\d+)E (\d+)AT (\d+)SG'
   * This regex when used with method match on attackString will give an array of extracted counts
   * @param codeArr array of enemy combatant code names like ['H','E','AT','SG']
   */
  private createRegexToExtractCounts(codeArr: string[]) {
    const regexString = codeArr.reduce(this.buildRegex('(\\d+)'), codeArr[0]);
    return new RegExp(`${regexString}`);
  }

  /**
   * Creates and returns a map of enemy combatant code to their count.
   * @param codeArr array of enemy combatant code names like ['H','E','AT','SG']
   * @param matches RegExp matches array obtained by calling match method on attackstring
   */
  private extractEnemyCounts(
    codeArr: string[],
    matches: RegExpMatchArray,
  ): Map<string, number> {
    return codeArr.reduce((countMap, code, index) => {
      countMap.set(code, parseInt(matches[index], 10));
      return countMap;
    }, new Map<string, number>());
  }

  /**
   * Reducer callback function which takes a regex matcher string and predends it to the reduced array item
   * @param matcher Regex token like (\\d+) or \\d+ that will be prepended to tokens
   */
  private buildRegex(
    matcher: string,
  ): (
    previousValue: string,
    currentValue: string,
    currentIndex: number,
    array: string[],
  ) => string {
    return (finalRegex, token, index) => {
      if (index > 0) {
        return `${finalRegex} ${matcher}${token}`;
      } else {
        return token;
      }
    };
  }
}
