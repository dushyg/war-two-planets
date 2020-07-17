import { InputGetter } from './inputGetter';
import { ERRORS } from '../constants';

export class ArgsInputGetter implements InputGetter {
  public getInput(): string {
    if (process.argv.length > 2) {
      return process.argv[2];
    }
    throw new Error(ERRORS.noInputFilePath);
  }
}
