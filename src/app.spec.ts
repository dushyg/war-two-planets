import { App } from './app';
import { ERRORS } from './constants';
import { initializeTypeDiContainer } from './typediConfig';
import path from 'path';

describe('App', () => {
  const inputFilePath: string = path.join('src', 'testInputs');
  beforeEach(() => {
    process.argv = ['node', 'jest'];
    initializeTypeDiContainer();
  });
  it('should return correct output when like for like rule is enough - FALICORNIA_ATTACK 2H 4E 0AT 6SG', () => {
    process.argv.push(path.join(inputFilePath, 'warInput1.txt'));
    // redefining concole.log to not spam the console with logs during test
    const cLog = console.log;
    console.log = () => {
      return undefined;
    };
    const consoleSpy = jest.spyOn(console, 'log');
    const app = new App();
    app.start();
    expect(consoleSpy).toHaveBeenCalledWith('WINS 1H 2E 0AT 3SG');
    // restoring console.log
    console.log = cLog;
  });

  it('should return error when input file is empty', () => {
    process.argv.push(path.join(inputFilePath, 'errorEmptyFile.txt'));
    // redefining concole.error to not spam the console with errors during test
    const cError = console.error;
    console.error = () => {
      return undefined;
    };
    const consoleSpy = jest.spyOn(console, 'error');
    const app = new App();
    app.start();
    expect(consoleSpy.mock.calls[0][0].message).toContain(
      ERRORS.NO_OR_EMPTY_INPUT_STRING,
    );
    // restoring console.erorr
    console.error = cError;
  });
});
