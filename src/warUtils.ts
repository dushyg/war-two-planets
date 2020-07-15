import { Battle } from './models';

export function getRequiredDefendersCount(
  invadersCount: number,
  tacklingPower: number
): number {
  return Math.ceil(invadersCount / tacklingPower);
}

export function areAnyInvadersUntackled(battles: Battle[]) {
  return battles.some((battle) => battle.untackledInvadersCount > 0);
}
