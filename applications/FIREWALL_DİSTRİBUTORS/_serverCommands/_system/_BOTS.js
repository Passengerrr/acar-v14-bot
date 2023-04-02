const { Client, Message, Util, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, StringSelectMenuBuilder, EmbedBuilder } = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives')
const Users = require('../../../../database/Schemas/Client.Users')
const GUARDS_SETTINGS = require('../../../../database/Schemas/Guards/Global.Guard.Settings')
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings')
const { cartelEmbed } = require('../../../../base/Reference/Embed')

let BOTS = global.allBots = client.allBots = []
module.exports = {
    Isim: "bot",
    Komut: ["bot-dev","update-bots","botsu","acr-bot","bot-setting","dev-discord","bots","botpp"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: async function (client) {
    let cartelcim = require('../../../../base/Ayarlar/server.json');

    // Bot Token's

let Stats = cartelcim.TOKENLER.Statistics
let Moderation = cartelcim.TOKENLER.Moderation
let Management = sistem.TOKENLER.Management
let AUXLİARY = cartelcim.TOKENLER.AUXLİARY
let Guard = cartelcim.TOKENLER.Guard


    // Bot Token's

let allTokens = [Stats, Moderation,Management, AUXLİARY, Guard]
let guardSettings = await GUARDS_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
if(!guardSettings) await GUARDS_SETTINGS.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"auditLimit": 10, auditInLimitTime: "2m"}}, {upsert: true})
allTokens.forEach(async (token) => {
    let botClient;
    if(cartelcim.TOKENLER.Dağıtıcılar.includes(token) || Guard == token) {
        botClient = new Client({
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
            presence: {activities: [{name: sistem.botStatus.Name, status: sistem.botStatus.Status, type: sistem.botStatus.type}]}
          }); 
    } else {
        botClient = new Client({
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
            presence: {activities: [{name: sistem.botStatus.Name, status: sistem.botStatus.Status, type: sistem.botStatus.type}]}
          });

    }
      botClient.on("ready", async () => {  
          BOTS.push(botClient)
          let guardSettings = await GUARDS_SETTINGS.findOne({guildID: sistem.SUNUCU.GUILD})
          if(!cartelcim.TOKENLER.Dağıtıcılar.includes(botClient.token)) {
            if(guardSettings && guardSettings.BOTS && !guardSettings.BOTS.includes(botClient.user.id)) {
                await GUARDS_SETTINGS.updateOne({guildID: sistem.SUNUCU.GUILD}, {$push: {"BOTS": botClient.user.id} }, {upsert: true})
            }
          }  
      })
      await botClient.login(token).catch(err => {
      })
})

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    

        // Bot Token's

    let Stat = sistem.TOKENLER.Statistics
    let Moderation = sistem.TOKENLER.Moderation
    let AUXLİARY = sistem.TOKENLER.AUXLİARY
    let Guard = sistem.TOKENLER.Guard
    
    
        // Bot Token's

    let allTokens = [Stat, Moderation, AUXLİARY, Guard]
    let pubTokens = [Stat, Moderation, AUXLİARY, Guard]
   
    let OWNBOTS = []

    BOTS.forEach(bot => {
        OWNBOTS.push({
            value: bot.user.id,
        
            label: `${bot.user.tag}`,
            description: `${bot.user.id}`
        })
    })
    let Row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
        .setCustomId("selectBot")
        .setPlaceholder("🎄 BOTS")
        .setOptions(
            [OWNBOTS]
        )
    )

    let msg = await message.channel.send({embeds: [new EmbedBuilder().setColor("Random").setAuthor({name: message.member.user.tag, iconURL: message.member.user.avatarURL({dynamic: true})}).setDescription(`Aşağıda sıralanmakta olan botların ismini, profil fotoğrafını, durumunu ve hakkındasını değişmesini istediğiniz bir botu seçiniz.`)],components: [Row]})
    const filter = i => i.user.id == message.member.id
    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })

    collector.on('collect', async (i) => {
        if(i.customId == "selectBot") {
            let type = i.values
            if(!type) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})

                let botId = i.values
                let botClient = BOTS.find(bot => bot.user.id == type)
                if(!botClient) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                let updateRow = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setCustomId("selectAvatar")
                    .setEmoji("943286130357444608")
                    .setLabel("Profil Fotoğrafı Değişikliliği")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("selectName")
                    .setEmoji("943290426562076762")
                    .setLabel("İsim Değişikliliği")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("selectAbout")
                    .setEmoji("943290446329835570")
                    .setLabel("Hakkında Değişikliliği")
                    .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                    .setCustomId("selectState")
                    .setEmoji("951514358377234432")
                    .setLabel("Durum Değişikliliği")
                    .setStyle(ButtonStyle.Secondary),
                )
                msg.delete().catch(err => {})
                await message.channel.send({embeds: [new EmbedBuilder().setColor("WHITE").setDescription(`${botClient.user} (**${botClient.user.tag}**) isimli bot üzerinde yapmak istediğiniz değişikliliği seçiniz?`)], components: [
                    updateRow
                ]}).then(msg => {
                    const filter = i => i.user.id == message.member.id 
                    const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })
                    collector.on("collect", async (i) => {
                        let botClient = BOTS.find(bot => bot.user.id == botId)
                        if(!botClient) return await i.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                        if(i.customId == "selectAbout" || i.customId == "selectState") {
                            await i.reply({content:`Şuan yapım aşamasında.`, ephemeral: true})
                        }
                        if(i.customId == "selectAvatar") {
                             msg.edit({embeds: [new EmbedBuilder().setColor("WHITE").setDescription(`${message.guild.emojiGöster(emojiler.Icon)} ${botClient.user} isimli botun yeni profil resmini yükleyin veya bağlantısını girin.`)],components: []})
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => {});
                                    message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
                                    await i.reply({content: `${cevaplar.prefix} Profil resmi değiştirme işlemi iptal edildi.`, ephemeral: true})
                                    return;
                                  };
                                  let eskinick = botClient.user.avatarURL({dynamic: true})
                                  let bekle = await message.reply(`Güncelleniyor....`)
                                   let isim = m.content || m.attachments.first().url
                                    if(!isim) {
                                        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
                                        msg.delete().catch(err => {});
                                        await i.reply({content: `${cevaplar.prefix} Profil resmi belirtilmediği için işlem iptal edildi.`, ephemeral: true})
                                        return;
                                    }
                                  botClient.user.setAvatar(isim).then(x => {
                                      bekle.delete().catch(err => {})
                                      msg.delete().catch(err => {})
                                      let logChannel = message.guild.kanalBul("guild-log")
                                      if(logChannel) logChannel.send({embeds: [new EmbedBuilder().setFooter({text: `${tarihsel(Date.now())} tarihinde işleme koyuldu.`}).setDescription(`${message.member} tarafından ${botClient.user} isimli botun profil resmi değiştirildi.`).setThumbnail(botClient.user.avatarURL())]})
                                      message.channel.send({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla! ${botClient.user} isimli botun profil resmi güncellendi!`).setThumbnail(botClient.user.avatarURL())]}).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 30000);
                                   })
                                  }).catch(err => {
                                       bekle.delete().catch(err => {})
                                       msg.delete().catch(err => {})
                                      message.channel.send(`${cevaplar.prefix} **${botClient.user.tag}**, Başarısız! profil resmi güncelleyebilmem için biraz beklemem gerek!`).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 7500);
                                   })
                                  })
                            });
                            
                            col.on('end', collected => {
                                msg.delete().catch(err => {});
                            });
                        }
                        if(i.customId == "selectName") {
                            msg.edit({embeds: [new EmbedBuilder().setColor("DARK_GOLD").setDescription(`${message.guild.emojiGöster(emojiler.Icon)} ${botClient.user} isimli botun yeni ismini belirtin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`60 Saniye\`)`)],components: []})
                            var isimfilter = m => m.author.id == message.member.id
                            let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})

                            col.on('collect', async (m) => {
                                if (m.content == ("iptal" || "i")) {
                                    msg.delete().catch(err => {});
                                    message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
                                    await i.reply({content: `${cevaplar.prefix} İsim değiştirme işlemi iptal edildi.`, ephemeral: true})
                                    return;
                                  };
                                  let eskinick = botClient.user.username
                                  let bekle = await message.reply(`Güncelleniyor....`)
                                  let isim = m.content
                                  botClient.user.setUsername(isim).then(x => {
                                      bekle.delete().catch(err => {})
                                      msg.delete().catch(err => {})
                                      let logChannel = message.guild.kanalBul("guild-log")
                                      if(logChannel) logChannel.send({embeds: [new EmbedBuilder().setFooter({text:`${tarihsel(Date.now())} tarihinde işleme koyuldu.`}).setDescription(`${message.member} tarafından ${botClient.user} isimli botun ismi değiştirildi.\n**${eskinick}** isimli botun ismi **${botClient.user.username}** olarak güncellendi.`)]})
                                      message.channel.send({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla! **${eskinick}** isimli botun ismi **${botClient.user.username}** olarak değiştirildi.`)]}).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 30000);
                                   })
                                  }).catch(err => {
                                       bekle.delete().catch(err => {})
                                       msg.delete().catch(err => {})
                                      message.channel.send(`${cevaplar.prefix} **${botClient.user.tag}**, Başarısız! isim değiştirebilmem için biraz beklemem gerek!`).then(x => {
                                       message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
                                       setTimeout(() => {
                                           x.delete().catch(err => {})
                                       }, 7500);
                                   })
                                  })
                            });
                            
                            col.on('end', collected => {
                                msg.delete().catch(err => {});
                            });
                        }
                    })
                })
   
        }
    })

    collector.on("end", async () => {
        msg.delete().catch(err => {})
    })
    }
  };