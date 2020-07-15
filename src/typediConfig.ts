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
import { WarResultStringFormatter } from './warResultFormatter/warResultStringFormatter';
import { OutputWriter } from './outputWriter/outputWriter';
import { SpaceDelimitedStringFormatter } from './warResultFormatter/spaceDelimitedStringFormatter';
import { ConsoleOutputWriter } from './outputWriter/ConsoleOutputWriter';
import { WarRuleTemplate } from './warRules/warRuleTemplate';
import { PowerRule } from './warRules/powerRule';
import { DEFENDER_TACKLING_POWER } from './constants';
import { LikeToLikeRule } from './warRules/likeToLikeRule';
import { SubstitutionRule } from './warRules/substitutionRule';

export const InputGetterService = new Token<InputGetter>();
export const StringInputParserService = new Token<StringInputParser>();
export const DefenderPredefinedArmyProviderService = new Token<ArmyProvider>();
export const InvaderArgsArmyProviderService = new Token<ArmyProvider>();
export const CombatantMatcherService = new Token<CombatantMatcher>();
export const SubstitutionManagerService = new Token<SubstitutionManager>();
export const WarResultFormatterService = new Token<WarResultStringFormatter>();
export const OutputWriterService = new Token<OutputWriter>();
export const WarRuleTemplateService = new Token<WarRuleTemplate>();

export function initializeTypeDiContainer() {
  Container.set(WarResultFormatterService, new SpaceDelimitedStringFormatter());
  Container.set(OutputWriterService, new ConsoleOutputWriter());
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
  setupWarRuleChain();
}

function setupWarRuleChain() {
  Container.set(
    WarRuleTemplateService,
    new PowerRule(
      DEFENDER_TACKLING_POWER,
      (battles) => true,
      new LikeToLikeRule(
        (battles) => true,
        new SubstitutionRule((battles) => true, null)
      )
    )
  );
}
