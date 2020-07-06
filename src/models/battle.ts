export interface Battle {
  availableDefendersCount: number;
  untackledInvadersCount: number;
  engagedDefendersCount: number;
  invaderCombatantCode: string;
  defenderCombatantCode: string;
  defenderTacklingPower: number;
  defenderDeploymentPosition: number;
}
