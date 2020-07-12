import { WarResult } from '../models';

export interface OutputWriter {
  write(warResult: WarResult): void;
}
