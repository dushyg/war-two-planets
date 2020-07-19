import { WarResult } from '../models';
/**
 * Interface that needs to be implemented to obtain string representation of war result
 */
export interface WarResultStringFormatter {
  /**
   * Formats the war result instance to a string representation
   * @param warResult WarResult instance - Outcome of the war fought between defending and attacking forces
   * @returns string representation of war object
   */
  format(warResult: WarResult): string;
}
