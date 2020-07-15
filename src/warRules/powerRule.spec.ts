import { Battle } from '../models';
import { PowerRule } from './powerRule';

describe('PowerWarRule', () => {
  const shouldThisRuleExecute = (battles: Battle[]) => true;
  let powerRule: PowerRule;
  const tacklingPower = 2;
  let battles: Battle[];
  beforeEach(() => {
    battles = [
      { defenderTacklingPower: 1 } as Battle,
      { defenderTacklingPower: 1 } as Battle,
      { defenderTacklingPower: 1 } as Battle,
      { defenderTacklingPower: 1 } as Battle,
    ];
    powerRule = new PowerRule(tacklingPower, shouldThisRuleExecute, null);
  });

  it('should update tackling power when executed', () => {
    const updatedBattles = powerRule.execute(battles);
    expect(updatedBattles).toBeTruthy();
    expect(updatedBattles !== battles).toBeTruthy();
    updatedBattles.forEach((battle, code) => {
      expect(battle).toBeTruthy();
      expect(battle.defenderTacklingPower).toBe(tacklingPower);
    });
    expect(updatedBattles.length).toBe(4);
  });
});
