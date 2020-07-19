import { WarResult } from '../models';

/**
 * Interface that needs to be implemented to write application output
 */
export interface OutputWriter {
  /**
   * Writes a representation of passed WarResult object
   * @param warResult WarResult instance
   */
  write(warResult: WarResult): void;
}
