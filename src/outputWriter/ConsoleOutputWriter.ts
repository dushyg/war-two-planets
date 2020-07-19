import Container from 'typedi';
import { WarResult } from '../models';
import { WarResultFormatterService } from '../typediConfig';
import { WarResultStringFormatter } from '../warResultFormatter/warResultStringFormatter';
import { OutputWriter } from './outputWriter';
/**
 * An implementation of OutputWriter interface that allows the application to write its output to Console after formatting it.
 */
export class ConsoleOutputWriter implements OutputWriter {
  private resultFormatter: WarResultStringFormatter;
  constructor() {
    this.resultFormatter = Container.get(WarResultFormatterService);
  }

  /**
   * Writes the string representation of passed WarResult object to Console
   * @param warResult WarResult instance
   */
  public write(warResult: WarResult): void {
    console.log(this.resultFormatter.format(warResult));
  }
}
