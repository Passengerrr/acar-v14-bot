const { Client, Collection,  GatewayIntentBits, Partials, Constants, Intents, Options } = require("discord.js");
const { joinVoiceChannel } = require('@discordjs/voice')
const fs = require('fs')
const { bgBlue, black, green } = require("chalk");
global.sistem = global.system = require('../Ayarlar/server.json');
const DISCORD_LOGS = require('discord-logs')
const { GUILD } = require('../../base/Reference/Settings');
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const EventEmitter = require('events');
class cartel extends Client {
    constructor(options) {
    super({
        options,
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent
        ],
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.User,
            Partials.GuildMember,
            Partials.Reaction
        ],
                makeCache: Options.cacheWithLimits({
                    MessageManager: 2000,
                    PresenceManager: 50000,
                }),
            });
            DISCORD_LOGS(this)
            Object.defineProperty(this, "location", { value: process.cwd() });
            this.sistem = this.system = require('../Ayarlar/server.json');
            GUILD.fetch(this.sistem.SUNUCU.GUILD)
            this.users.getUser = GetUser;
            this.getUser = GetUser;
            async function GetUser(id) { try { return await this.users.fetch(id); } catch (error) { return undefined; } };
            
            this.logger = require('../Funksiyonlar/Logger');

            this.Upstaffs = {}
            this._statSystem = global._statSystem = {}
            require('../Funksiyonlar/Dates');
            require('../Funksiyonlar/Numbers');
            require('../Bases/_sources');
            require('../Bases/_user');
            this.botİsmi;
            this.commands = new Collection();
            
            this.aliases = new Collection();
            this.eventEmitter = new EventEmitter();
            this.setMaxListeners(10000);

            // Plugins (Stat / Yetkili )

          


            this.on("guildUnavailable", async (guild) => { console.log(`[UNAVAIBLE]: ${guild.name}`) })
                .on("disconnect", () => this.logger.log("Bot is disconnecting...", "disconnecting"))
                .on("reconnecting", () => this.logger.log("Bot reconnecting...", "reconnecting"))
                .on("error", (e) => this.logger.log(e, "error"))
                .on("warn", (info) => this.logger.log(info, "warn"));

              //  process.on("unhandledRejection", (err) => { this.logger.log(err, "caution") });
                process.on("warning", (warn) => { this.logger.log(warn, "varn") });
                process.on("beforeExit", () => { console.log('Sistem kapatılıyor...'); });
                process.on("uncaughtException", err => {
                    const hata = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
                        console.error("Beklenmedik Hata: ", hata);
                       // process.exit(1);
                });

        }

        async fetchCommands(active = true) {

            if(active) return;
            let dirs = fs.readdirSync("./_serverCommands", { encoding: "utf8" });
            this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} ${dirs.length} category in client loaded.`, "category");
            await GUILD.fetch(this.sistem.SUNUCU.GUILD)
            dirs.forEach(dir => {
                let files = fs.readdirSync(`../../applications/${this.botİsmi}/_serverCommands/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} ${files.length} commands loaded in ${dir} category.`, "load");
                files.forEach(file => {
                    let referans = require(`../../applications/${this.botİsmi}/_serverCommands/${dir}/${file}`);
                    if(referans.onLoad != undefined && typeof referans.onLoad == "function") referans.onLoad(this);
                    this.commands.set(referans.Isim, referans);
                    if (referans.Komut) referans.Komut.forEach(alias => this.aliases.set(alias, referans));
                });
            });
        }

        async fetchEvents(active = true) {
            if(!active) return;
            let dirs = fs.readdirSync('./_serverEvents', { encoding: "utf8" });
            dirs.forEach(dir => {
                let files = fs.readdirSync(`../../applications/${this.botİsmi}/_serverEvents/${dir}`, { encoding: "utf8" }).filter(file => file.endsWith(".js"));
                files.forEach(file => {
                    let referans = require(`../../applications/${this.botİsmi}/_serverEvents/${dir}/${file}`);
                    this.on(referans.config.Event, referans);
                });
            });
         }

        connect(token) {
            if(!token) {
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} isimli botun tokeni girilmediğinden dolayı bot kapanıyor...`,"error");
                process.exit()
                return;
            }
            this.login(token).then(cartel => {
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} BOT kullanıma aktif edilmiştir.`,"botReady")
                this.user.setPresence({ activities: [{name: global.sistem.botStatus.Name}], status: global.sistem.botStatus.Status })
                this.on("ready", async () => {
                    let guild = client.guilds.cache.get(global.sistem.SUNUCU.GUILD);
                    if(!guild) {
                        console.log(`https://discord.com/api/oauth2/authorize?client_id=${this.user.id}&permissions=0&scope=bot%20applications.commands`)
                        return process.exit();
                    }
                    this.Upstaffs = require('../Additions/Staff/_index');
                    this._statSystem = global._statSystem = require('../../base/Additions/Staff/Sources/_settings');
                    if(guild) await guild.members.fetch().then(fetch => { })
                    let kanal = this.channels.cache.get(sistem.SUNUCU.VoiceChannelID)
                    if(kanal) joinVoiceChannel({ channelId: kanal.id, guildId: kanal.guild.id, adapterCreator: kanal.guild.voiceAdapterCreator});
                })
                this.on("voiceStateUpdate", async (oldState, newState) => { 
                    if(oldState.member.id === this.user.id && oldState.channelId && !newState.channelId) {
                        let kanal = this.channels.cache.get(global.ayarlar ? global.ayarlar.botSesKanalı : "123")
                        if(kanal) joinVoiceChannel({ channelId: kanal.id, guildId: kanal.guild.id, adapterCreator: kanal.guild.voiceAdapterCreator});
                        this.user.setPresence({ activities: [{name:sistem.botStatus.Name}], status:sistem.botStatus.Status })
                        this.logger.log(`${black.bgHex('#D9A384')(this.botName.toUpperCase())} Bot sesten düştü ve tekrardan giriş yaptı.`,"reconnecting")
                    }
                })

                this.on("ready", () => {
                    setInterval(async () => {
                        client.user.setPresence({
                            activities: [{ name: sistem.botStatus.Name, type: sistem.botStatus.type }],
                            status: sistem.botStatus.Status
                        });
                        const channel = client.channels.cache.get(sistem.SUNUCU.VoiceChannelID)
                        joinVoiceChannel({
                            channelId: channel.id,
                            guildId: channel.guild.id,
                            adapterCreator: channel.guild.voiceAdapterCreator,
                            selfDeaf: true,
                            selfMute: true,
                        });
                    }, 60 * 1000);
                })

            }).catch(cartel => {
                this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} isimli botun tokeni doğrulanamadı. 5 Saniye sonra tekrardan denenecektir...`,"reconnecting")
                setTimeout(() => {
                    this.login().catch(cartel => {
                        this.logger.log(`${black.bgHex('#D9A384')(this.botİsmi.toUpperCase())} isimli botun tokeni doğrulanamadı sistem kapatılıyor....`,"error")
                        process.exit()
                    })
                }, 5000 )
            })
        }

}

module.exports = { cartel }