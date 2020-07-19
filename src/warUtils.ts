import { Battle } from './models';
/**
 *
 * @param invadersCount Count of untackled combatants
 * @param tacklingPower The number of attacking combatants that this defender can tackle
 * @returns The count of defenders that will be required to tackle passed invadersCount
 */
export function getRequiredDefendersCount(
  invadersCount: number,
  tacklingPower: number,
): number {
  return Math.ceil(invadersCount / tacklingPower);
}

/**
 *
 * @param battles Array of battles representing current state of battles
 * @returns true if there is any ongoing battle which has any untackled invaders else returns false
 */
export function areAnyInvadersUntackled(battles: Battle[]): boolean {
  return battles.some((battle) => battle.untackledInvadersCount > 0);
}
