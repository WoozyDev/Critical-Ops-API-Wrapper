"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = exports.PlayerInputDeviceFlags = exports.PlayerMatchResult = exports.MapIds = exports.GameModeIds = exports.GameType = exports.PartyInvitePermission = exports.ClanMemberRank = exports.BanType = exports.BanReason = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType[UserType["SPECTATOR"] = 0] = "SPECTATOR";
    UserType[UserType["USER"] = 1] = "USER";
    UserType[UserType["ASSISTANT_MOD"] = 2] = "ASSISTANT_MOD";
    UserType[UserType["MODERATOR"] = 4] = "MODERATOR";
    UserType[UserType["VETERAN_MOD"] = 8] = "VETERAN_MOD";
    UserType[UserType["DEVELOPER"] = 64] = "DEVELOPER";
})(UserType || (exports.UserType = UserType = {}));
var BanReason;
(function (BanReason) {
    BanReason[BanReason["UNKNOWN"] = 0] = "UNKNOWN";
    BanReason[BanReason["FRAUD_ATTEMPT"] = 1] = "FRAUD_ATTEMPT";
    BanReason[BanReason["HACKING"] = 2] = "HACKING";
    BanReason[BanReason["GRIEFING"] = 3] = "GRIEFING";
    BanReason[BanReason["VERBAL_ABUSE"] = 4] = "VERBAL_ABUSE";
    BanReason[BanReason["IDLE"] = 5] = "IDLE";
    BanReason[BanReason["SPAM"] = 6] = "SPAM";
    BanReason[BanReason["REPORT_ABUSE"] = 7] = "REPORT_ABUSE";
    BanReason[BanReason["ACCOUNT_TRADING"] = 8] = "ACCOUNT_TRADING";
    BanReason[BanReason["GLITCHING"] = 9] = "GLITCHING";
    BanReason[BanReason["GHOSTING"] = 10] = "GHOSTING";
    BanReason[BanReason["PARTY_WITH_HACKER"] = 11] = "PARTY_WITH_HACKER";
    BanReason[BanReason["UNDER_INVESTIGATION"] = 12] = "UNDER_INVESTIGATION";
    BanReason[BanReason["MARKETPLACE_ABUSE"] = 13] = "MARKETPLACE_ABUSE";
})(BanReason || (exports.BanReason = BanReason = {}));
var BanType;
(function (BanType) {
    BanType[BanType["PERMANENT"] = 0] = "PERMANENT";
    BanType[BanType["TEMPORARY"] = 1] = "TEMPORARY";
})(BanType || (exports.BanType = BanType = {}));
var ClanMemberRank;
(function (ClanMemberRank) {
    ClanMemberRank[ClanMemberRank["MEMBER"] = 10] = "MEMBER";
    ClanMemberRank[ClanMemberRank["OFFICER"] = 20] = "OFFICER";
    ClanMemberRank[ClanMemberRank["CO_LEADER"] = 30] = "CO_LEADER";
    ClanMemberRank[ClanMemberRank["LEADER"] = 40] = "LEADER";
})(ClanMemberRank || (exports.ClanMemberRank = ClanMemberRank = {}));
var PartyInvitePermission;
(function (PartyInvitePermission) {
    PartyInvitePermission[PartyInvitePermission["ANYBODY"] = 0] = "ANYBODY";
    PartyInvitePermission[PartyInvitePermission["FRIENDS_AND_CLAN_MEMBERS"] = 1] = "FRIENDS_AND_CLAN_MEMBERS";
    PartyInvitePermission[PartyInvitePermission["NOBODY"] = 2] = "NOBODY";
})(PartyInvitePermission || (exports.PartyInvitePermission = PartyInvitePermission = {}));
var GameType;
(function (GameType) {
    GameType[GameType["RANKED"] = 1] = "RANKED";
    GameType[GameType["CASUAL"] = 2] = "CASUAL";
})(GameType || (exports.GameType = GameType = {}));
var GameModeIds;
(function (GameModeIds) {
    GameModeIds[GameModeIds["Defuse"] = 15773] = "Defuse";
    GameModeIds[GameModeIds["Elimination"] = 15775] = "Elimination";
    GameModeIds[GameModeIds["Gungame"] = 15776] = "Gungame";
    GameModeIds[GameModeIds["TeamDeathmatch"] = 15777] = "TeamDeathmatch";
    GameModeIds[GameModeIds["Manhunt"] = 15846] = "Manhunt";
    GameModeIds[GameModeIds["TournamentMode"] = 15847] = "TournamentMode";
    GameModeIds[GameModeIds["Rush"] = 15860] = "Rush";
    GameModeIds[GameModeIds["Defend"] = 15861] = "Defend";
    GameModeIds[GameModeIds["ManhuntZ"] = 18596] = "ManhuntZ";
    GameModeIds[GameModeIds["Wingman"] = 18850] = "Wingman";
})(GameModeIds || (exports.GameModeIds = GameModeIds = {}));
var MapIds;
(function (MapIds) {
    MapIds[MapIds["Canals"] = 613] = "Canals";
    MapIds[MapIds["Plaza"] = 615] = "Plaza";
    MapIds[MapIds["Legacy"] = 617] = "Legacy";
    MapIds[MapIds["Grounded"] = 618] = "Grounded";
    MapIds[MapIds["Bureau"] = 619] = "Bureau";
    MapIds[MapIds["Brewery"] = 839] = "Brewery";
    MapIds[MapIds["Division"] = 841] = "Division";
    MapIds[MapIds["Uplink"] = 1311] = "Uplink";
    MapIds[MapIds["Yard"] = 1312] = "Yard";
    MapIds[MapIds["Raid"] = 1360] = "Raid";
    MapIds[MapIds["Heat"] = 4483] = "Heat";
    MapIds[MapIds["Warehouse"] = 6655] = "Warehouse";
    MapIds[MapIds["Gallery"] = 6670] = "Gallery";
    MapIds[MapIds["Port"] = 6677] = "Port";
    MapIds[MapIds["Park"] = 7201] = "Park";
    MapIds[MapIds["Purify"] = 7316] = "Purify";
    MapIds[MapIds["Cargo"] = 7554] = "Cargo";
    MapIds[MapIds["Arctic"] = 7584] = "Arctic";
    MapIds[MapIds["Bout"] = 8024] = "Bout";
    MapIds[MapIds["Soar"] = 8427] = "Soar";
    MapIds[MapIds["Shanty"] = 8872] = "Shanty";
    MapIds[MapIds["Hangar"] = 9310] = "Hangar";
    MapIds[MapIds["Village"] = 13410] = "Village";
    MapIds[MapIds["Impasse"] = 14066] = "Impasse";
    MapIds[MapIds["Overhaul"] = 15028] = "Overhaul";
    MapIds[MapIds["Castello"] = 15391] = "Castello";
})(MapIds || (exports.MapIds = MapIds = {}));
var PlayerMatchResult;
(function (PlayerMatchResult) {
    PlayerMatchResult[PlayerMatchResult["WIN"] = 1] = "WIN";
    PlayerMatchResult[PlayerMatchResult["LOSS"] = 2] = "LOSS";
    PlayerMatchResult[PlayerMatchResult["DRAW"] = 3] = "DRAW";
})(PlayerMatchResult || (exports.PlayerMatchResult = PlayerMatchResult = {}));
var PlayerInputDeviceFlags;
(function (PlayerInputDeviceFlags) {
    PlayerInputDeviceFlags[PlayerInputDeviceFlags["MOUSE_AND_KEYBOARD"] = 1] = "MOUSE_AND_KEYBOARD";
    PlayerInputDeviceFlags[PlayerInputDeviceFlags["TOUCH_SCREEN"] = 2] = "TOUCH_SCREEN";
    PlayerInputDeviceFlags[PlayerInputDeviceFlags["GAMEPAD"] = 4] = "GAMEPAD";
})(PlayerInputDeviceFlags || (exports.PlayerInputDeviceFlags = PlayerInputDeviceFlags = {}));
var Commands;
(function (Commands) {
    Commands["KICK"] = "kick";
    Commands["ROOM_OWNER_ADD"] = "room_owner_add";
    Commands["ROOM_OWNER_REMOVE"] = "room_owner_remove";
    Commands["CLOSE"] = "close";
    Commands["RESTART"] = "restart";
})(Commands || (exports.Commands = Commands = {}));
