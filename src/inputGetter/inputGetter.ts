/**
 * Interface to be implemented for reading string input required by the application to execute
 */
export interface InputGetter {
  getInput(): string;
}
