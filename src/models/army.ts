import { Strength } from './strength';
export interface Army {
  name: string;
  forces: Map<string, Strength>;
}
