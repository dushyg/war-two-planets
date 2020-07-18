import { ArgsInputGetter } from './argsInputGetter';
import { ERRORS } from '../constants';

describe('ArgsInputGetter', () => {
  beforeEach(() => {
    process.argv = ['node', 'jest'];
  });
  it('should be able to read argument from process when passed', () => {
    process.argv.push('FALICORNIA_ATTACK 250H 50E 20AT 15SG');
    const inputGetter = new ArgsInputGetter();
    const argument: string = inputGetter.getInput();
    expect(argument).toEqual('FALICORNIA_ATTACK 250H 50E 20AT 15SG');
  });

  it('should throw an error when no argument is passed', () => {
    const inputGetter = new ArgsInputGetter();
    expect(inputGetter.getInput).toThrowError(ERRORS.NO_INPUT_FILE_PATH);
  });
});
