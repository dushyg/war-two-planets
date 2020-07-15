import { Combatant, Army, WarResult } from '../models';
import Container from 'typedi';
import { WarResultFormatterService } from '../typediConfig';
import { SpaceDelimitedStringFormatter } from '../warResultFormatter/spaceDelimitedStringFormatter';
import { ConsoleOutputWriter } from './ConsoleOutputWriter';

describe('ConsoleOutputWriter', () => {
  it('write should write to console', () => {
    Container.set(
      WarResultFormatterService,
      new SpaceDelimitedStringFormatter()
    );
    const consoleSpy = jest.spyOn(console, 'log');
    const outputWriter = new ConsoleOutputWriter();
    outputWriter.write({
      isDefenceSuccessful: true,
      forcesUsed: new Map<string, number>([
        ['H', 10],
        ['E', 20],
        ['AT', 5],
        ['SG', 3],
      ]),
    } as WarResult);
    expect(consoleSpy).toHaveBeenCalledWith('WINS 10H 20E 5AT 3SG');
  });
});