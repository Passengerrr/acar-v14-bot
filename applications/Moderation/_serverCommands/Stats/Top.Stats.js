const { Client, Message, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
module.exports = {
    Isim: "top",
    Komut: ["topmesaj","topstat","topses"],
    Kullanim: "top",
    Aciklama: "Belirlenen üye veya kullanan üye eğer ki yetkiliyse onun yetki atlama bilgilerini gösterir.",
    Kategori: "stat",
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
     const embed = new EmbedBuilder()
     let load = await message.reply({content: `${message.guild.name} sunucusuna ait veri sıralaması yükleniyor. Lütfen bekleyin!`})

    let data = await Stats.find({guildID: message.guild.id})
       
        data = data.filter(m => message.guild.members.cache.has(m.userID));
        let genelsesbirinci;
        let publicbirinci;
        let mesajbirinci;
        let streamerbirinci;
        let registerbirinci;
        genelPublic = ``
        let PublicListele = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) cartelcim2Toplam += x
            });
            let cartelcim1Toplam = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach((x, key) => {
                if(key == kanallar.publicKategorisi) cartelcim1Toplam += x
            });
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(index == 0) publicbirinci = `<@${m.userID}>`
            m.voiceStats.forEach((x, key) => { if(key == kanallar.publicKategorisi) cartelcimToplam += x });


            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelPublic = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` **(Siz)**`
            }

            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');
        genelStreamer = ``
        let streamerListele = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach((x, key) => {
                if(key == kanallar.streamerKategorisi) cartelcim2Toplam += x
            });
            let cartelcim1Toplam = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach((x, key) => {
                if(key == kanallar.streamerKategorisi) cartelcim1Toplam += x
            });
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(index == 0) streamerbirinci = `<@${m.userID}>`
            m.voiceStats.forEach((x, key) => { if(key == kanallar.streamerKategorisi) cartelcimToplam += x });
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelStreamer = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` **(Siz)**`
            }

            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');

        genelRegister = ``
        let registerListele = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach((x, key) => {
                if(key == kanallar.registerKategorisi) cartelcim2Toplam += x
            });
            let cartelcim1Toplam = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach((x, key) => {
                if(key == kanallar.registerKategorisi) cartelcim1Toplam += x
            });
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(index == 0) registerbirinci = `<@${m.userID}>`
            
            m.voiceStats.forEach((x, key) => { if(key == kanallar.registerKategorisi) cartelcimToplam += x });
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelRegister = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` **(Siz)**`
            }
            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');

       let genelSes = ``;
       let sesSıralaması = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam2 = 0;
            if(cartelcim2.voiceStats) cartelcim2.voiceStats.forEach(x => cartelcim2Toplam2 += x);
            let cartelcim1Toplam2 = 0;
            if(cartelcim1.voiceStats) cartelcim1.voiceStats.forEach(x => cartelcim1Toplam2 += x);
            return cartelcim2Toplam2-cartelcim1Toplam2;
        }).map((m, index) => {
            let cartelcimToplam2 = 0;
            if(index == 0) genelsesbirinci = `<@${m.userID}>`
            if(m.voiceStats) m.voiceStats.forEach(x => cartelcimToplam2 += x);
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelSes = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` **(Siz)**`
            }
            return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');
        let genelMesaj = ``
        let mesajSıralaması = data.sort((cartelcim1, cartelcim2) => {
            let cartelcim2Toplam = 0;
            if(cartelcim2.chatStats) cartelcim2.chatStats.forEach(x => cartelcim2Toplam += x);
            let cartelcim1Toplam = 0;
            if(cartelcim1.chatStats) cartelcim1.chatStats.forEach(x => cartelcim1Toplam += x);
            return cartelcim2Toplam-cartelcim1Toplam;
        }).map((m, index) => {
            let cartelcimToplam = 0;
            if(m.chatStats) m.chatStats.forEach(x => cartelcimToplam += x);
            if(index == 0) mesajbirinci = `<@${m.userID}>`
            if(m.userID === message.member.id) {
                if((index + 1) > 20) genelMesaj = `\`${index + 1}.\` <@${m.userID}> \`${cartelcimToplam} mesaj\` **(Siz)**`
            }
            return `\`${index + 1}.\` <@${m.userID}> \`${Number(cartelcimToplam)} mesaj\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
        }).slice(0, 20).join('\n');


        let genelseseniyi
        let genelToplamSes = ``;
        let genelsesSıralaması = data.sort((cartelcim1, cartelcim2) => {
             let cartelcim2Toplam2 = 0;
             if(cartelcim2.lifeVoiceStats) cartelcim2.lifeVoiceStats.forEach(x => cartelcim2Toplam2 += x);
             let cartelcim1Toplam2 = 0;
             if(cartelcim1.lifeVoiceStats) cartelcim1.lifeVoiceStats.forEach(x => cartelcim1Toplam2 += x);
             return cartelcim2Toplam2-cartelcim1Toplam2;
         }).map((m, index) => {
             let cartelcimToplam2 = 0;
             if(index == 0) genelseseniyi = `<@${m.userID}>`
             if(m.lifeVoiceStats) m.lifeVoiceStats.forEach(x => cartelcimToplam2 += x);
             if(m.userID === message.member.id) {
                if((index + 1) > 20) genelToplamSes = `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` **(Siz)**`
            }
             return `\`${index + 1}.\` <@${m.userID}> \`${client.sureCevir(cartelcimToplam2)}\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
         }).slice(0, 20).join('\n');
         let genelmesajbirinci
         let genelToplamMesaj = ``
         let genelmesajSıralaması = data.sort((cartelcim1, cartelcim2) => {
             let cartelcim2Toplam = 0;
             if(cartelcim2.lifeChatStats) cartelcim2.lifeChatStats.forEach(x => cartelcim2Toplam += x);
             let cartelcim1Toplam = 0;
             if(cartelcim1.lifeChatStats) cartelcim1.lifeChatStats.forEach(x => cartelcim1Toplam += x);
             return cartelcim2Toplam-cartelcim1Toplam;
         }).map((m, index) => {
             let cartelcimToplam = 0;
             if(m.lifeChatStats) m.lifeChatStats.forEach(x => cartelcimToplam += x);
             if(index == 0) genelmesajbirinci = `<@${m.userID}>`
             if(m.userID === message.member.id) {
                if((index + 1) > 20) genelToplamMesaj = `\`${index + 1}.\` <@${m.userID}> \`${cartelcimToplam} mesaj\` **(Siz)**`
            }
             return `\`${index + 1}.\` <@${m.userID}> \`${Number(cartelcimToplam)} mesaj\` ${m.userID == message.member.id ? `**(Siz)**` : ``}`;
         }).slice(0, 20).join('\n');


        embed.setColor("Random").setThumbnail(message.guild.iconURL({dynamic: true}))
        let opt = [
                {label: "Tüm Zamanların En İyileri",emoji: "1075747163302285413", description: "Tüm zamanların en iyi istatistiğine sahip üyeleri", value: "geneleniyi"},
                {label: "Bu Haftanın En İyileri", emoji: "1075747163302285413", description: "Bu haftanın en iyi istatistiğine sahip üyeleri", value: "evamk"},
                {label: "Genel Ses Sıralaması", emoji: "1075747163302285413", description:  "Tüm zamanların 20 genel ses sıralaması", value: "genelcik"},
                {label: "Haftalık Ses Sıralaması", emoji: "1075747163302285413", description: "Bu haftanın 20 ses sıralaması", value: "geneltop"},
                {label: "Haftalık Public Sıralaması",emoji: "1075747163302285413", description: "Bu haftanın 20 public odaları sıralaması", value: "orospuçocukları"},
                {label: "Haftalık Teyit Sıralaması",emoji: "1075747163302285413", description: "Bu haftanın 20 teyit odaları sıralaması", value: "teyitcioç"},
                {label: "Haftalık Streamer Sıralaması",emoji: "1075747163302285413", description:  "Bu haftanın 20 streamer odaları sıralaması", value: "kamerayıgötünesokuyum"},
                {label: "Genel Yayın Sıralaması",emoji: "1075747163302285413", description: "En çok 20 yayın açanların sıralaması", value: "yayınaçıyorlaramk"},
                {label: "Genel Mesaj Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların 20 genel mesaj sıralaması", value: "genelcikcik"},
                {label: "Haftalık Mesaj Sıralaması",emoji: "1075747163302285413", description: "Bu haftanın 20 mesaj sıralaması", value: "amınakodumunmesajı"},
                {label: "Genel Yetkili Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların yetkili sıralaması", value: "yetkili"},
                {label: "Genel Zengin Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların zengin sıralaması", value: "zengin"},
                {label: "Genel Görev Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların görev sıralaması", value: "görev"},
                {label: "Genel Davet Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların davet sıralaması", value: "davet"},
                {label: "Genel Kayıt Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların kayıt sıralaması", value: "kayıt"},
        ]
        if(ayarlar.type) opt.push({label: "Genel Taglı Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların taglı sıralaması", value: "taglı"})
        if(ayarlar.seviyeSistemi) opt.push({label: "Genel Seviye Sıralaması",emoji: "1075747163302285413", description: "Tüm zamanların seviye sıralaması", value: "seviye"})
        opt.push({label: "Genel Takipçi Sıralaması" ,emoji: "1075747163302285413", description:  "Tüm zamanların en fazla takipçisine sahip üyeler", value: "takipçiler"})
        let listele = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("cartel_topcuk")
            .setPlaceholder("🎄 Sıralamayı Seçin")
            .setOptions(opt)
        )
    

        load.edit({content: null, embeds: [new EmbedBuilder().setDescription(`Aşağıda ki menüden **${ayarlar.serverName}** sunucusunun, tüm zamanlar veya haftalık istatistik verilerinin sıralamasını listeleyebilirsiniz.`)], components: [listele]}).then(async (msg) => {
            const filter = i => i.user.id === message.member.id && i.customId == "cartel_topcuk";
            const collector = await msg.createMessageComponentCollector({ filter, time: 120000 });
  
            collector.on('collect', async (i) => {
                if(i.values[0] == "seviye") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "toplevel")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "takipçiler") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "toptakipçi")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "yayınaçıyorlaramk") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "topstreaming")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "yetkili") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "topyetkili")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "zengin") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "zenginler")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "görev") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "topgörev")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "davet") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "topdavet")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "taglı") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "toptaglı")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "kayıt") {
                    msg.delete().catch(err => {})
                    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    let kom = client.commands.find(x => x.Isim == "topteyit")
                    kom.onRequest(client, message, args)
                    i.deferUpdate().catch(err => {});
                }
                if(i.values[0] == "geneleniyi") await msg.edit({content: null,embeds: [embed.setColor("Random").setDescription(`:tada: Aşağı da **${message.guild.name}** sunucusunun tüm zamanların en iyileri sıralanmaktadır.

\` 👑 En İyi Ses \` ${genelseseniyi.id == message.member.id ? genelseseniyi + " **(Siz)**" : genelseseniyi}
\` 👑 En İyi Mesaj \` ${genelmesajbirinci.id == message.member.id ? genelmesajbirinci + " **(Siz)**" : genelmesajbirinci}
                        
tüm zamanların iyileri \`${tarihsel(Date.now())}\` tarihinde otomatik olarak güncellenmiştir.`)], components: [listele]}),i.deferUpdate().catch(err => {});
if(i.values[0] == "genelcik") await msg.edit({content: null, embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.voiceDeaf)} Aşağı da **${message.guild.name}** sunucusunun genel ses sıralaması (**Tüm zamanlar**) listelenmektedir.
        
