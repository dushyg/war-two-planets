import Container from 'typedi';
import { WarResult } from '../models';
import { WarResultFormatterService } from '../typediConfig';
import { WarResultStringFormatter } from '../warResultFormatter/warResultStringFormatter';
import { OutputWriter } from './outputWriter';

export class ConsoleOutputWriter implements OutputWriter {
  private resultFormatter: WarResultStringFormatter;
  constructor() {
    this.resultFormatter = Container.get(WarResultFormatterService);
  }
  public write(warResult: WarResult): void {
    console.log(this.resultFormatter.format(warResult));
  }
}
