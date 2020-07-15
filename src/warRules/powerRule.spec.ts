import { Battle } from '../models';
import { PowerRule } from './powerRule';

describe('PowerWarRule', () => {
  const shouldThisRuleExecute = (battleMap: Map<string, Battle>) => true;
  let powerRule: PowerRule;
  const tacklingPower = 2;
  let battleMap: Map<string, Battle>;
  beforeEach(() => {
    battleMap = new Map<string, Battle>([
      ['H', { defenderTacklingPower: 1 } as Battle],
      ['E', { defenderTacklingPower: 1 } as Battle],
      ['AT', { defenderTacklingPower: 1 } as Battle],
      ['SG', { defenderTacklingPower: 1 } as Battle],
    ]);
    powerRule = new PowerRule(tacklingPower, shouldThisRuleExecute, null);
  });

  it('should update tackling power when executed', () => {
    const updatedMap = powerRule.execute(battleMap);
    expect(updatedMap).toBeTruthy();
    expect(updatedMap !== battleMap).toBeTruthy();
    updatedMap.forEach((battle, code) => {
      expect(battle).toBeTruthy();
      expect(battle.defenderTacklingPower).toBe(tacklingPower);
    });
    expect(updatedMap.size).toBe(4);
  });
});
