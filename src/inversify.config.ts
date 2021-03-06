import 'reflect-metadata';
import { Container, decorate, injectable } from 'inversify';
import getDecorators from 'inversify-inject-decorators';


let container = new Container();
const { lazyInject , lazyMultiInject } = getDecorators(container);
export { lazyInject, lazyMultiInject };

import { TYPES } from './types';
import { readFileSync } from 'fs';
import Bot, { Config } from './structures/Bot';
import { Client } from 'eris';
import { safeLoad } from 'js-yaml';
import CommandService from './structures/services/CommandService';
import CommandManager from './structures/managers/CommandManager';
import AutomodService from './structures/services/AutomodService';
import DatabaseManager from './structures/managers/DatabaseManager';
import EventManager from './structures/managers/EventManager';
import PunishmentService from './structures/services/PunishmentService';
import TimeoutsManager from './structures/managers/TimeoutsManager';
import GuildSettingsService from './structures/services/settings/GuildSettingsService';
import BotListService from './structures/services/BotListService';
import StatusManager from './structures/managers/StatusManager';
import CommandStatisticsManager from './structures/managers/CommandStatisticsManager';
import NinoCommand from './structures/Command';
import HelpCommand from './commands/generic/Help';
import InviteCommand from './commands/generic/Invite';
import LocaleCommand from './commands/generic/Locale';
import PingCommand from './commands/generic/Ping';
import SettingsCommand from './commands/generic/Settings';
import ShardInfoCommand from './commands/generic/ShardInfo';
import StatisticsCommand from './commands/generic/Statistics';
import UptimeCommand from './commands/generic/Uptime';
import TimeCommand from './commands/generic/Time';
import BanCommand from './commands/moderation/Ban';
import KickCommand from './commands/moderation/Kick';
import LockdownCommand from './commands/moderation/Lockdown';
import MuteCommand from './commands/moderation/Mute';
import PardonCommand from './commands/moderation/Pardon';
import PruneCommand from './commands/moderation/Prune';
import ReasonCommand from './commands/moderation/Reason';
import UnbanCommand from './commands/moderation/Unban';
import UnmuteCommand from './commands/moderation/Unmute';
import WarnCommand from './commands/moderation/Warn';
import WarningsCommand from './commands/moderation/Warnings';
import EvalCommand from './commands/system/Eval';
import ShellCommand from './commands/system/Shell';
import ProfilerCommand from './commands/system/Profiler';
import NinoEvent from './structures/Event';
import GuildBanAddEvent from './events/GuildBanAdd';
import GuildBanRemoveEvent from './events/GuildBanRemove';
import GuildJoinedEvent from './events/GuildCreate';
import GuildLeftEvent from './events/GuildDelete';
import GuildMemberJoinedEvent from './events/GuildMemberAdd';
import GuildMemberUpdateEvent from './events/GuildMemberUpdate';
import GuildMemberLeftEvent from './events/GuildMemberLeave';
import MessageReceivedEvent from './events/Message';
import MessageUpdatedEvent from './events/MessageUpdate';
import MessageDeletedEvent from './events/MessageDelete';
import ReadyEvent from './events/Ready';
import ShardDisconnectedEvent from './events/ShardDisconnected';
import ShardReadyEvent from './events/ShardReady';
import ShardResumedEvent from './events/ShardResume';
import UserUpdateEvent from './events/UserUpdate';
import DebugEvent from './events/Debug';
import UserSettingsService from './structures/services/settings/UserSettingsService';
import LocalizationManager from './structures/managers/LocalizationManager';
import { Collection } from '@augu/immutable';
import CaseSettingsService from './structures/services/settings/CaseSettingsService';
import WarningService from './structures/services/WarningService';

let config: Config;
try {
  config = safeLoad(readFileSync('application.yml', 'utf8'));
} catch (e) {
  config = {
    status: undefined,
    statusType: undefined,
    environment: 'development',
    databaseUrl: 'mongodb://localhost:27017/nino',
    prometheus: 5595,
    disabledCommands: undefined,
    disabledCategories: undefined,
    owners: undefined,
    discord: {
      token: '',
      prefix: 'x!',
    },
    redis: {
      host: 'localhost',
      port: 6379,
      db: undefined,
    },
    sentryDSN: undefined,
    botlists: undefined,
    webhook: undefined,
    ksoft: undefined,
    dbAuth: undefined
  };
}

