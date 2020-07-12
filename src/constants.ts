export const PLANET_NAMES = {
  FALICORNIA: 'FALICORNIA',
  LENGABURU: 'LENGABURU',
};

export enum FORCE_NAMES {
  'HORSE',
  'ELEPHANT',
  'ARMOURED TANKS',
  'SLING GUNS',
}

export const FORCE_CODES = {
  H: 'H',
  E: 'E',
  AT: 'AT',
  SG: 'SG',
  NONE: 'NONE',
};

export const SUBSTITUTION_POWER = {
  LEFT: 2,
  RIGHT: 0.5,
};

export const ATTACK_INPUT_STRING_START_TOKEN = 'FALICORNIA_ATTACK';
export const ATTACK_INPUT_STRING_FORMAT = `${ATTACK_INPUT_STRING_START_TOKEN} 250H 50E 20AT 15SG`;

export const ERRORS = {
  noInputFilePath:
    'Input not passed as process argument. Usage: node geektrust.js ./inputFilePath',
  INVALID_INPUT_FILE_PATH:
    'Input file path not found. Please provide a valid file path to read input from.',
  noOrEmptyInputString: `No or empty input string passed. Pass input like ${ATTACK_INPUT_STRING_FORMAT}`,
  invalidInputString: `Input does not confirm to expected contract. Pass input like ${ATTACK_INPUT_STRING_FORMAT}`,
};

export const CONFIG = {
  combatantsTypeCount: 4,
};

export const OUTCOMES = {
  WINS: 'WINS',
  LOSES: 'LOSES',
};
