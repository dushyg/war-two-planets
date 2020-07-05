import { Army, WarResult } from './models';
import { StateManager } from './state/stateManager';
import { War } from './war';
import { ArmyProvider } from './armyProvider/armyProvider';
import { CombatantMatcher } from './combatantMatcher/combatantMatcher';

class App {
  constructor(
    private stateManager: StateManager,
    private defenderArmyProvider: ArmyProvider,
    private invaderArmyProvider: ArmyProvider,
    private combatantMatcher: CombatantMatcher
  ) {}
  public start(): void {
    try {
      const war = new War(this.stateManager, this.combatantMatcher);
      const warResult: WarResult = war.fight(
        this.invaderArmyProvider.getArmy(),
        this.defenderArmyProvider.getArmy()
      );

      // todo ouptut result to console
    } catch (error) {
      this.stateManager.setError(error);
      throw error;
    }
  }
}
// App.start();
