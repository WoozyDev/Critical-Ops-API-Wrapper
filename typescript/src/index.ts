import axios from "axios";
import { AutohostControlRequest, AutohostControlResponse, AutohostCreateRequest, AutohostCreateResponse, AutohostPollResponse, GameModeIds, GameType, LeaderboardsResponse, LeaderboardType, MapIds, MatchesFetchResponse, PlayerMatchesResponse, ProfileResponse, ServersStatusResponse, WeaponStatsResponse } from "./types";


type RatelimitInfo = {
    limit: number;
    remaining: number;
    reset: number;
    retry_after?: number;
}

let EXPIRE_TTL_MS = 1000 * 60 * 2;

export class CopsClient {
    token: string;
    api_url: string;
    cache: {
        [key: string]: {
            data: any;
            TTL: number;
        }
    };
    ratelimitInfo: RatelimitInfo;

    constructor(token: string, api_url: string) {
        this.token = token;
        this.api_url = api_url;
        this.cache = {};
        this.ratelimitInfo = {
            limit: 60,
            remaining: 60,
            reset: -1,
            retry_after: 0
        }
    }

    async request<T>(method: 'GET' | 'POST', path: string, data?: { [key: string]: any }): Promise<T> {
        try {
            if (method == 'GET') {
                if(this.cache[path] && this.cache[path].TTL < Date.now())
                    return this.cache[path].data;

                delete this.cache[path];

                let req = await axios.get(`${this.api_url}${path}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });
                this.cache[path] = {
                    data: req.data as T,
                    TTL: Date.now() + EXPIRE_TTL_MS
                }
                this.ratelimitInfo.limit = parseInt(req.headers['x-ratelimit-limit']);
                this.ratelimitInfo.remaining = parseInt(req.headers['x-ratelimit-remaining']);
                this.ratelimitInfo.reset = parseInt(req.headers['x-ratelimit-reset']);
                this.ratelimitInfo.retry_after = parseInt(req.headers['retry_after'] ?? '0');
                return req.data as T;
            }
            if (method == 'POST') {
                if(this.cache[path] && this.cache[path].TTL < Date.now())
                    return this.cache[path].data;

                delete this.cache[path];

                let req = await axios.post(`${this.api_url}${path}`, data, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                this.cache[path] = {
                    data: req.data as T,
                    TTL: Date.now() + EXPIRE_TTL_MS
                }
                this.ratelimitInfo.limit = parseInt(req.headers['x-ratelimit-limit']);
                this.ratelimitInfo.remaining = parseInt(req.headers['x-ratelimit-remaining']);
                this.ratelimitInfo.reset = parseInt(req.headers['x-ratelimit-reset']);
                this.ratelimitInfo.retry_after = parseInt(req.headers['retry_after'] ?? '0');
                return req.data as T;
            }
        } catch (err) {
            console.error(err?.response?.data ?? { "error": { "code": "unknown_error", "message": "Unknown error occurred" }, "full": err });
            return Promise.reject(null);
        }
    }

    async getPlayerMatches(user_id: number) {
        return await this.request<PlayerMatchesResponse>('GET', `/matches/player?user_id=${encodeURIComponent(user_id)}`);
    }

    async getMatches(ids: string[]) {
        return await this.request<MatchesFetchResponse>('GET', `/matches/fetch?ids=${ids.map(i => encodeURIComponent(i)).join(',')}`);
    }

    async getProfileByIds(user_ids: number[]) {
        try {
            return await this.request<ProfileResponse[]>('GET', `/profile?ids=${user_ids.map(i => encodeURIComponent(i)).join(',')}`);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getProfileById(user_id: number) {
        return (this.getProfileByIds([user_id]))[0];
    }

    async getProfileByUsernames(usernames: string[]) {
        try {
            return await this.request<ProfileResponse[]>('GET', `/profile?usernames=${usernames.map(u => encodeURIComponent(u)).join(',')}`);
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getProfileByUsername(username: string) {
        return (this.getProfileByUsernames([username]))[0];
    }

    async getServers() {
        return await this.request<ServersStatusResponse>('GET', `/status/servers`);
    }

    async getWeaponStats(user_id: number, game_type: GameType) {
        return await this.request<WeaponStatsResponse>('GET', `/stats/weapons?user_id=${encodeURIComponent(user_id)}&game_type=${encodeURIComponent(game_type)}`);
    }

    async createAutohost(data: AutohostCreateRequest) {
        return await this.request<AutohostCreateResponse>('POST', `/autohost/create`, data);
    }

    async sendAutohostCommand(data: AutohostControlRequest) {
        return await this.request<AutohostControlResponse>('POST', `/autohost/control`, data);
    }

    async getAutohosts(ids: number[]) {
        return await this.request<AutohostPollResponse>('GET', `/autohost/poll?ids=${ids.map(i => encodeURIComponent(i)).join(',')}`);
    }

    async getLeaderboards(type: LeaderboardType, page: number = 1, rank?: number) {
        return await this.request<LeaderboardsResponse>('GET', `/autohost/poll?type=${encodeURIComponent(type)}${page ? `&page=${encodeURIComponent(page)}` : ''}${rank ? `&rank=${encodeURIComponent(rank)}` : ''}`);
    }
}