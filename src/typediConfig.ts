import 'reflect-metadata';
import { Container, Token } from 'typedi';
import { ArmyProvider } from './armyProvider/armyProvider';
import { CombatantMatcher } from './combatantMatcher/combatantMatcher';
import { InputGetter } from './inputGetter/inputGetter';
import { StringInputParser } from './inputParser/stringInputParser';
import { SubstitutionManager } from './substitutionManager/substitutionManager';
import { ArgsInputGetter } from './inputGetter/argsInputGetter';
import { SpaceDelimitedInputParser } from './inputParser/spaceDelimitedInputParser';
import { DefenderPredefinedArmyProvider } from './armyProvider/defenderPredefinedArmyProvider';
import { InvaderArgsArmyProvider } from './armyProvider/invaderArgsArmyProvider';
import { NameBasedCombatantMatcher } from './combatantMatcher/nameBasedCombatantMatcher';
import { AdjacentTroopSubstitutionManager } from './substitutionManager/adjacentTroopSubstitutionManager';
import { BattleCreator } from './battleCreator';

export const InputGetterService = new Token<InputGetter>();
export const StringInputParserService = new Token<StringInputParser>();
export const DefenderPredefinedArmyProviderService = new Token<ArmyProvider>();
export const InvaderArgsArmyProviderService = new Token<ArmyProvider>();
export const CombatantMatcherService = new Token<CombatantMatcher>();
export const SubstitutionManagerService = new Token<SubstitutionManager>();

export function initializeTypeDiContainer() {
  Container.set(InputGetterService, new ArgsInputGetter());
  Container.set(StringInputParserService, new SpaceDelimitedInputParser());
  Container.set(
    DefenderPredefinedArmyProviderService,
    new DefenderPredefinedArmyProvider()
  );
  Container.set(InvaderArgsArmyProviderService, new InvaderArgsArmyProvider());
  Container.set(CombatantMatcherService, new NameBasedCombatantMatcher());
  Container.set(BattleCreator, new BattleCreator());
  Container.set(
    SubstitutionManagerService,
    new AdjacentTroopSubstitutionManager()
  );
}