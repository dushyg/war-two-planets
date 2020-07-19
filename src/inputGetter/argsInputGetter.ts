import { InputGetter } from './inputGetter';
import { ERRORS } from '../constants';
/**
 * An implementation of InputGetter Interface that reads command line arguments passed to the application and returns the input file name
 */
export class ArgsInputGetter implements InputGetter {
  /**
   * Reads process.argv and returns the 3rd argument passed.
   * Throws an error if the file path is not passed as an argument in process.argv.
   */
  public getInput(): string {
    if (process.argv.length > 2) {
      return process.argv[2];
    }
    throw new Error(ERRORS.NO_INPUT_FILE_PATH);
  }
}
