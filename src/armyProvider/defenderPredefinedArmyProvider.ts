import { FORCE_CODES, PLANET_NAMES } from '../constants';
import { Army, Combatant } from '../models';
import { ArmyProvider } from './armyProvider';

/**
 * Allows to createa predefined Army object based on given problem statement
 */
export class DefenderPredefinedArmyProvider implements ArmyProvider {
  /**
   * Creates and returns a predefined Army object based on given problem statement
   * @returns Army object having name and forces
   */
  public getArmy(): Army {
    return {
      forces: new Map<string, Combatant>([
        [
          FORCE_CODES.H,
          {
            codeName: FORCE_CODES.H,
            deploymentPosition: 0,
            numberOfUnits: 100,
            tacklingPower: 1,
          } as Combatant,
        ],
        [
          FORCE_CODES.E,
          {
            codeName: FORCE_CODES.E,
            deploymentPosition: 1,
            numberOfUnits: 50,
            tacklingPower: 1,
          } as Combatant,
        ],
        [
          FORCE_CODES.AT,
          {
            codeName: FORCE_CODES.AT,
            deploymentPosition: 2,
            numberOfUnits: 10,
            tacklingPower: 1,
          } as Combatant,
        ],
        [
          FORCE_CODES.SG,
          {
            codeName: FORCE_CODES.SG,
            deploymentPosition: 3,
            numberOfUnits: 5,
            tacklingPower: 1,
          } as Combatant,
        ],
      ]),
      name: PLANET_NAMES.LENGABURU,
    } as Army;
  }
}
