import { Army, Battle } from './models';

export class SubstitutionManager {
  public obtainHelp(
    battles: Map<string, Battle>,
    invaderArmy: Army,
    homeArmy: Army
  ): Map<string, Battle> {
    return new Map<string, Battle>();
  }
}
