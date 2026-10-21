export enum UserType {
    SPECTATOR = 0,
    USER = 1,
    ASSISTANT_MOD = 2,
    MODERATOR = 4,
    VETERAN_MOD = 8,
    DEVELOPER = 64
}

export type PlayerLevelInfo = {
    level: number;
    current_xp: number;
    next_level_xp: number;
};

export type ProfileBasicInfo = {
    user_id: number;
    name: string;
    user_type: UserType;
    icon_id: number;
    player_level: PlayerLevelInfo;
    last_seen_time: string;
};

export enum BanReason {
    UNKNOWN = 0,
    FRAUD_ATTEMPT = 1,
    HACKING = 2,
    GRIEFING = 3,
    VERBAL_ABUSE = 4,
    IDLE = 5,
    SPAM = 6,
    REPORT_ABUSE = 7,
    ACCOUNT_TRADING = 8,
    GLITCHING = 9,
    GHOSTING = 10,
    PARTY_WITH_HACKER = 11,
    UNDER_INVESTIGATION = 12,
    MARKETPLACE_ABUSE = 13
}

export enum BanType {
    PERMANENT = 0,
    TEMPORARY = 1
}

export type ProfileBanInfo = {
    type: BanType;
    reason: BanReason;
    days_left: number;
};

export type ProfileSeasonalStats = {
    season: number;
    ranked: {
        k: number;
        d: number;
        a: number;
        w: number;
        l: number;
    };
    casual: {
        k: number;
        d: number;
        a: number;
        w: number;
        l: number;
    };
    custom: {
        k: number;
        d: number;
        a: number;
        w: number;
        l: number;
    };
};

export type ProfileRankedInfo = {
    placement_matches_left: number;
    wins: number;
    losses: number;
    highest_rank: number;
    mmr: number;
    global_position: number;
    rank: number;
}

export type ProfileLeaderboardData = {
    position: number;
    score: number;
};

export type ProfileStats = {
    seasonal_stats: ProfileSeasonalStats[];
    ranked: ProfileRankedInfo;
    leaderboard_data: ProfileLeaderboardData;
};

export type ClanBasicInfo = {
    id: number;
    name: string;
    tag: string;
    emblem_id: number;
}

export enum ClanMemberRank {
    MEMBER = 10,
    OFFICER = 20,
    CO_LEADER = 30,
    LEADER = 40
}

export type ProfileClanInfo = {
    basic_info: ClanBasicInfo;
    member_rank: ClanMemberRank;
    joined: string;
}

export enum PartyInvitePermission {
    ANYBODY = 0,
    FRIENDS_AND_CLAN_MEMBERS = 1,
    NOBODY = 2
}

export type ProfileResponse = {
    basic_info: ProfileBasicInfo;
    account_age: string;
    blocked_friend_requests: boolean;
    blocked_clan_requests: boolean;
    party_invite_permissions: PartyInvitePermission;
    ban: ProfileBanInfo | null;
    stats: ProfileStats;
    clan: ProfileClanInfo;
}

export type ServerInfo = {
    name: string;
    status: 'online' | 'offline';
}

export type ServersStatusResponse = {
    [id: string]: ServerInfo
}

export enum GameType {
    RANKED = 1,
    CASUAL = 2
}

export type WeaponStat = {
    weapon_id: number;
    name: string;
    k: number;
    a: number;
    h: number;
}

export type WeaponStatsResponse = {
    weapons: WeaponStat[];
}

export enum GameModeIds {
    Defuse = 15773,
    Elimination = 15775,
    Gungame = 15776,
    TeamDeathmatch = 15777,
    Manhunt = 15846,
    TournamentMode = 15847,
    Rush = 15860,
    Defend = 15861,
    ManhuntZ = 18596,
    Wingman = 18850
}

export enum MapIds {
    Canals = 613,
    Plaza = 615,
    Legacy = 617,
    Grounded = 618,
    Bureau = 619,
    Brewery = 839,
    Division = 841,
    Uplink = 1311,
    Yard = 1312,
    Raid = 1360,
    Heat = 4483,
    Warehouse = 6655,
    Gallery = 6670,
    Port = 6677,
    Park = 7201,
    Purify = 7316,
    Cargo = 7554,
    Arctic = 7584,
    Bout = 8024,
    Soar = 8427,
    Shanty = 8872,
    Hangar = 9310,
    Village = 13410,
    Impasse = 14066,
    Overhaul = 15028,
    Castello = 15391,
}

