import { FORCE_CODES } from '../constants';
import { Army } from '../models';
import { ArmyManager } from './armyManager';
import { Strength } from '../models/strength';

export class PreDefinedArmyManager implements ArmyManager {
  public getInitializeArmy(name: string): Army {
    const army: Army = {
      forces: new Map<string, Strength>([
        [
          FORCE_CODES.H,
          {
            deploymentPosition: 1,
            numberOfUnits: 100,
            tacklingPower: 2,
          } as Strength,
        ],
        [
          FORCE_CODES.E,
          {
            deploymentPosition: 2,
            numberOfUnits: 50,
            tacklingPower: 2,
          } as Strength,
        ],
        [
          FORCE_CODES.AT,
          {
            deploymentPosition: 3,
            numberOfUnits: 10,
            tacklingPower: 2,
          } as Strength,
        ],
        [
          FORCE_CODES.SG,
          {
            deploymentPosition: 4,
            numberOfUnits: 5,
            tacklingPower: 2,
          } as Strength,
        ],
      ]),
      name,
    };
    return army;
  }
}
