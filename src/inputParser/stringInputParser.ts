import { Token } from 'typedi';

export interface StringInputParser {
  /**
   * Parses a string into a map listing enemy attack forces
   * @param input String describing enemy forces like FALICORNIA_ATTACK 250H 50E 20AT 15SG
   * @param tokensToParse An array of tokens to parse like ['FALICORNIA_ATTACK','H', 'E', 'AT', 'SG']
   * @returns A map of enemy combatant code name to their count
   */
  parseString(input: string, tokensToParse: string[]): Map<string, number>;
}

// export const StringInputParserService = new Token<StringInputParser>();
