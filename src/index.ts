import axios from "axios";
import { AutohostControlRequest, AutohostControlResponse, AutohostCreateRequest, AutohostCreateResponse, AutohostPollResponse, GameModeIds, GameType, LeaderboardsResponse, LeaderboardType, MapIds, MatchesFetchResponse, PlayerMatchesResponse, ProfileResponse, ServersStatusResponse, WeaponStatsResponse } from "./types";

let token = '';
let api_url = '';

async function request<T>(method: 'GET' | 'POST', path: string, data?: { [key: string]: any }): Promise<T> {
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
            return req.data as T;
        }
        if(method == 'POST') {
            let req = await axios.post(`${api_url}${path}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(req.headers)
            ratelimitInfo.limit = parseInt(req.headers['x-ratelimit-limit']);
            ratelimitInfo.remaining = parseInt(req.headers['x-ratelimit-remaining']);
            ratelimitInfo.reset = parseInt(req.headers['x-ratelimit-reset']);
            ratelimitInfo.retry_after = parseInt(req.headers['retry_after'] ?? '0');
            return req.data as T;
        }
    } catch (err) {
        return Promise.reject(err?.response?.data ?? { "error": { "code": "unknown_error", "message": "Unknown error occurred" }, "full": err });
    }
}

function setToken(_token: string) {
    token = _token;
}

function setApiUrl(url: string) {
    api_url = url;
}

const ratelimitInfo = {
    limit: 60,
    remaining: 60,
    reset: -1,
    retry_after: 0
}


async function getPlayerMatches(user_id: number) {
    return await request<PlayerMatchesResponse>('GET', `/matches/player?user_id=${encodeURIComponent(user_id)}`);
}

async function getMatches(ids: string[]) {
    return await request<MatchesFetchResponse>('GET', `/matches/fetch?ids=${ids.map(i => encodeURIComponent(i)).join(',')}`);
}

async function getProfileByIds(user_ids: number[]) {
    return await request<ProfileResponse[]>('GET', `/profile?ids=${user_ids.map(i => encodeURIComponent(i)).join(',')}`);
}

async function getProfileById(user_id: number) {
    return (getProfileByIds([user_id]))[0];
}

async function getProfileByUsernames(usernames: string[]) {
    return await request<ProfileResponse[]>('GET', `/profile?usernames=${usernames.map(u => encodeURIComponent(u)).join(',')}`);
}

async function getProfileByUsername(username: string) {
    return (getProfileByUsernames([username]))[0];
}

async function getServers() {
    return await request<ServersStatusResponse>('GET', `/status/servers`);
}

async function getWeaponStats(user_id: number, game_type: GameType) {
    return await request<WeaponStatsResponse>('GET', `/stats/weapons?user_id=${encodeURIComponent(user_id)}&game_type=${encodeURIComponent(game_type)}`);
}

async function createAutohost(data: AutohostCreateRequest) {
    return await request<AutohostCreateResponse>('POST', `/autohost/create`, data);
}

async function sendAutohostCommand(data: AutohostControlRequest) {
    return await request<AutohostControlResponse>('POST', `/autohost/control`, data);
}

async function getAutohosts(ids: number[]) {
    return await request<AutohostPollResponse>('GET', `/autohost/poll?ids=${ids.map(i => encodeURIComponent(i)).join(',')}`);
}

async function getLeaderboards(type: LeaderboardType, page: number = 1, rank?: number) {
    return await request<LeaderboardsResponse>('GET', `/autohost/poll?type=${encodeURIComponent(type)}${page?`&page=${encodeURIComponent(page)}`:''}${rank?`&rank=${encodeURIComponent(rank)}`:''}`);
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

export default API;