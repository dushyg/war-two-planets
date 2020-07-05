import { Battle, Army } from '../models';
import { State } from './index';

export class StateManager {
  private state: State = {
    battles: new Map<string, Battle>(),
    error: '',
    victor: '',
  };

  public getState(): State {
    return { ...this.state };
  }

  public getVictor(): string {
    return this.state.victor;
  }

  public getError(): string {
    return this.state.error;
  }

  public setError(error: string): void {
    this.setState({
      ...this.state,
      error,
    });
  }

  public setVictor(victor: string): void {
    this.setState({
      ...this.state,
      victor,
    });
  }

  public setBattles(battles: Map<string, Battle>): void {
    this.setState({
      ...this.state,
      battles: { ...battles },
    });
  }

  private setState(updatedState: State): void {
    this.state = updatedState;
  }
}
