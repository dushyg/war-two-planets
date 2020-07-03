import { Battle } from '../models';
import { State } from './index';

export class StateManager {
  private state: State = {
    battles: new Map<string, Battle>(),
    error: '',
    victor: '',
  };

  constructor() {}
}
