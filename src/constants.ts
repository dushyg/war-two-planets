export enum PLANET_NAMES {
  'FALICORNIA',
  'LENGABURU',
}

export enum FORCE_NAMES {
  'HORSE',
  'ELEPHANT',
  'ARMOURED TANKS',
  'SLING GUNS',
}

export enum FORCE_CODES {
  'H',
  'E',
  'AT',
  'SG',
}

export const ATTACK_INPUT_STRING_START_TOKEN = 'FALICORNIA_ATTACK';
export const ATTACK_INPUT_STRING_FORMAT = `${ATTACK_INPUT_STRING_START_TOKEN} 250H 50E 20AT 15SG`;

export const ERRORS = {
  noInputFilePath:
    'Input not passed as process argument. Usage: node geektrust.js ./inputFilePath',
  noOrEmptyInputString: 'No or empty input string passed',
  invalidInputString: `Input does not confirm to expected contract. Pass input like ${ATTACK_INPUT_STRING_FORMAT}`,
};

export const CONFIG = {
  combatantsTypeCount: 4,
};
