const UserType = {
    "SPECTATOR": 0,
    "USER": 1,
    "ASSISTANT_MOD": 2,
    "MODERATOR": 4,
    "VETERAN_MOD": 8,
    "DEVELOPER": 64
};

/**
 * @typedef {Object} PlayerLevelInfo
 * @property {number} level
 * @property {number} current_xp
 * @property {number} next_level_xp
 */

/**
 * @typedef {Object} ProfileBasicInfo
 * @property {number} user_id
 * @property {string} name
 * @property {UserType} user_type
 * @property {number} icon_id
 * @property {PlayerLevelInfo} player_level
 * @property {string} last_seen_time
 */

const BanReason = {
    "UNKNOWN": 0,
    "FRAUD_ATTEMPT": 1,
    "HACKING": 2,
    "GRIEFING": 3,
    "VERBAL_ABUSE": 4,
    "IDLE": 5,
    "SPAM": 6,
    "REPORT_ABUSE": 7,
    "ACCOUNT_TRADING": 8,
    "GLITCHING": 9,
    "GHOSTING": 10,
    "PARTY_WITH_HACKER": 11,
    "UNDER_INVESTIGATION": 12,
    "MARKETPLACE_ABUSE": 13
};

const BanType = {
    "PERMANENT": 0,
    "TEMPORARY": 1
};

/**
 * @typedef {Object} ProfileBanInfo
 * @property {BanType} type
 * @property {BanReason} reason
 * @property {number} days_left
 */


/**
 * @typedef {Object} SeasonalStat
 * @property {number} k
 * @property {number} d
 * @property {number} a
 * @property {number} w
 * @property {number} l
 */

/**
 * @typedef {Object} ProfileSeasonalStats
 * @property {number} season
 * @property {SeasonalStat} ranked
 * @property {SeasonalStat} custom
 * @property {SeasonalStat} casual
 */

/**
 * @typedef {Object} ProfileRankedInfo
 * @property {number} placement_matches_left
 * @property {number} wins
 * @property {number} losses
 * @property {number} highest_rank
 * @property {number} mmr
 * @property {number} global_position
 * @property {number} rank
 */

/**
 * @typedef {Object} ProfileLeaderboardData
 * @property {number} position
 * @property {number} score
 */

/**
 * @typedef {Object} ProfileStats
 * @property {ProfileSeasonalStats[]} seasonal_stats
 * @property {ProfileRankedInfo} ranked
 * @property {ProfileLeaderboardData} leaderboard_data
 */

/**
 * @typedef {Object} ClanBasicInfo
 * @property {number} id
 * @property {string} name
 * @property {string} tag
 * @property {number} emblem_id
 */

const ClanMemberRank = {
    "MEMBER": 10,
    "OFFICER": 20,
    "CO_LEADER": 30,
    "LEADER": 40
}

/**
 * @typedef {Object} ProfileClanInfo
 * @property {ClanBasicInfo} basic_info
 * @property {ClanMemberRank} member_rank
 * @property {string} joined
 */


const PartyInvitePermission = {
    "ANYBODY": 0,
    "FRIENDS_AND_CLAN_MEMBERS": 1,
    "NOBODY": 2
}

/**
 * @typedef {Object} ProfileResponse
 * @property {ProfileBasicInfo} basic_info
 * @property {string} account_age
 * @property {boolean} blocked_friend_requests
 * @property {boolean} blocked_clan_requests
 * @property {PartyInvitePermission} party_invite_permissions
 * @property {ProfileBanInfo | null} ban
 * @property {ProfileStats} stats
 * @property {ProfileClanInfo} clan
 */

/**
 * @typedef {Object} ServerInfo
 * @property {string} name
 * @property {'online' | 'offline'} status
 */

/**
 * @typedef {Record<string, ServerInfo>} ServersStatusResponse
 */

const GameType = {
    "RANKED": 1,
    "CASUAL": 2
}

/**
 * @typedef {Object} WeaponStat
 * @property {number} weapon_id
 * @property {string} name
 * @property {number} k
 * @property {number} a
 * @property {number} h
 */

/**
 * @typedef {Object} WeaponStatsResponse
 * @property {WeaponStat[]} weapons
 */

const GameModeIds = {
    "Defuse": 15773,
    "Elimination": 15775,
    "Gungame": 15776,
    "TeamDeathmatch": 15777,
    "Manhunt": 15846,
    "TournamentMode": 15847,
    "Rush": 15860,
    "Defend": 15861,
    "ManhuntZ": 18596,
    "Wingman": 18850
}

const MapIds = {
    "Canals": 613,
    "Plaza": 615,
    "Legacy": 617,
    "Grounded": 618,
    "Bureau": 619,
    "Brewery": 839,
    "Division": 841,
    "Uplink": 1311,
    "Yard": 1312,
    "Raid": 1360,
    "Heat": 4483,
    "Warehouse": 6655,
    "Gallery": 6670,
    "Port": 6677,
    "Park": 7201,
    "Purify": 7316,
    "Cargo": 7554,
    "Arctic": 7584,
    "Bout": 8024,
    "Soar": 8427,
    "Shanty": 8872,
    "Hangar": 9310,
    "Village": 13410,
    "Impasse": 14066,
    "Overhaul": 15028,
    "Castello": 15391,
}

const PlayerMatchResult = {
    "WIN": 1,
    "LOSS": 2,
    "DRAW": 3
}

/**
 * @typedef {Object} PlayerMatch
 * @property {string} id
 * @property {GameType} game_type
 * @property {GameModeIds} game_mode_id
 * @property {MapIds} map_id
 * @property {number} team
 * @property {PlayerMatchResult} result
 * @property {boolean} left_match
 * @property {number[]} scores
 */

