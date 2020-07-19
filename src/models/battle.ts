/**
 * Interface representing the shape of a Battle object
 */
export interface Battle {
  /**
   * Count of defending combatants available to tackle enemy combatants
   */
  availableDefendersCount: number;
  /**
   * Count of enemy combatants which have not been tackled yet by defending combatants
   */
  untackledInvadersCount: number;
  /**
   * Count of defending combatants currently engaged in tackling enemy combatants
   */
  engagedDefendersCount: number;
  /**
   * Code name of invading combatant eg. 'H', or 'E', or 'SG' etc
   */
  invaderCombatantCode: string;
  /**
   * Code name of defending combatant eg. 'H', or 'E', or 'SG' etc
   */
  defenderCombatantCode: string;
  /**
   * The count of attacking combatants that 1 defender combatant of current type can tackle/engage
   */
  defenderTacklingPower: number;
  /**
   * Position of the current defender type from left to right - starts from 0
   */
  defenderDeploymentPosition: number;
}
