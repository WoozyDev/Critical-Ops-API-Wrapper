"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratelimitInfo = void 0;
exports.setToken = setToken;
exports.setApiUrl = setApiUrl;
exports.getPlayerMatches = getPlayerMatches;
exports.getMatches = getMatches;
exports.getProfileById = getProfileById;
exports.getProfileByIds = getProfileByIds;
exports.getProfileByUsername = getProfileByUsername;
exports.getProfileByUsernames = getProfileByUsernames;
exports.getServers = getServers;
exports.getWeaponStats = getWeaponStats;
exports.createAutohost = createAutohost;
exports.sendAutohostCommand = sendAutohostCommand;
exports.getAutohosts = getAutohosts;
exports.getLeaderboards = getLeaderboards;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = require("dotenv");
const node_util_1 = require("node:util");
const types_1 = require("./types");
let token = '';
let api_url = '';
function setToken(_token) {
    token = _token;
}
function setApiUrl(url) {
    api_url = url;
}
exports.ratelimitInfo = {
    limit: 60,
    remaining: 60,
    reset: -1
};
async function request(method, path, data) {
    try {
        if (method == 'GET') {
            let req = await axios_1.default.get(`${api_url}${path}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            exports.ratelimitInfo.limit = parseInt(req.headers['x-ratelimit-limit']);
            exports.ratelimitInfo.remaining = parseInt(req.headers['x-ratelimit-remaining']);
            exports.ratelimitInfo.reset = parseInt(req.headers['x-ratelimit-reset']);
            return req.data;
        }
        if (method == 'POST') {
            let req = await axios_1.default.post(`${api_url}${path}`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log(req.headers);
            exports.ratelimitInfo.limit = parseInt(req.headers['x-ratelimit-limit']);
            exports.ratelimitInfo.remaining = parseInt(req.headers['x-ratelimit-remaining']);
            exports.ratelimitInfo.reset = parseInt(req.headers['x-ratelimit-reset']);
            return req.data;
        }
    }
    catch (err) {
        return err?.response?.data ?? { "error": { "code": "unknown_error", "message": "Unknown error occurred" } };
    }
}
async function getPlayerMatches(user_id) {
    return await request('GET', `/matches/player?user_id=${user_id}`);
}
async function getMatches(ids) {
    return await request('GET', `/matches/fetch?ids=${ids.join(',')}`);
}
async function getProfileById(user_id) {
    return (await request('GET', `/profile?ids=${user_id}`))[0];
}
async function getProfileByIds(user_ids) {
    return await request('GET', `/profile?ids=${user_ids.join(',')}`);
}
async function getProfileByUsername(username) {
    return (await request('GET', `/profile?usernames=${username}`))[0];
}
async function getProfileByUsernames(usernames) {
    return await request('GET', `/profile?usernames=${usernames.join(',')}`);
}
async function getServers() {
    return await request('GET', `/status/servers`);
}
async function getWeaponStats(user_id, game_type) {
    return await request('GET', `/stats/weapons?user_id=${user_id}&game_type=${game_type}`);
}
async function createAutohost(data) {
    return await request('POST', `/autohost/create`, data);
}
async function sendAutohostCommand(data) {
    return await request('POST', `/autohost/control`, data);
}
async function getAutohosts() {
    return await request('GET', `/autohost/poll`);
}
async function getLeaderboards(type, page = 1, rank) {
    return await request('GET', `/autohost/poll`);
}
(0, dotenv_1.config)();
setToken(process.env.token);
setApiUrl(process.env.API_URL);
getWeaponStats(246001782, types_1.GameType.RANKED).then(data => {
    console.log((0, node_util_1.inspect)(data, true, Infinity));
    console.log(exports.ratelimitInfo);
}).catch(console.error);
