export interface StringInputParser {
  /**
   * Parses a string into a map listing enemy attack forces
   * @param input String describing enemy forces like FALICORNIA_ATTACK 250H 50E 20AT 15SG
   */
  parseString(input: string): Map<string, number>;
}
