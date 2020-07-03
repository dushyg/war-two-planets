import { Battle, Task } from '../models';

export interface State {
  /**
   * A Map of all the battles that are going on between various forces
   */
  battles: Map<string, Battle>;
  //   /**
  //    * The next task that is to be executed once current task is finished.
  //    */
  //   nextTask: Task;
  victor: string;
  error: string;
}
