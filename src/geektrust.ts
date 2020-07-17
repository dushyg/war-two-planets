import { Container } from 'typedi';
import { ArmyProvider } from './armyProvider/armyProvider';
import { WarResult } from './models';
import {
  DefenderPredefinedArmyProviderService,
  InvaderArgsArmyProviderService,
  initializeTypeDiContainer,
  OutputWriterService,
} from './typediConfig';
import { War } from './war';
import { OutputWriter } from './outputWriter/outputWriter';

class App {
  private defenderArmyProvider: ArmyProvider;
  private invaderArmyProvider: ArmyProvider;
  private outputWriter: OutputWriter;
  constructor() {
    this.defenderArmyProvider = Container.get(
      DefenderPredefinedArmyProviderService,
    );
    this.invaderArmyProvider = Container.get(InvaderArgsArmyProviderService);
    this.outputWriter = Container.get(OutputWriterService);
  }
  public start(): void {
    try {
      const war = new War();
      const warResult: WarResult = war.fight(
        this.invaderArmyProvider.getArmy(),
        this.defenderArmyProvider.getArmy(),
      );
      this.outputWriter.write(warResult);
    } catch (error) {
      console.error(error);
    }
  }
}
// Initialize Dependency Injection Container
initializeTypeDiContainer();
new App().start();
