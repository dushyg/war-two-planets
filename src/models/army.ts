import { Combatant } from './combatant';
export interface Army {
  name: string;
  forces: Map<string, Combatant>;
}
