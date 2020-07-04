import { Battle } from '../models';

export interface State {
  /**
   * A Map of all the battles that are going on between various forces.
   * Key is combatant code value is Battle object
   */
  battles: Map<string, Battle>;
  victor: string;
  error: string;
}
