const Discord = require("discord.js")
const pinger = require("starblast-pinger")
require("dotenv").config()

const token = process.env.DISCORD_BOT_TOKEN;
const channel = process.env.CHANNEL;

/**
 * String.prototype.replaceAll() polyfill
 * https://gomakethings.com/how-to-replace-a-section-of-a-string-with-another-one-with-vanilla-js/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function(str, newStr){
        if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
            return this.replace(str, newStr);
        }
        return this.replace(new RegExp(str, 'g'), newStr);
    };
}

const client = new Discord.Client();

let extractGameLink = (message) => {
    if (message.includes("starblast.io/#")) {
        return "https://starblast.io/#" + message.split("#")[1].split(" ")[0]
    }
    return "";
}

let systemInfo = async(url) => {
    if (!url.startsWith("https://starblast.io/#")) {
        console.log("Unable to parse " + url);
        return `Unable to fetch system info`;
    }
    let info = await pinger.getSystemInfo(url);
    if (!info.mode) {
        return "Unable to fetch system info";
    }
    info.mode.max_players = info.mode.max_players || false;
    info.mode.healing_enabled = info.mode.healing_enabled || false;
    info.mode.strafe = info.mode.strafe || 0;
    info.mode.unlisted = info.mode.unlisted || false;
    info.mode.friendly_colors = info.mode.friendly_colors || 0;
    info.mode.root_mode = info.mode.root_mode || "unspecified";
    info.mode.starting_ship_maxed = info.mode.starting_ship_maxed || false;
    info.mode.starting_ship = info.mode.starting_ship || 101;
    info.mode.max_level = info.mode.max_level || 7;
    info.mode.crystal_value = info.mode.crystal_value || 1;
    info.mode.asteroids_strength = info.mode.asteroids_strength || 1;
    info.mode.friction_ratio = info.mode.friction_ratio || 1;
    info.mode.survival_time = info.mode.survival_time || 60;
    let modding = info.mode.id === "modding";
    let gameMode = modding ? info.mode.root_mode : info.mode.id;
    if (gameMode === "team") {
        return `${info.mode.friendly_colors} station team mode${modding ? " (modded)" : ""}: ${info.region},${info.mode.starting_ship_maxed ? " Maxed" : ""} ${info.mode.starting_ship} (max level: ${info.mode.max_level}). Asteroid yield ${info.mode.crystal_value}x, strength ${info.mode.asteroids_strength}x. Friction ${info.mode.friction_ratio}x`
    } else if (gameMode === "survival") {
        return `${info.mode.survival_time} minute survival mode${modding ? " (modded)" : ""}: ${info.region},${info.mode.starting_ship_maxed ? " Maxed" : ""} ${info.mode.starting_ship} (max level: ${info.mode.max_level}). Asteroid yield ${info.mode.crystal_value}x, strength ${info.mode.asteroids_strength}x. Friction ${info.mode.friction_ratio}x`
    } else if (gameMode === "deathmatch") {
        return `deathmatch${modding ? " (modded)" : ""}: ${info.region}, Asteroid yield ${info.mode.crystal_value}x, strength ${info.mode.asteroids_strength}x. Friction ${info.mode.friction_ratio}x`
    } else if (gameMode === "invasion") {
        return `invasion: ${info.region}.`
    } else if (gameMode === "unspecified") {
        return `unspecified game mode${modding ? " (modded)" : ""}: ${info.region}, Asteroid yield ${info.mode.crystal_value}x, strength ${info.mode.asteroids_strength}x. Friction ${info.mode.friction_ratio}x`
    }
    return "Unable to fetch system info";
}

client.on("message", async(message) => {
    if (message.channel.id === channel && extractGameLink(message.content) !== "") {
        message.channel.send(await systemInfo(extractGameLink(message.content))).then()
    }
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token).then();