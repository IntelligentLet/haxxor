const config = require("./config.json")
const execSync = require('child_process').execSync;

if (!config.auth.discord) console.log(`Discord Token is missing!`)
if (!config.join.rules) console.log(`Rules are missing!`)
if (!config.join.welcome) console.log(`Welcome Channel is missing!`)
if (!config.host.port) console.log(`Port is missing!`)
if (!config.meta.prefix) console.log(`Prefix is missing!`)
if (!config.meta.color) console.log(`Embed Color is missing!`)

const deps = execSync(`npm list --depth=0`)

if (!deps.includes("axios")) console.log(`Missing axios`)
if (!deps.includes("date-and-time")) console.log(`Missing date-and-time`)
if (!deps.includes("discord.js")) console.log(`Missing discord.js`)
if (!deps.includes("express")) console.log(`Missing express`)
if (!deps.includes("node-vibrant")) console.log(`Missing node-vibrant`)