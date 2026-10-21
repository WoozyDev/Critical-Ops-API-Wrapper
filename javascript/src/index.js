const axios = require('axios');
const { PlayerMatchesResponse, MatchesFetchResponse, ProfileResponse, ServersStatusResponse, WeaponStatsResponse, AutohostControlResponse, AutohostPollResponse, LeaderboardsResponse, GameType, AutohostCreateRequest, AutohostControlRequest } = require('./types');

let token = '';
let api_url = '';

/**
 * 
 * @param {'GET' | 'POST'} method 
 * @param {string} path 
 * @param {Record<string, any> | undefined} data 
 * @returns {Promise<Object>}
 */
async function request(method, path, data) {
    try {
        if(method == 'GET') {
            let req = await axios.get(`${api_url}${path}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            ratelimitInfo.limit = parseInt(req.headers['x-ratelimit-limit']);
            ratelimitInfo.remaining = parseInt(req.headers['x-ratelimit-remaining']);
            ratelimitInfo.reset = parseInt(req.headers['x-ratelimit-reset']);
            ratelimitInfo.retry_after = parseInt(req.headers['retry_after'] ?? '0');
            return req.data;
        }
        if(method == 'POST') {
            let req = await axios.post(`${api_url}${path}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            ratelimitInfo.limit = parseInt(req.headers['x-ratelimit-limit']);
            ratelimitInfo.remaining = parseInt(req.headers['x-ratelimit-remaining']);
            ratelimitInfo.reset = parseInt(req.headers['x-ratelimit-reset']);
            ratelimitInfo.retry_after = parseInt(req.headers['retry_after'] ?? '0');
            return req.data;
        }
    } catch (err) {
        return Promise.reject(err?.response?.data ?? { "error": { "code": "unknown_error", "message": "Unknown error occurred" }, "full": err });
    }
}

/**
 * Sets the token for the API to use.
 * @param {string} _token 
 */
function setToken(_token) {
    token = _token;
}

/**
 * Sets the URL which the API will be using.
 * @param {string} url 
 */
function setApiUrl(url) {
    api_url = url;
}

const ratelimitInfo = {
    limit: 60,
    remaining: 60,
    reset: -1,
    retry_after: 0
}

/**
 * Finds the matches the player has played.
 * @param {number} user_id 
 * @returns {Promise<PlayerMatchesResponse>}
 */
async function getPlayerMatches(user_id) {
    return await request('GET', `/matches/player?user_id=${encodeURIComponent(user_id)}`);
}

/**
 * Finds the matches based on the criteria.
 * @param {string[]} ids 
 * @returns {Promise<MatchesFetchResponse>}
 */
async function getMatches(ids) {
    return await request('GET', `/matches/fetch?ids=${ids.map(i => encodeURIComponent(i)).join(',')}`);
}

/**
 * Finds profiles based on the criteria.
 * @param {number[]} user_ids 
 * @returns {Promise<ProfileResponse[]>}
 */
async function getProfileByIds(user_ids) {
    return await request('GET', `/profile?ids=${user_ids.map(i => encodeURIComponent(i)).join(',')}`);
}

/**
 * Finds a profile based on the criteria.
 * @param {number} user_id 
 * @returns {Promise<ProfileResponse>}
 */
async function getProfileById(user_id) {
    return (getProfileByIds([user_id]))[0];
}

/**
 * Finds profiles based on the criteria.
 * @param {string[]} usernames 
 * @returns {Promise<ProfileResponse[]>}
 */
async function getProfileByUsernames(usernames) {
    return await request('GET', `/profile?usernames=${usernames.map(u => encodeURIComponent(u)).join(',')}`);
}

/**
 * Finds a profile based on the criteria.
 * @param {string} username 
 * @returns {Promise<ProfileResponse>}
 */
async function getProfileByUsername(username) {
    return (getProfileByUsernames([username]))[0];
}

/**
 * Request a list of active servers.
 * @returns {Promise<ServersStatusResponse>}
 */
async function getServers() {
    return await request('GET', `/status/servers`);
}

/**
 * Requests the weapon statistics of a player.
 * @param {number} user_id 
 * @param {GameType} game_type 
 * @returns {Promise<WeaponStatsResponse>}
 */
async function getWeaponStats(user_id, game_type) {
    return await request('GET', `/stats/weapons?user_id=${encodeURIComponent(user_id)}&game_type=${encodeURIComponent(game_type)}`);
}

/**
 * Creates a room based on the data provided.
 * @param {AutohostCreateRequest} data 
 * @returns {Promise<AutohostCreateResponse>}
 */
async function createAutohost(data) {
    return await request('POST', `/autohost/create`, data);
}

/**
 * Sends match controls based on the data provided.
 * @param {AutohostControlRequest} data 
 * @returns {Promise<AutohostControlResponse>}
 */
async function sendAutohostCommand(data) {
    return await request('POST', `/autohost/control`, data);
}

/**
 * Requests a list of autohosted games.
 * @param {number[]} ids 
 * @returns {Promise<AutohostPollResponse>}
 */
async function getAutohosts(ids) {
    return await request('GET', `/autohost/poll?ids=${ids.map(i => encodeURIComponent(i)).join(',')}`);
}

/**
 * Requests a list of players on the leaderboard based on the parameters.
 * @param {LeaderboardType} type 
 * @param {number} page 
 * @param {number | undefined} rank 
 * @returns {Promise<LeaderboardsResponse>}
 */
async function getLeaderboards(type, page = 1, rank) {
    return await request('GET', `/autohost/poll?type=${encodeURIComponent(type)}${page?`&page=${encodeURIComponent(page)}`:''}${rank?`&rank=${encodeURIComponent(rank)}`:''}`);
}

const API = {
    setToken,
    setApiUrl,
    ratelimitInfo,
    getProfileById,
    getProfileByIds,
    getProfileByUsername,
    getProfileByUsernames,
    getPlayerMatches,
    getMatches,
    getServers,
    getWeaponStats,
    createAutohost,
    sendAutohostCommand,
    getAutohosts,
    getLeaderboards
}

module.exports = API;