import { Army } from '../models';
/**
 * Interface to be implemented to provide an Army instance
 */
export interface ArmyProvider {
  getArmy(): Army;
}
