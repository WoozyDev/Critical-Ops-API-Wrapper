from enum import Enum
from typing import Literal

class UserType(Enum):
    SPECTATOR = 0
    USER = 1
    ASSISTANT_MOD = 2
    MODERATOR = 4
    VETERAN_MOD = 8
    DEVELOPER = 64

class PlayerLevelInfo:
    level: int
    current_xp: int
    next_level_xp: int


class ProfileBasicInfo:
    user_id: int
    name: str
    user_type: UserType
    icon_id: int;
    player_level: PlayerLevelInfo
    last_seen_time: str


class BanReason(Enum):
    UNKNOWN = 0
    FRAUD_ATTEMPT = 1
    HACKING = 2
    GRIEFING = 3
    VERBAL_ABUSE = 4
    IDLE = 5
    SPAM = 6
    REPORT_ABUSE = 7
    ACCOUNT_TRADING = 8
    GLITCHING = 9
    GHOSTING = 10
    PARTY_WITH_HACKER = 11
    UNDER_INVESTIGATION = 12
    MARKETPLACE_ABUSE = 13

class BanType(Enum):
    PERMANENT = 0
    TEMPORARY = 1

class ProfileBanInfo:
    type: BanType
    reason: BanReason
    days_left: int

class SeasonalStat:
    k: int
    d: int
    a: int
    w: int
    l: int

class ProfileSeasonalStats:
    season: int
    ranked: SeasonalStat
    casual: SeasonalStat
    custom: SeasonalStat
    
class ProfileRankedInfo:
    placement_matches_left: int
    wins: int
    losses: int
    highest_rank: int
    mmr: int
    global_position: int
    rank: int

class ProfileLeaderboardData:
    position: int
    score: int

class ProfileStats:
    seasonal_stats: list[ProfileSeasonalStats]
    ranked: ProfileRankedInfo
    leaderboard_data: ProfileLeaderboardData


class ClanBasicInfo:
    id: int
    name: str
    tag: str
    emblem_id: int

class ClanMemberRank:
    MEMBER = 10
    OFFICER = 20
    CO_LEADER = 30
    LEADER = 40

class ProfileClanInfo:
    basic_info: ClanBasicInfo
    member_rank: ClanMemberRank
    joined: str

class PartyInvitePermission:
    ANYBODY = 0
    FRIENDS_AND_CLAN_MEMBERS = 1
    NOBODY = 2

class ProfileResponse:
    basic_info: ProfileBasicInfo
    account_age: str
    blocked_friend_requests: bool
    blocked_clan_requests: bool
    party_invite_permissions: PartyInvitePermission
    ban: ProfileBanInfo | None
    stats: ProfileStats
    clan: ProfileClanInfo

class ServerInfo:
    name: str
    status: Literal["online"] | Literal["offline"]

type ServersStatusResponse = dict[str, ServerInfo]

class GameType(Enum):
    RANKED = 1
    CASUAL = 2

class WeaponStat:
    weapon_id: int
    name: str
    k: int
    a: int
    h: int

class WeaponStatsResponse:
    weapons: list[WeaponStat]

class GameModeIds(Enum):
    Defuse = 15773
    Elimination = 15775
    Gungame = 15776
    TeamDeathmatch = 15777
    Manhunt = 15846
    TournamentMode = 15847
    Rush = 15860
    Defend = 15861
    ManhuntZ = 18596
    Wingman = 18850


class MapIds(Enum):
    Canals = 613
    Plaza = 615
    Legacy = 617
    Grounded = 618
    Bureau = 619
    Brewery = 839
    Division = 841
    Uplink = 1311
    Yard = 1312
    Raid = 1360
    Heat = 4483
    Warehouse = 6655
    Gallery = 6670
    Port = 6677
    Park = 7201
    Purify = 7316
    Cargo = 7554
    Arctic = 7584
    Bout = 8024
    Soar = 8427
    Shanty = 8872
    Hangar = 9310
    Village = 13410
    Impasse = 14066
    Overhaul = 15028
    Castello = 15391