/**
 * @typedef {Object} PlayerMatchesResponse
 * @property {PlayerMatch[]} matches
 */

const PlayerInputDeviceFlags = {
    "MOUSE_AND_KEYBOARD": 1,
    "TOUCH_SCREEN": 2,
    "GAMEPAD": 4
}

/**
 * @typedef {'TeamEliminated' | 'TeamKills' | 'TeamMostKills' | 'TimeUp' | 'Surrendered'} WinCondition
 */

/**
 * @typedef {'Left' | 'Timeout' | 'Kicked' | 'Banned' | 'PingLimit' | 'AFK'} LeaveReason
 */

/**
 * @typedef {Object} PartyInfo
 * @property {boolean} is_leader
 * @property {number[]} players
 */

/**
 * @typedef {Object} GameMatchPlayer
 * @property {number} user_id
 * @property {number} team
 * @property {number} kills
 * @property {number} deaths
 * @property {number} assists
 * @property {number} damage_dealt
 * @property {PlayerInputDeviceFlags} input_device_flags
 * @property {boolean} left_match
 * @property {LeaveReason | null} leave_reason
 * @property {number} level
 * @property {number} match_presence
 * @property {PartyInfo | null} party_info
 */

/**
 * @typedef {Object} GameMatch
 * @property {string} id
 * @property {GameType} game_type
 * @property {GameModeIds} game_mode_id
 * @property {number} server_id
 * @property {MapIds} map_id
 * @property {number[]} team_factions
 * @property {number} winning_team
 * @property {WinCondition} win_condition
 * @property {number[]} scores
 * @property {number} started_at
 * @property {number} ended_at
 * @property {GameMatchPlayer[]} players
 * @property {string | null} replay_id  
 */

/**
 * @typedef {Object} MatchesFetchResponse
 * @property {GameMatch[]} matches
 */

/**
 * @typedef {Object} LeaderboardEntry
 * 
 * @property {number} position
 * @property {number} score
 * @property {ProfileBasicInfo} basic_info
 * @property {ProfileRankedInfo} ranked
 * @property {ClanBasicInfo | undefined} clan
 */

/**
 * @typedef {Object} LeaderboardsResponse
 * @property {LeaderboardEntry[]} entries
 * @property {number} leaderboard_size
 */

/**
 * @typedef {Object} AutohostCreateRequest
 * @property {number} server_id
 * @property {string} room_name
 * @property {string | undefined} password
 * @property {MapIds} map_id
 * @property {GameModeIds} game_mode_id
 */

/**
 * @typedef {Object} MatchPlayer
 * @property {number} user_id
 * @property {number} team
 * @property {number} kills
 * @property {number} deaths
 * @property {number} assists
 * @property {number} damage_dealt
 * @property {PlayerInputDeviceFlags} input_device_flags
 * @property {boolean} left_match
 * @property {LeaveReason | null} leave_reason
 * @property {number} ping
 * @property {UserType} user_type
 * @property {boolean} is_owner
 */

/**
 * @typedef {Object} MatchResult
 * @property {string | null} match_id
 * @property {MapIds} map_id
 * @property {number[]} team_factions
 * @property {number} winning_team
 * @property {WinCondition} win_condition
 * @property {number[]} scores
 * @property {number} started_at
 * @property {number} ended_at
 * @property {number} map_variation
 * @property {number} rounds_played
 * @property {MatchPlayer[]} players
 */

/**
 * @typedef {Object} RoomInfo
 * @property {number} id
 * @property {string | null} code
 * @property {string} name
 * @property {MapIds} map_id
 * @property {GameModeIds} game_mode_id
 * @property {boolean} has_password
 */

/**
 * @typedef {Object} AutohostData
 * @property {number} id
 * @property {string} status
 * @property {number} created_at
 * @property {number} updated_at
 * @property {number} ended_at
 * @property {number | null} pending_expires_at
 * @property {number} server_id
 * @property {RoomInfo} room
 * @property {number} player_count
 * @property {number | null} match_started_at
 * @property {string | null} match_state
 * @property {number} round
 * @property {number[]} scores
 * @property {MatchPlayer[]} players
 * @property {MatchResult[]} results
 * @property {string | null} replay_id
 * @property {string | null} rejection_reason
 */

/**
 * @typedef {Object} AutohostPollResponse
 * @property {AutohostData[]} autohosts
 */

/**
 * @typedef {Object} AutohostCreateResponse
 * @property {AutohostData} autohost
 */

const Commands = {
    "KICK": 'kick',
    "ROOM_OWNER_ADD": 'room_owner_add',
    "ROOM_OWNER_REMOVE": 'room_owner_remove',
    "CLOSE": 'close',
    "RESTART": 'restart'
}


/**
 * @typedef {Object} AutohostControlRequest
 * @property {number} id
 * @property {Commands} command
 * @property {number | null | undefined} user_id
 */

/**
 * @typedef {Object} AutohostControlResponse
 * @property {AutohostData} autohost
 */

/**
 * @typedef {'mmr' | 'kills' | 'deaths' | 'assists' | 'matches' | 'wins' | 'losses' | 'xp' | 'mvp'} LeaderboardType
 */

module.exports.UserType = UserType;
module.exports.BanReason = BanReason;
module.exports.BanType = BanType;
module.exports.ClanMemberRank = ClanMemberRank;
module.exports.PartyInvitePermission = PartyInvitePermission;
module.exports.GameType = GameType;
module.exports.GameModeIds = GameModeIds;
module.exports.MapIds = MapIds;
module.exports.PlayerMatchResult = PlayerMatchResult;
module.exports.PlayerInputDeviceFlags = PlayerInputDeviceFlags;
module.exports.Commands = Commands;