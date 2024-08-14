import { lobbyConfig } from "./config.js";

export function createLobby(data, host) {
    return {...lobbyConfig, ...data, host}
}