class PlayerMatchResult(Enum):
    WIN = 1
    LOSS = 2
    DRAW = 3

class PlayerMatch:
    id: str
    game_type: GameType
    game_mode_id: GameModeIds
    map_id: MapIds
    team: int
    result: PlayerMatchResult
    left_match: bool
    scores: list[int]


class PlayerMatchesResponse:
    matches: list[PlayerMatch]

class PlayerInputDeviceFlags(Enum):
    MOUSE_AND_KEYBOARD = 1
    TOUCH_SCREEN = 2
    GAMEPAD = 4

type WinCondition = Literal['TeamEliminated'] | Literal['TeamKills'] | Literal['TeamMostKills'] | Literal['TimeUp'] | Literal['Surrendered']

type LeaveReason = Literal['Left'] | Literal['Timeout'] | Literal['Kicked'] | Literal['Banned'] | Literal['PingLimit'] | Literal['AFK']

class PartyInfo:
    is_leader: bool
    players: list[int]

class MatchesFetchResponse:
    class MatchInfo:
        class Player:
            user_id: int
            team: int
            kills: int
            deaths: int
            assists: int
            damage_dealt: int
            input_device_flags: PlayerInputDeviceFlags
            left_match: bool
            leave_reason: LeaveReason | None
            level: int
            match_presence: int
            party_info: PartyInfo | None
        id: str
        game_type: GameType;
        game_mode_id: GameModeIds
        server_id: int;
        map_id: MapIds;
        team_factions: list[int]
        winning_team: int
        win_condition: WinCondition
        scores: list[int]
        started_at: int
        ended_at: int
        players: list[Player]
        replay_id: str | None
    matches: list[MatchInfo]

class LeaderboardEntry:
    position: int
    score: int
    basic_info: ProfileBasicInfo
    ranked: ProfileRankedInfo
    clan: ClanBasicInfo | None

class LeaderboardsResponse:
    entries: list[LeaderboardEntry]
    leaderboard_size: int

class AutohostCreateRequest:
    server_id: int
    room_name: str
    password: str | None
    map_id: MapIds
    game_mode_id: GameModeIds

class MatchPlayer:
    user_id: int
    team: int
    kills: int
    deaths: int
    assists: int
    damage_dealt: int
    input_device_flags: PlayerInputDeviceFlags
    left_match: bool
    leave_reason: LeaveReason | None
    ping: int
    user_type: UserType
    is_owner: bool


class MatchResult:
    match_id: str | None
    map_id: MapIds;
    team_factions: list[int]
    winning_team: int
    win_condition: WinCondition
    scores: list[int]
    started_at: int
    ended_at: int
    map_variation: int
    rounds_played: int
    players: list[MatchPlayer]

class AutohostData:
    class Room:
        id: int
        code: str | None
        name: str
        map_id: MapIds
        game_mode_id: GameModeIds
        has_password: bool
    id: int
    status: str
    created_at: int
    updated_at: int
    ended_at: int
    pending_expires_at: int | None
    server_id: int
    room: Room
    player_count: int
    match_started_at: int | None
    match_state: str | None
    round: int
    scores: list[int]
    players: list[MatchPlayer]
    results: list[MatchResult]
    replay_id: str | None
    rejection_reason: str | None

class AutohostPollResponse:
    autohosts: list[AutohostData]

class AutohostCreateResponse:
    autohost: AutohostData

class Commands(Enum):
    KICK = 'kick'
    ROOM_OWNER_ADD = 'room_owner_add'
    ROOM_OWNER_REMOVE = 'room_owner_remove'
    CLOSE = 'close'
    RESTART = 'restart'

class AutohostControlRequest:
    id: int
    command: Commands
    user_id: int | None

class AutohostControlResponse:
    autohost: AutohostData;

type LeaderboardType = Literal['mmr'] | Literal['kills'] | Literal['deaths'] | Literal['assists'] | Literal['matches'] | Literal['wins'] | Literal['losses'] | Literal['xp'] | Literal['mvp'];