import { WarResultStringFormatter } from './warResultStringFormatter';
import { WarResult } from '../models';
import { OUTCOMES } from '../constants';

export class SpaceDelimitedStringFormatter implements WarResultStringFormatter {
  public format(warResult: WarResult): string {
    const outcome = warResult.isDefenceSuccessful
      ? OUTCOMES.WINS
      : OUTCOMES.LOSES;
    return Array.from(warResult.forcesUsed).reduce(
      (resultString, [combatant, count]) => {
        return `${resultString} ${count}${combatant}`;
      },
      outcome
    );
  }
}
