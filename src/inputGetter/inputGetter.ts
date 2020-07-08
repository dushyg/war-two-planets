import { Token } from 'typedi';

export interface InputGetter {
  getInput(): string;
}

// export const InputGetterService = new Token<InputGetter>();
