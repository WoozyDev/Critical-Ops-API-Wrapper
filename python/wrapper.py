from typing import Literal
import time, requests, json, apitypes

class BaseUrl:
    LATEST = "https://latest.prod.copsapi.criticalforce.fi/api/public/v2"
    DEFAULT = "https://default.prod.copsapi.criticalforce.fi/api/public/v2"

    def VERSION(version: str):
        return f"https://{version.replace(".", "-")}.prod.copsapi.criticalforce.fi/api/public/v2"

class RatelimitInfo:
    limit: int
    remaining: int
    reset: int
    retry_after: int | None

EXPIRE_TTL_SEC = 60

class CopsClient:
    class CacheEntry:
        data: any
        TTL: int
    token: str
    api_url: str
    cache: dict[str, CacheEntry]
    ratelimitInfo: RatelimitInfo

    def __init__(self, token: str, api_url: str):
        self.token = token;
        self.api_url = api_url;
        self.cache = dict()
        self.ratelimitInfo = RatelimitInfo()
        self.ratelimitInfo.limit = 60
        self.ratelimitInfo.remaining = 60
        self.ratelimitInfo.reset = -1
        self.ratelimitInfo.retry_after = 0

    def request(self, method: Literal['GET'] | Literal['POST'], path: str, data: dict[str, any] | None = None):
        try:
            if method == 'GET':
                if path in self.cache:
                    if self.cache[path]["TTL"] > time.time():
                        return self.cache[path]['data']
                    del self.cache[path]

                req = requests.get(f"{self.api_url}{path}", headers={
                    'Authorization': f"Bearer {self.token}",
                    'Content-Type': 'application/json'
                })
                if req.status_code != 200:
                    raise Exception(req.text)
                j = req.json()

                self.cache[path] = {
                    "data": j,
                    "TTL": time.time() + EXPIRE_TTL_SEC
                }
                self.ratelimitInfo.limit = int(req.headers.get("x-ratelimit-limit"))
                self.ratelimitInfo.remaining = int(req.headers.get("x-ratelimit-remaining"))
                self.ratelimitInfo.reset = int(req.headers.get("x-ratelimit-reset"))
                self.ratelimitInfo.retry_after = int(req.headers.get("retry_after") or "0")
                return j
            if method == 'POST':
                req = requests.post(f"${self.api_url}${path}", data=data, headers={
                    'Authorization': f"Bearer ${self.token}",
                    'Content-Type': 'application/json'
                })
                self.ratelimitInfo.limit = int(req.headers.get('x-ratelimit-limit'))
                self.ratelimitInfo.remaining = int(req.headers.get('x-ratelimit-remaining'))
                self.ratelimitInfo.reset = int(req.headers.get('x-ratelimit-reset'))
                self.ratelimitInfo.retry_after = int(req.headers.get('retry_after') or '0')
                return req.json()
        except Exception as err:
            print(err)
            return None

    def getPlayerMatches(self, user_id: int):
        return self.request('GET', f"/matches/player?user_id={user_id}")

    def getMatches(self, ids: list[str]):
        return self.request('GET', f"/matches/fetch?ids={str.join(",", map(str, ids))}")

    def getProfileByIds(self, user_ids: list[int]) -> list[apitypes.ProfileResponse]:
        try:
            return self.request('GET', f"/profile?ids={str.join(",", map(str, user_ids))}")
        except Exception as e:
            print(e)
            return []

    def getProfileById(self, user_id: int) -> apitypes.ProfileResponse:
        return (self.getProfileByIds([user_id]))[0]

    def getProfileByUsernames(self, usernames: list[str]) -> list[apitypes.ProfileResponse]:
        try:
            return self.request('GET', f"/profile?usernames={str.join(",", map(str, usernames))}")
        except Exception as e:
            print(e)
            return []

    def getProfileByUsername(self, username: str) -> apitypes.ProfileResponse:
        return (self.getProfileByUsernames([username]))[0]

    def getServers(self) -> apitypes.ServersStatusResponse:
        return self.request('GET', f"/status/servers")

    def getWeaponStats(self, user_id: int, game_type: apitypes.GameType = apitypes.GameType.RANKED) -> apitypes.WeaponStatsResponse:
        return self.request('GET', f"/stats/weapons?user_id={user_id}&game_type={game_type.value}")

    def createAutohost(self, data: apitypes.AutohostCreateRequest) -> apitypes.AutohostCreateResponse:
        return self.request('POST', f"/autohost/create", data)

    def sendAutohostCommand(self, data: apitypes.AutohostControlRequest) -> apitypes.AutohostControlResponse:
        return self.request('POST', f"/autohost/control", data)

    def getAutohosts(self, ids: list[int]) -> apitypes.AutohostPollResponse:
        return self.request('GET', f"/autohost/poll?ids={str.join(",", ids)}")

    def getLeaderboards(self, type: apitypes.LeaderboardType, page: int | None, rank: int | None) -> apitypes.LeaderboardsResponse:
        return self.request('GET', f"/autohost/poll?type={type}{f"&page={page if page else 1}"}{f"&rank={rank}" if rank else ''}")