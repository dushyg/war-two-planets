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
      DefenderPredefinedArmyProviderService
    );
    this.invaderArmyProvider = Container.get(InvaderArgsArmyProviderService);
    this.outputWriter = Container.get(OutputWriterService);
  }
  // constructor(
  //   private defenderArmyProvider: ArmyProvider,
  //   private invaderArmyProvider: ArmyProvider
  // ) {}
  public start(): void {
    try {
      const war = new War();
      const warResult: WarResult = war.fight(
        this.invaderArmyProvider.getArmy(),
        this.defenderArmyProvider.getArmy()
      );
      this.outputWriter.write(warResult);
      // todo ouptut result to console
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
// Initialize Dependency Injection Container
initializeTypeDiContainer();
new App().start();
