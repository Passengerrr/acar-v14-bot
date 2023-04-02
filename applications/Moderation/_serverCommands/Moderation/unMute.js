const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Mute = require('../../../../database/Schemas/Punitives.Mutes');
const voiceMute = require('../../../../database/Schemas/Punitives.Vmutes');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
module.exports = {
    Isim: "unmute",
    Komut: ["unchatmute", "susturmakaldır"],
    Kullanim: "unmute <#No/@cartel/ID>",
    Aciklama: "Belirlenen üyenin metin kanallarındaki susturmasını kaldırır.",
    Kategori: "yetkili",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    if(!roller.muteHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.voiceMuteHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(Number(args[0])) {
        let cezanobul = await Mute.findOne({No: args[0]}) || await voiceMute.findOne({No: args[0]})
        if(cezanobul) args[0] = cezanobul._id
    }
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(cartelcim.user.bot) return message.reply(cevaplar.bot).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.author.id === cartelcim.id) return message.reply(cevaplar.kendi).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!cartelcim.manageable) return message.reply(cevaplar.dokunulmaz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.reply(cevaplar.yetkiust).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let cezakontrol = await Mute.findById(cartelcim.id) || await voiceMute.findById(cartelcim.id)
    if(!cezakontrol) {
        message.reply(cevaplar.cezayok).catch(err => {});
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
        return;
    }; 

    const chatmute = await Punitives.findOne({ Member: cartelcim.id, Active: true, Type: "Metin Susturulma" })
    const sesmute = await Punitives.findOne({ Member: cartelcim.id, Active: true, Type: "Ses Susturulma" })

        let Row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("metin")
                .setLabel(`${roller.muteHammer.some(oku => message.member.roles.cache.has(oku)) || roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  || message.member.permissions.has('ADMINISTRATOR') ? `Metin Kanallarında` : `Metin Kanallarında (Yetkin Yok)`}`)
                .setStyle(chatmute ? ButtonStyle.Success : ButtonStyle.Secondary)
                .setDisabled(roller.muteHammer.some(oku => message.member.roles.cache.has(oku)) || roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  || message.member.permissions.has('ADMINISTRATOR') ? await Mute.findById(cartelcim.id) ? false : true : true),
            new ButtonBuilder()
                .setCustomId("ses")
                .setLabel(`${roller.voiceMuteHammer.some(oku => message.member.roles.cache.has(oku)) || roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  || message.member.permissions.has('ADMINISTRATOR') ? `Ses Kanallarında` : `Ses Kanallarında (Yetkin Yok)`}`)
                .setStyle(sesmute ? ButtonStyle.Success : ButtonStyle.Secondary)
                .setDisabled(roller.voiceMuteHammer.some(oku => message.member.roles.cache.has(oku)) || roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) || roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  || message.member.permissions.has('ADMINISTRATOR') ? await voiceMute.findById(cartelcim.id) ? false : true : true),        
            new ButtonBuilder()
                .setCustomId(`iptal`)
                .setLabel('İşlemi İptal Et')
                .setEmoji(message.guild.emojiGöster(emojiler.no_cartel))
                .setStyle(ButtonStyle.Danger)
        )
        let açıklama = ``
        if(chatmute) açıklama = `metin kanallarında **\`#${chatmute.No}\`** ceza numaralı susturulmasını`
        if(sesmute) açıklama = `ses kanallarında ki **\`#${sesmute.No}\`** ceza numaralı susturulmasını`
        if(chatmute && sesmute) açıklama = `**\`#${chatmute.No}\`**, **\`#${sesmute.No}\`** ceza numaralarına sahip metin ve ses susturulmasını`
        message.reply({components: [Row], embeds: [new EmbedBuilder().setAuthor({name: message.member.user.tag, iconURL:Nmessage.member.user.displayAvatarURL({dynamic: true})})
            .setDescription(`**Merhaba!** ${message.author.tag} 
Belirtilen ${cartelcim} üyesinin ${açıklama} kaldırmak için aşağıda ki düğmeleri kullanabilirsiniz.`)
            ]}).then(async (msg) => {
                var filter = (i) => i.user.id == message.member.id
                let collector = msg.createMessageComponentCollector({filter: filter, time: 30000})
                collector.on('collect', async (i) => {
                    if(i.customId == "metin") {
                        
                        if(!roller.muteHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({content: `Belirtilen ${cartelcim} isimli üyenin metin kanallarında ki susturmasını kaldırmak için yetkiniz yok. ${cevaplar.prefix}`}).then(x => {
                            message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
                            setTimeout(() => {
                                x.delete()
                            }, 7500);
                        });
                        if(chatmute && chatmute.Staff !== message.author.id && message.guild.members.cache.get(chatmute.Staff) && !message.member.permissions.has("ADMINISTRATOR") && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) 
                        return i.deferUpdate().catch(err => {}),msg.delete().catch(err => {}),message.reply({embeds: [new EmbedBuilder().setDescription(`${cevaplar.prefix} Bu ceza ${chatmute.Staff ? message.guild.members.cache.get(chatmute.Staff) ? `${message.guild.members.cache.get(chatmute.Staff)} (\`${chatmute.Staff}\`)` : `${chatmute.Staff}` :  `${chatmute.Staff}`} Tarafından cezalandırılmış. **Bu Cezayı Açman Münkün Değil!**`).setFooter({text:"Yaptırım yapılan cezada yaptırımı yapan yetkili işlem uygulayabilir."})]}).then(x => {
                            message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
                            setTimeout(() => {
                                x.delete()
                            }, 7500);
                        });
                        await Punitives.updateOne({ No: chatmute.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
                        if(await Mute.findById(cartelcim.id)) {
                            await Mute.findByIdAndDelete(cartelcim.id)
                        }
                        if(cartelcim && cartelcim.manageable) await cartelcim.roles.remove(roller.muteRolü).catch(x => client.logger.log("Chatmute rolü geri alınamadı lütfen Rol ID'sini kontrol et.", "caution"));;
                        
                        let findChannel = message.guild.kanalBul("mute-log")
                        if(findChannel) findChannel.send({embeds: [new EmbedBuilder().setDescription(`${cartelcim} kullanıcısının \`#${chatmute.No}\` numaralı susturulması, <t:${String(Date.now()).slice(0, 10)}:R> ${message.member} tarafından kaldırıldı.`)]})
                      
                        await i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} üyesinin (\`#${chatmute.No}\`) ceza numaralı metin kanallarındaki susturulması kaldırıldı!`, ephemeral: true})
                        if(cartelcim) cartelcim.send({content: `Sunucumuz da \`${message.author.tag}\` tarafından **\`#${chatmute.No}\`** numaralı metin kanallarında susturulma cezanız <t:${String(Date.now()).slice(0,10)}:R> kaldırıldı. Eğer ki ceza geçmişiniz hakkında bir itirazınız var ise üst yetkililerimize ulaşmaktan çekinme.`}).catch(x => {
                    
                        });
                        message.member.Leaders("ceza", 5, {type: "CEZA", user: cartelcim.id})
                        message.member.Leaders("sorun", 5, {type: "CEZA", user: cartelcim.id})
                        message.member.Leaders("criminal", 5, {type: "CEZA", user: cartelcim.id})
                        message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
                        msg.delete().catch(err => {})
        
                    }
                    if(i.customId == "ses") {
                        if(!roller.voiceMuteHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  && !message.member.permissions.has('ADMINISTRATOR')) return message.reply({content: `Belirtilen ${cartelcim} isimli üyenin metin kanallarında ki susturmasını kaldırmak için yetkiniz yok. ${cevaplar.prefix}`}).then(x => {
                            message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
                            setTimeout(() => {
                                x.delete()
                            }, 7500);
                        });
                        if(sesmute && sesmute.Staff !== message.author.id && message.guild.members.cache.get(sesmute.Staff) && !message.member.permissions.has("ADMINISTRATOR") && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(x => message.member.roles.cache.has(x))) 
                        return i.deferUpdate().catch(err => {}),msg.delete().catch(err => {}),message.reply({embeds: [new EmbedBuilder().setDescription(`${cevaplar.prefix} Bu ceza ${sesmute.Staff ? message.guild.members.cache.get(sesmute.Staff) ? `${message.guild.members.cache.get(sesmute.Staff)} (\`${sesmute.Staff}\`)` : `${sesmute.Staff}` :  `${sesmute.Staff}`} Tarafından cezalandırılmış. **Bu Cezayı Açman Münkün Değil!**`).setFooter({text:"yaptırım yapılan cezada yaptırımı yapan yetkili işlem uygulayabilir."})]}).then(x => {
                            message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
                            setTimeout(() => {
                                x.delete()
                            }, 7500);
                        });
                        await Punitives.updateOne({ No: sesmute.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
                        if(await voiceMute.findById(cartelcim.id)) {
                            await voiceMute.findByIdAndDelete(cartelcim.id)
                        }
                        if(cartelcim && cartelcim.voice.channel) await cartelcim.voice.setMute(false);
                        let findChannel = message.guild.kanalBul("sesmute-log")
                        if(findChannel) findChannel.send({embeds: [new EmbedBuilder().setDescription(`${cartelcim} kullanıcısının \`#${sesmute.No}\` numaralı seste susturulması, <t:${String(Date.now()).slice(0, 10)}:R> ${message.member} tarafından kaldırıldı.`)]})
                        
                        await i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} üyesinin (\`#${sesmute.No}\`) ceza numaralı ses kanallarındaki susturulması kaldırıldı!`, ephemeral: true})
                        if(cartelcim) cartelcim.send({content: `Sunucumuz da \`${message.author.tag}\` tarafından **\`#${sesmute.No}\`** numaralı seste susturulma cezanız <t:${String(Date.now()).slice(0,10)}:R> kaldırıldı. Eğer ki ceza geçmişiniz hakkında bir itirazınız var ise üst yetkililerimize ulaşmaktan çekinme.`}).catch(x => {
                           
                        });
                        message.member.Leaders("ceza", 5, {type: "CEZA", user: cartelcim.id})
                        message.member.Leaders("sorun", 5, {type: "CEZA", user: cartelcim.id})
                        message.member.Leaders("criminal", 5, {type: "CEZA", user: cartelcim.id})
                        message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
                        msg.delete().catch(err => {})
                    }
                    if (i.customId === `iptal`) {
                        msg.delete().catch(err => {})
                        return await i.reply({ content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla mute işlemleri menüsü kapatıldı.`, components: [], embeds: [], ephemeral: true });
                    }
                })

                collector.on('end', async (collected, reason) => {
                    if(reason == "time") {
                        msg.delete().catch(err => {});
                        return;
                    }
                })

        });
    }
};