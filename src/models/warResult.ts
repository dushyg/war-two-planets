/**
 * Interface representing the shape of an object for result of war
 */
export interface WarResult {
  /**
   * Result of the war - true if defence was successful else false
   */
  isDefenceSuccessful: boolean;
  /**
   * A map of combatant code vs the count of defending combatants of that type engaged to fight the attackers
   */
  forcesUsed: Map<string, number>;
}
