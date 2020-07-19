import { ArmyProvider } from './armyProvider';
import { Army, Combatant } from '../models';
import { InputGetter } from '../inputGetter/inputGetter';
import fs from 'fs';
import { StringInputParser } from '../inputParser/stringInputParser';
import {
  ATTACK_INPUT_STRING_START_TOKEN,
  FORCE_CODES,
  PLANET_NAMES,
  ERRORS,
} from '../constants';
import { Container } from 'typedi';
import { StringInputParserService, InputGetterService } from '../typediConfig';

/**
 * Allows to create an army object by reading and parsing process.argv
 */
export class InvaderArgsArmyProvider implements ArmyProvider {
  private inputGetter: InputGetter;
  private stringInputParser: StringInputParser;

  constructor() {
    this.inputGetter = Container.get(InputGetterService);
    this.stringInputParser = Container.get(StringInputParserService);
  }
  /**
   * Creates and returns an army object by reading and parsing process.argv
   * @returns Army object
   */
  public getArmy(): Army {
    const filePath: string = this.inputGetter.getInput();
    let input: string;

    try {
      input = fs.readFileSync(filePath).toString('utf8');
    } catch (error) {
      throw new Error(ERRORS.INVALID_INPUT_FILE_PATH);
    }

    const enemyForceMap: Map<
      string,
      number
    > = this.stringInputParser.parseString(input, [
      ATTACK_INPUT_STRING_START_TOKEN,
      FORCE_CODES.H,
      FORCE_CODES.E,
      FORCE_CODES.AT,
      FORCE_CODES.SG,
    ]);

    const army: Army = {
      forces: this.getForceMap(enemyForceMap),
      name: this.getPlanetName(),
    };

    return army;
  }

  private getForceMap(
    enemyForceMap: Map<string, number>,
  ): Map<string, Combatant> {
    return new Map<string, Combatant>(
      Array.from(enemyForceMap, ([combatantCode, combatantCount], index) => {
        return [
          combatantCode,
          {
            codeName: combatantCode,
            deploymentPosition: index,
            numberOfUnits: combatantCount,
            tacklingPower: 0.5,
          } as Combatant,
        ];
      }),
    );
  }

  private getPlanetName(): string {
    return PLANET_NAMES.FALICORNIA;
  }
}