export enum PlayerMatchResult {
    WIN = 1,
    LOSS = 2,
    DRAW = 3
}

export type PlayerMatch = {
    id: string;
    game_type: GameType;
    game_mode_id: GameModeIds;
    map_id: MapIds;
    team: number;
    result: PlayerMatchResult;
    left_match: boolean;
    scores: number[];
};

export type PlayerMatchesResponse = {
    matches: PlayerMatch[];
}

export enum PlayerInputDeviceFlags {
    MOUSE_AND_KEYBOARD = 1,
    TOUCH_SCREEN = 2,
    GAMEPAD = 4
}

export type WinCondition =
    'TeamEliminated' |
    'TeamKills' |
    'TeamMostKills' |
    'TimeUp' |
    'Surrendered';

export type LeaveReason =
    'Left' |
    'Timeout' |
    'Kicked' |
    'Banned' |
    'PingLimit' |
    'AFK';


export type MatchesFetchResponse = {
    matches: {
        id: string;
        game_type: GameType;
        game_mode_id: GameModeIds;
        server_id: number;
        map_id: MapIds;
        team_factions: number[];
        winning_team: number;
        win_condition: WinCondition;
        scores: number[];
        started_at: number;
        ended_at: number;
        players: {
            user_id: number;
            team: number;
            kills: number;
            deaths: number;
            assists: number;
            damage_dealt: number;
            input_device_flags: PlayerInputDeviceFlags;
            left_match: boolean;
            leave_reason: LeaveReason | null;
            level: number;
            match_presence: number;
            party_info: {
                is_leader: boolean;
                players: number[];
            } | null;
        }[];
        replay_id: string | null;
    }[];
}

export type LeaderboardsResponse = {
    entries: {
        position: number;
        score: number;
        basic_info: ProfileBasicInfo;
        ranked: ProfileRankedInfo;
        clan?: ClanBasicInfo;
    }[];
    leaderboard_size: number;
}

export type AutohostCreateRequest = {
    server_id: number;
    room_name: string;
    password?: string;
    map_id: MapIds;
    game_mode_id: GameModeIds;
}

export type MatchPlayer = {
    user_id: number;
    team: number;
    kills: number;
    deaths: number;
    assists: number;
    damage_dealt: number;
    input_device_flags: PlayerInputDeviceFlags;
    left_match: boolean;
    leave_reason: LeaveReason | null;
    ping: number;
    user_type: UserType;
    is_owner: boolean;
};

export type MatchResult = {
    match_id: string | null;
    map_id: MapIds;
    team_factions: number[];
    winning_team: number;
    win_condition: WinCondition;
    scores: number[];
    started_at: number;
    ended_at: number;
    map_variation: number;
    rounds_played: number;
    players: MatchPlayer[];
};

export type AutohostData = {
    id: number;
    status: string;
    created_at: number;
    updated_at: number;
    ended_at: number;
    pending_expires_at: number | null;
    server_id: number;
    room: {
        id: number;
        code: string | null;
        name: string;
        map_id: MapIds;
        game_mode_id: GameModeIds;
        has_password: boolean;
    };
    player_count: number;
    match_started_at: number | null;
    match_state: string | null;
    round: number;
    scores: number[];
    players: MatchPlayer[];
    results: MatchResult[];
    replay_id: string | null;
    rejection_reason: string | null;
};

export type AutohostPollResponse = {
    autohosts: AutohostData[];
}

export type AutohostCreateResponse = {
    autohost: AutohostData;
}

export enum Commands {
    KICK = 'kick',
    ROOM_OWNER_ADD = 'room_owner_add',
    ROOM_OWNER_REMOVE = 'room_owner_remove',
    CLOSE = 'close',
    RESTART = 'restart'
}

export type AutohostControlRequest = {
    id: number;
    command: Commands;
    user_id?: number | null;
}

export type AutohostControlResponse = {
    autohost: AutohostData;
}

export type LeaderboardType = 
    'mmr' |
    'kills' |
    'deaths' |
    'assists' |
    'matches' |
    'wins' |
    'losses' |
    'xp' |
    'mvp';