decorate(injectable(), Collection);

container.bind<Client>(TYPES.Client).toConstantValue(
  new Client(config.discord.token, {
    maxShards: 'auto',
    getAllUsers: true,
    restMode: true,
    intents: [
      'guildBans',
      'guildMembers',
      'guildMessages',
      'guilds'
    ]
  })
);

container
  .bind<Bot>(TYPES.Bot)
  .to(Bot)
  .inSingletonScope();

container.bind<Config>(TYPES.Config).toConstantValue(config);

container
  .bind<CommandService>(TYPES.CommandService)
  .to(CommandService)
  .inSingletonScope();

container
  .bind<CommandManager>(TYPES.CommandManager)
  .to(CommandManager)
  .inSingletonScope();

container
  .bind<DatabaseManager>(TYPES.DatabaseManager)
  .to(DatabaseManager)
  .inSingletonScope();

container
  .bind<EventManager>(TYPES.EventManager)
  .to(EventManager)
  .inSingletonScope();

container
  .bind<PunishmentService>(TYPES.PunishmentService)
  .to(PunishmentService)
  .inSingletonScope();

container
  .bind<TimeoutsManager>(TYPES.TimeoutsManager)
  .to(TimeoutsManager)
  .inSingletonScope();

container
  .bind<CommandStatisticsManager>(TYPES.CommandStatisticsManager)
  .to(CommandStatisticsManager)
  .inSingletonScope();

container
  .bind<AutomodService>(TYPES.AutoModService)
  .to(AutomodService)
  .inSingletonScope();

container
  .bind<GuildSettingsService>(TYPES.GuildSettingsService)
  .to(GuildSettingsService)
  .inSingletonScope();

container
  .bind<CaseSettingsService>(TYPES.CaseSettingsService)
  .to(CaseSettingsService)
  .inSingletonScope();

container
  .bind<WarningService>(TYPES.WarningService)
  .to(WarningService)
  .inSingletonScope();

container
  .bind<UserSettingsService>(TYPES.UserSettingsService)
  .to(UserSettingsService)
  .inSingletonScope();

container
  .bind<BotListService>(TYPES.BotListService)
  .to(BotListService)
  .inSingletonScope();

container
  .bind<StatusManager>(TYPES.StatusManager)
  .to(StatusManager)
  .inSingletonScope();

container
  .bind<LocalizationManager>(TYPES.LocalizationManager)
  .to(LocalizationManager)
  .inSingletonScope();

// Generic Commands
container
  .bind<NinoCommand>(TYPES.Command)
  .to(HelpCommand)
  .inSingletonScope();
  
container
  .bind<NinoCommand>(TYPES.Command)
  .to(InviteCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(LocaleCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(PingCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(SettingsCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(ShardInfoCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(StatisticsCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(UptimeCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(TimeCommand)
  .inSingletonScope();

// Moderation Commands
container
  .bind<NinoCommand>(TYPES.Command)
  .to(BanCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(KickCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(LockdownCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(MuteCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(PardonCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(PruneCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(ReasonCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(UnbanCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(UnmuteCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(WarnCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(WarningsCommand)
  .inSingletonScope();

// Other Commands
container
  .bind<NinoCommand>(TYPES.Command)
  .to(EvalCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(ShellCommand)
  .inSingletonScope();

container
  .bind<NinoCommand>(TYPES.Command)
  .to(ProfilerCommand)
  .inSingletonScope();

// Events
container
  .bind<NinoEvent>(TYPES.Event)
  .to(GuildBanAddEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(GuildBanRemoveEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(GuildJoinedEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(GuildLeftEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(GuildMemberJoinedEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(GuildMemberUpdateEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(GuildMemberLeftEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(MessageReceivedEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(MessageDeletedEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(MessageUpdatedEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(ReadyEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(ShardDisconnectedEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(ShardReadyEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(ShardResumedEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(UserUpdateEvent)
  .inSingletonScope();

container
  .bind<NinoEvent>(TYPES.Event)
  .to(DebugEvent)
  .inSingletonScope();

export default container;
