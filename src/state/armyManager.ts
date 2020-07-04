import { Army } from '../models';

export interface ArmyManager {
  getInitializeArmy(name: string): Army;
}
