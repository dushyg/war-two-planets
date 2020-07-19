import { Combatant } from './combatant';
/**
 * Interface specifying the shape of object representing an Army
 */
export interface Army {
  /**
   * Name of the army
   */
  name: string;
  /**
   * A map of combatant code vs Combatant Object
   */
  forces: Map<string, Combatant>;
}