${genelsesSıralaması ? genelsesSıralaması + `\n${genelToplamSes ? genelToplamSes : ``}` : "`Bu sunucuda genel ses aktifliği bulunamadı."}`)
                ], components: [listele]}),i.deferUpdate().catch(err => {});
                if(i.values[0] == "genelcikcik")  await msg.edit({content: null,embeds: [ embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.chatMuteKaldırıldı)} Aşağı da **${message.guild.name}** sunucusunun tüm zamanların sohbet(\` mesaj \`) sıralaması listelenmektedir.
        
${genelmesajSıralaması ? genelmesajSıralaması + `\n${genelToplamMesaj ? genelToplamMesaj : ``}` : "`Bu sunucuda mesaj aktifliği bulunamadı."}
                                `)], components: [listele]}),i.deferUpdate().catch(err => {});
                if(i.values[0] == "evamk") await msg.edit({content: null,embeds: [embed.setColor("Random").setDescription(`:tada: Aşağı da **${message.guild.name}** sunucusunun bu haftanın en iyileri sıralanmaktadır.

\` 👑 Public Odalar \` ${publicbirinci.id == message.member.id ? publicbirinci + " **(Siz)**" : publicbirinci}
\` 👑 Teyit Odalar \` ${registerbirinci.id == message.member.id ? registerbirinci + " **(Siz)**" : registerbirinci}
\` 👑 Streamer Odalar \` ${streamerbirinci.id == message.member.id ? streamerbirinci + " **(Siz)**" : streamerbirinci}
\` 👑 Haftalık Ses Sıralama \` ${genelsesbirinci.id == message.member.id ? genelsesbirinci + " **(Siz)**" : genelsesbirinci}
\` 👑 Haftalık Mesaj Sıralaması \` ${mesajbirinci.id == message.member.id ? mesajbirinci + " **(Siz)**" : mesajbirinci}
        
bu haftanın en iyileri \`${tarihsel(Date.now())}\` tarihinde otomatik olarak güncellenmiştir.
        `)], components: [listele]}),i.deferUpdate().catch(err => {});
                if(i.values[0] == "geneltop") await msg.edit({content: null, embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.voiceDeaf)} Aşağı da **${message.guild.name}** sunucusunun bu haftanın ses sıralaması listelenmektedir.
        
