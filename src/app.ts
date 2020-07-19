import { Container } from 'typedi';
import { ArmyProvider } from './armyProvider/armyProvider';
import { WarResult } from './models';
import {
  DefenderPredefinedArmyProviderService,
  InvaderArgsArmyProviderService,
  OutputWriterService,
} from './typediConfig';
import { War } from './war';
import { OutputWriter } from './outputWriter/outputWriter';

/**
 * Application instance that encapsulates a war between Lengaburu and Falicornia
 */
export class App {
  /**
   * An object that provides the army for forces of Lengaburu
   */
  private defenderArmyProvider: ArmyProvider;
  /**
   * An object that provides the army for forces of Falicornia
   */
  private invaderArmyProvider: ArmyProvider;
  /**
   * An object that is used to write the output of the war
   */
  private outputWriter: OutputWriter;
  constructor() {
    this.defenderArmyProvider = Container.get(
      DefenderPredefinedArmyProviderService,
    );
    this.invaderArmyProvider = Container.get(InvaderArgsArmyProviderService);
    this.outputWriter = Container.get(OutputWriterService);
  }
  /**
   * Kicks off the war
   */
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
