import { WarResultStringFormatter } from './warResultStringFormatter';
import { WarResult } from '../models';
import { OUTCOMES } from '../constants';
/**
 * Implementation of WarResultStringFormatter interface that formats WarResult object to a space delimited string format e.g. WINS 29H 50E 3AT 1SG or LOSES 100H 50E 10AT 5SG
 */
export class SpaceDelimitedStringFormatter implements WarResultStringFormatter {
  /**
   * Formats the war result instance to a string representation eg. WINS 29H 50E 3AT 1SG or LOSES 100H 50E 10AT 5SG
   * @param warResult WarResult instance - Outcome of the war fought between defending and attacking forces
   */
  public format(warResult: WarResult): string {
    const outcome = warResult.isDefenceSuccessful
      ? OUTCOMES.WINS
      : OUTCOMES.LOSES;
    return Array.from(warResult.forcesUsed).reduce(
      (resultString, [combatant, count]) => {
        return `${resultString} ${count}${combatant}`;
      },
      outcome,
    );
  }
}
