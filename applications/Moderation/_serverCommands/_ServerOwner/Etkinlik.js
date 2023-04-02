const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder,  StringSelectMenuBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Upstaff = require('../../../../database/Schemas/Plugins/Client.Users.Staffs')
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings')
module.exports = {
    Isim: "etkinlik",
    Komut: ["etkinlikyönetim","etkinlik-yonetim","etkinlik-yönetim"],
    Kullanim: "etkinlik",
    Aciklama: "Belirlenen yetkilinin sunucu içerisinde ki bilgileri gösterir ve yükseltir düşürür.",
    Kategori: "kurucu",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: async function (client) {
  
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz),message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined).then(x => setTimeout(() => {
        message.delete().catch(err => {})
    }, 7500));
    let embed = new EmbedBuilder()
    let notActive = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("aktif")
        .setEmoji("841029419573444618")
        .setLabel("Etkinlik Başlat")
        .setStyle(ButtonStyle.Success)
    )
    let Active = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("bitir")
        .setEmoji(message.guild.emojiGöster(emojiler.no_cartel))
        .setLabel("Etkinlik Bitir")
        .setStyle(ButtonStyle.Danger)
    )
    let etkinlikDurumu = ayarlar ? ayarlar.Etkinlik ? ayarlar.Etkinlik : false : false
    let etkinlikKanalları = ayarlar ? ayarlar.etkinlikIzinliler ? ayarlar.etkinlikIzinliler : [] : []
    let etkinlikSaniyelikPuan = ayarlar ? ayarlar.etkinlikPuan ? ayarlar.etkinlikPuan : 0.001 : 0.001
    message.channel.send({embeds: [new EmbedBuilder().setFooter({text:"Etkinlik puanlamasını websitesi üzerinden veya da kurulum panelinden değiştirebilirsiniz."}).setDescription(`${etkinlikDurumu ? `${message.guild.emojiGöster(emojiler.Konfeti)}` : `:tada:`} **Merhaba!** ${ayarlar.serverName ? ayarlar.serverName : message.guild.name} sunucusunda ${etkinlikDurumu ? "etkinlik **aktif** durdurmak için aşağıda ki düğmeyi kullanabilirsin." : "etkinlik şuan da **kapalı**. Etkinliği başlatmak için aşağıda ki düğmeyi kullanabilirsin."}

**Etkinlik Durumu**
Etkinlik Durumu: \`${etkinlikDurumu ? " Başlatılmış! ✅ " : " Sonlandırılmış! ❌ "}\`
**Saatlik** Puan Durumu: \` +${3600*etkinlikSaniyelikPuan} Etkinlik Puanı \`
**Dakikalık** Puan Durumu: \` +${60*etkinlikSaniyelikPuan} Etkinlik Puanı \`
**Saniyelik** Puan Durumu: \` +${etkinlikSaniyelikPuan} Etkinlik Puanı \`
 Etkinlik Kategorileri: \`${etkinlikKanalları.length >= 1 ? etkinlikKanalları.map(x => message.guild.channels.cache.get(x).name).join(", ") : " Ayarlanmamış! "}\``)], components: [etkinlikDurumu ? Active : notActive]}).then(async (msg) => {
        var filter  = (i) => i.user.id == message.member.id
        let collector = msg.createMessageComponentCollector({filter: filter})
        collector.on('collect', async (i) => {
            if(i.customId == "aktif") {
                message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
                await GUILDS_SETTINGS.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.Etkinlik": true}},{upsert: true})
                msg.delete().catch(err => {})
                i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla <t:${String(Date.now()).slice(0, 10)}:R> ${etkinlikKanalları.length >= 1 ? etkinlikKanalları.map(x => message.guild.channels.cache.get(x).name).join(", ") + " kategorilerin de": ``} etkinlik **${etkinlikSaniyelikPuan}** saniyelik puan ile başlatıldı.`, ephemeral: true})
            
            } else if(i.customId == "bitir") {
                message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
                await GUILDS_SETTINGS.updateOne({guildID: sistem.SUNUCU.GUILD}, {$set: {"Ayarlar.Etkinlik": false}},{upsert: true})
                msg.delete().catch(err => {})
                i.reply({content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla <t:${String(Date.now()).slice(0, 10)}:R>${etkinlikKanalları.length >= 1 ? etkinlikKanalları.map(x => message.guild.channels.cache.get(x).name).join(", ") + " kategorilerinde ki": ``} etkinlik sonlandırıldı.`, ephemeral: true})
            }
        })
    })
    
    }
};



function secretOluştur(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }