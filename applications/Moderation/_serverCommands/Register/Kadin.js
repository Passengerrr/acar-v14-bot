const { Client, Message, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const Users = require('../../../../database/Schemas/Client.Users');
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const {cartelEmbed} = require('../../../../base/Reference/Embed');
module.exports = {
    Isim: "k",
    Komut: ["kadin","kadın", "ka","kayıt","kayit"],
    Kullanim: "kadın @cartel/ID <isim/nick>",
    Aciklama: "Belirtilen üye sunucuda kayıtsız bir üye ise kayıt etmek için kullanılır.",
    Kategori: "teyit",
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
    if(ayarlar.dugmeliKayit) {
        let regPanelEmbed = new EmbedBuilder();
        let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!roller.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        let uyarısıVar = await Punitives.findOne({Member: cartelcim.id, Type: "Uyarılma"})
        if(message.author.id === cartelcim.id) return message.reply(cevaplar.kendi).then(x => { setTimeout(() => {x.delete()}, 5000)})
        if(cartelcim.user.bot) return message.reply(cevaplar.bot).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        if(!cartelcim.manageable) return message.reply(cevaplar.dokunulmaz).then(x => { setTimeout(() => {x.delete().catch(err => {})}, 5000)})
        if(roller.erkekRolleri.some(x => cartelcim.roles.cache.has(x))) return message.reply(cevaplar.kayıtlı).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        if(roller.kadınRolleri.some(x => cartelcim.roles.cache.has(x))) return message.reply(cevaplar.kayıtlı).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.reply(cevaplar.yetkiust).then(x => { setTimeout(() => {x.delete().catch(err => {})}, 5000)})
        if(ayarlar.taglıalım && ayarlar.taglıalım != false && !cartelcim.user.username.includes(ayarlar.tag) && !cartelcim.roles.cache.has(roller.boosterRolü) && !cartelcim.roles.cache.has(roller.vipRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.taglıalım).then(x => { setTimeout(() => {x.delete().catch(err => {})}, 5000)})
        if(ayarlar.teyitZorunlu && !cartelcim.voice.channel  && !cartelcim.roles.cache.has(roller.boosterRolü) && !cartelcim.roles.cache.has(roller.vipRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.no_cartel)} **${ayarlar.serverName}** sunucusunda **Ses Teyit** zorunluluğu bulunduğundan dolayı ${cartelcim} isimli üyenin kayıt işlemi \`${tarihsel(Date.now())}\` tarihinde iptal edildi.`)]}).then(x => {
            message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
            setTimeout(() => {
                x.delete().catch(err => {})
            }, 15000);
        })
        if(Date.now()-cartelcim.user.createdTimestamp < 1000*60*60*24*7 && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.yenihesap).then(x => { setTimeout(() => {x.delete()}, 5000)})
        if(cartelcim.roles.cache.has(roller.şüpheliRolü) && cartelcim.roles.cache.has(roller.jailRolü) && cartelcim.roles.cache.has(roller.underworldRolü) &&  cartelcim.roles.cache.has(roller.yasaklıTagRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.cezaliüye).then(x => x.delete({timeout: 5000}))   
        args = args.filter(a => a !== "" && a !== " ").splice(1);
        let setName;
        let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
        if(!isim) return message.reply(cevaplar.argümandoldur).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
        if(ayarlar.isimyas && !yaş) return message.reply(cevaplar.argümandoldur).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        if (ayarlar.isimyas && yaş < ayarlar.minYaş) return message.reply(cevaplar.yetersizyaş).then(x => { setTimeout(() => {x.delete()}, 5000)})
        if(ayarlar.isimyas) {
                setName = `${isim} | ${yaş}`;
        } else {
                setName = `${isim}`;
        }
        let cezaPuanı = await cartelcim.cezaPuan()
        if(cezaPuanı >= 100 && !message.member.permissions.has('ADMINISTRATOR') && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription(`Belirlenen ${cartelcim} isimli üyenin ceza puanı 100'ün üzerinde olduğu için kayıt işlemi alınamıyor. 
    Bir itirazınız var ise ${roller.sorunÇözmeciler ? roller.sorunÇözmeciler.filter(x => message.guild.roles.cache.has(x)).map(x => message.guild.roles.cache.get(x)).join(", ") : roller.altYönetimRolleri.filter(x => message.guild.roles.cache.has(x)).map(x => message.guild.roles.cache.get(x)).join(", ")} rolü ve üstündeki rollerden herhangi bir yetkiliye ulaşınız ve durumu onlara da anlatınız.`)
            ]
        }).then(x => { 
            message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
            setTimeout(() => {
                x.delete().catch(err => {})
            }, 15000)
        })
        if(uyarısıVar) {
            regPanelembed.setColor("Random").setDescription(`${cartelcim} (\`${setName}\`) isimli üyenin, birden fazla cezası veya uyarısı bulunmakta kontrol ediniz ve daha sonra kayıt işlemini tamamlanabilmesi için, lütfen aşağıda ki düğmelerden cinsiyetini seçiniz.
            
    Bu kayıt işlemine \`30 Saniye\` içerisinde tepki vermezseniz, işlem otomatik olarak iptal edilir.`)
        } else {
            regPanelembed.setColor("Random").setDescription(`${cartelcim} (\`${setName}\`) isimli üyenin kayıt işlemini tamamlanabilmesi için, lütfen aşağıda ki düğmelerden cinsiyetini seçiniz.
            
    Bu kayıt işlemine \`30 Saniye\` içerisinde tepki vermezseniz, işlem otomatik olarak iptal edilir.`)
        }
        const genderSelect = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('erkekyaxd')
                        .setLabel('Erkek')
                        .setStyle(ButtonStyle.Secondary),
              
                    new ButtonBuilder()
                        .setCustomId('lesbienaq')
                        .setLabel('Kadın')
                        .setStyle(ButtonStyle.Secondary),
             
                    new ButtonBuilder()
                        .setCustomId('iptal')
                        .setLabel('İptal')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji(message.guild.emojiGöster(emojiler.no_cartel))
                );
                const filter = i => i.user.id === message.member.id;
                let regPanel = await message.reply({embeds: [regPanelEmbed], components: [genderSelect], ephemeral: true} )
                const collector = regPanel.createMessageComponentCollector({ filter, time: 15000 });
    
    collector.on('collect', async i => {
        if (i.customId === 'erkekyaxd') {
            await regPanel.edit({ embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} isimli üye **Erkek** olarak kayıt edildi.`)], components: [] }).then(x => {
                setTimeout(() => {
                    x.delete()
                }, 10000);
            })
            cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ``}${setName}`).catch(err => message.reply(cevaplar.isimapi));
            cartelcim.Register(`${setName}`, "Erkek", message.member);
            client.Upstaffs.addPoint(message.member.id,_statSystem.points.record, "Kayıt")
            message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
        }
        if (i.customId === 'lesbienaq') {
            await regPanel.edit({ embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} isimli üye **Kadın** olarak kayıt edildi.`)], components: [] }).then(x => {
                setTimeout(() => {
                    x.delete()
                }, 10000);
            })
            cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ``}${setName}`).catch(err => message.reply(cevaplar.isimapi));
            cartelcim.Register(`${setName}`, "Kadın", message.member);
            client.Upstaffs.addPoint(message.member.id,_statSystem.points.record, "Kayıt")
            message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
        }
        if (i.customId === 'iptal') {
            await i.deferUpdate();
            regPanel.delete().catch(err => {})
            message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
            
        }
    });
    collector.on('end', collected => {});
        return;
    }
    let regPanelEmbed = new EmbedBuilder();
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!roller.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let uyarısıVar = await Punitives.findOne({Member: cartelcim.id, Type: "Uyarılma"})
    if(message.author.id === cartelcim.id) return message.reply(cevaplar.kendi).then(x => { setTimeout(() => {x.delete()}, 5000)})
    if(cartelcim.user.bot) return message.reply(cevaplar.bot).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!cartelcim.manageable) return message.reply(cevaplar.dokunulmaz).then(x => { setTimeout(() => {x.delete().catch(err => {})}, 5000)})
    if(roller.erkekRolleri.some(x => cartelcim.roles.cache.has(x))) return message.reply(cevaplar.kayıtlı).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(roller.kadınRolleri.some(x => cartelcim.roles.cache.has(x))) return message.reply(cevaplar.kayıtlı).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.reply(cevaplar.yetkiust).then(x => { setTimeout(() => {x.delete().catch(err => {})}, 5000)})
    if(ayarlar.taglıalım && ayarlar.taglıalım != false && !cartelcim.user.username.includes(ayarlar.tag) && !cartelcim.roles.cache.has(roller.boosterRolü) && !cartelcim.roles.cache.has(roller.vipRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.taglıalım).then(x => { setTimeout(() => {x.delete().catch(err => {})}, 5000)})
    if(ayarlar.teyitZorunlu && !cartelcim.voice.channel  && !cartelcim.roles.cache.has(roller.boosterRolü) && !cartelcim.roles.cache.has(roller.vipRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.no_cartel)} **${ayarlar.serverName}** sunucusunda **Ses Teyit** zorunluluğu bulunduğundan dolayı ${cartelcim} isimli üyenin kayıt işlemi \`${tarihsel(Date.now())}\` tarihinde iptal edildi.`)]}).then(x => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
        setTimeout(() => {
            x.delete().catch(err => {})
        }, 15000);
    })
    if(Date.now()-cartelcim.user.createdTimestamp < 1000*60*60*24*7 && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.yenihesap).then(x => { setTimeout(() => {x.delete()}, 5000)})
    if(cartelcim.roles.cache.has(roller.şüpheliRolü) && cartelcim.roles.cache.has(roller.jailRolü) && cartelcim.roles.cache.has(roller.underworldRolü) &&  cartelcim.roles.cache.has(roller.yasaklıTagRolü) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.cezaliüye).then(x => x.delete({timeout: 5000}))   
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let setName;
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    if(!isim) return message.reply(cevaplar.argümandoldur).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(ayarlar.isimyas && !yaş) return message.reply(cevaplar.argümandoldur).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if (ayarlar.isimyas && yaş < ayarlar.minYaş) return message.reply(cevaplar.yetersizyaş).then(x => { setTimeout(() => {x.delete()}, 5000)})
    if(ayarlar.isimyas) {
            setName = `${isim} | ${yaş}`;
    } else {
            setName = `${isim}`;
    }
    let cezaPuanı = await cartelcim.cezaPuan()
    if(cezaPuanı >= 100 && !message.member.permissions.has('ADMINISTRATOR') && (roller.sorunÇözmeciler && !roller.sorunÇözmeciler.some(x => message.member.roles.cache.has(x))) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply({
        embeds: [
            new EmbedBuilder()
            .setDescription(`Belirlenen ${cartelcim} isimli üyenin ceza puanı 100'ün üzerinde olduğu için kayıt işlemi alınamıyor. 
Bir itirazınız var ise ${roller.sorunÇözmeciler ? roller.sorunÇözmeciler.filter(x => message.guild.roles.cache.has(x)).map(x => message.guild.roles.cache.get(x)).join(", ") : roller.altYönetimRolleri.filter(x => message.guild.roles.cache.has(x)).map(x => message.guild.roles.cache.get(x)).join(", ")} rolü ve üstündeki rollerden herhangi bir yetkiliye ulaşınız ve durumu onlara da anlatınız.`)
        ]
    }).then(x => { 
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).catch(err => {})
        setTimeout(() => {
            x.delete().catch(err => {})
        }, 15000)
    })
    await message.reply({ embeds: [new EmbedBuilder().setDescription(`${cartelcim} üyesi başarıyla kadın olarak kayıt edildi.`)], components: [] }).then(x => {
        setTimeout(() => {
            x.delete()
        }, 10000);
    })
    cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ``}${setName}`).catch(err => message.reply(cevaplar.isimapi));
    cartelcim.Register(`${setName}`, "Kadın", message.member);
    client.Upstaffs.addPoint(message.member.id,_statSystem.points.record, "Kayıt")
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    }
};

