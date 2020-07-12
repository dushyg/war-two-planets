import { WarResult } from '../models';

export interface WarResultStringFormatter {
  format(warResult: WarResult): string;
}
