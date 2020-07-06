export function getRequiredDefendersCount(
  invadersCount: number,
  tacklingPower: number
): number {
  return Math.ceil(invadersCount / tacklingPower);
}
