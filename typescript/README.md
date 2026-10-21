# Critical Ops Public API Node.JS TypeScript Wrapper

This is a wrapper which is based on the [Critical Ops Public API](https://criticalopsgame.com/api/) written in TypeScript for developers who use [Node.JS runtime](https://nodejs.org/) (for example [discord bots](https://discord.com/developers/docs)).

# Implementation

This wrapper implements all the endpoints of the public api.
- Profiles
- Weapon Stats
- Autohost
- Server Status
- Leaderboards
- Match History

# Ratelimit

The ratelimit is always updated into the `ratelimitInfo` variable, which includes `limit`, `remaining` and `reset` timestamp (in seconds), but also `after` which tells you when you can request again after being ratelimited.

# Unix Timestamps

All the unix timestamps in the public api are in seconds, never in milliseconds.

# Use

This API wrapper was made by [@woozy666](https://discord.com/users/723553355753848832) and anyone can use it as long as they abide by the Critical Force [Terms Of Use](https://criticalopsgame.com/terms/) and [Fan Content Policy](https://criticalopsgame.com/fan-content-policy/).