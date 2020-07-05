import { Army } from '../models';

export interface ArmyProvider {
  getArmy(): Army;
}