${sesSıralaması ? sesSıralaması + `\n${genelSes ? genelSes : ``}` : "`Bu sunucuda genel ses aktifliği bulunamadı."}`)
                ], components: [listele]}),i.deferUpdate().catch(err => {});
                if(i.values[0] == "orospuçocukları")  await msg.edit({content: null,embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.voiceDeaf)} Aşağı da **${message.guild.name}** sunucusunun bu haftanın ${message.guild.channels.cache.get(kanallar.publicKategorisi) ? `${message.guild.channels.cache.get(kanallar.publicKategorisi)} ses kategori` : "public ses"} sıralaması listelenmektedir.
        
${PublicListele ? PublicListele + `\n${genelPublic ? genelPublic : ``}` : "`Bu sunucuda public ses aktifliği bulunamadı."}
                `)], components: [listele]}),i.deferUpdate().catch(err => {});

                if(i.values[0] == "teyitcioç")  await msg.edit({content: null,embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.voiceDeaf)} Aşağı da **${message.guild.name}** sunucusunun bu haftanın ${message.guild.channels.cache.get(kanallar.registerKategorisi) ? `${message.guild.channels.cache.get(kanallar.registerKategorisi)} ses kategori` : "teyit ses"} sıralaması listelenmektedir.
        
${registerListele ? registerListele + `\n${genelRegister ? genelRegister : ``}` : "`Bu sunucuda teyit ses aktifliği bulunamadı."}
                `)], components: [listele]}),i.deferUpdate().catch(err => {});

                if(i.values[0] == "kamerayıgötünesokuyum")  await msg.edit({content: null,embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.sesMuteKaldırıldı)} Aşağı da **${message.guild.name}** sunucusunun bu haftanın ${message.guild.channels.cache.get(kanallar.streamerKategorisi) ? `${message.guild.channels.cache.get(kanallar.streamerKategorisi)} ses kategori` : "streamer ses"} sıralaması listelenmektedir.
        
${streamerListele ? streamerListele + `\n${genelStreamer ? genelStreamer : ``}` : "`Bu sunucuda streamer ses aktifliği bulunamadı."}
                `)], components: [listele]}),i.deferUpdate().catch(err => {});
                if(i.values[0] == "amınakodumunmesajı")  await msg.edit({content: null,embeds: [ embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.chatMuteKaldırıldı)} Aşağı da **${message.guild.name}** sunucusunun bu haftanın sohbet(\` mesaj \`) sıralaması listelenmektedir.
        
${mesajSıralaması ? mesajSıralaması + `\n${genelMesaj ? genelMesaj : ``}` : "`Bu sunucuda mesaj aktifliği bulunamadı."}
                `)], components: [listele]}),i.deferUpdate().catch(err => {});
           })
           collector.on('end', i => {
               msg.delete().catch(err => {})
           })
        })           
  }
};