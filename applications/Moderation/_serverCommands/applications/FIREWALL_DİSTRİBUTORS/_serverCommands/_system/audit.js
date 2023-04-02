const {ActionRowBuilder,EmbedBuilder , ButtonBuilder, ButtonStyle, StringSelectMenuBuilder,AuditLogEvent} = Discord = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
module.exports = {
    Isim: "denetim",
    Komut: ["denetim"],
    Kullanim: "denetim",
    Aciklama: "Belirtilen bir rolün üyelerinin seste olup olmadığını ve rol bilgilerini gösterir.",
    Kategori: "kurucu",
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
    let embed = new EmbedBuilder()
    let Row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId("denetim-rol")
        .setLabel("Son Silinen Roller")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("943285259733184592"),
        new ButtonBuilder()
        .setCustomId("denetim-kanallar")
        .setLabel("Son Silinen Kanallar")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji("943285868368633886"),
    )

    message.reply({components: [Row], content: `Aşağıda **${message.guild.name}** sunucusuna ait denetim kaydında bulunan silinen rolleri ve kanalları listelersiniz.
Düğme ile silinen rolleri veya kanalları tekrardan kurabilirsiniz.`}).then(async (msg) => {
    var filter = (i) => i.user.id == message.author.id;
    let collector = msg.createMessageComponentCollector({filter: filter, time: 60000});
    collector.on('end', (collected, reason) => {
        if(reason == "time"){
            msg.delete().catch(err => {});
        }
    })
    collector.on('collect', async (i) => {
        if(i.customId == "denetim-rol") {
            msg.delete().catch(err => { })
            let opt = []
            const audit = await message.guild.fetchAuditLogs({ type: AuditLogEvent.RoleDelete}).then(a => a.entries)
            const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60)
            .map(e => {
                opt.push({label: `${e.changes.filter(e => e.key === 'name').map(e => e.old)}`, value: e.target.id})
            })
            let RowChannel = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`${i.user.id}+denetim-roller`)
                    .setPlaceholder("Son 1 saat içerisinde silinenler.")
                    .setOptions(
                        opt.length > 0 ? opt : [{label: "Son 1 saat içerisinde silinen roller yok.", value: "0"}]
                    )
            )
           await i.reply({content: `**Merhaba!** ${message.author.tag}
Aşağıda son 1 saat içerisinde silinen rol listesi bulunmaktadır.
Seçilen rol otomatik olarak bot tarafından kurulmaktadır. :tada:`, components: [RowChannel], ephemeral: true})
            var filter = (i) => i.user.id == message.author.id;
            let collector = msg.channel.createMessageComponentCollector({filter: filter, time: 60000, max: 1});
            collector.on('collect', async (i) => {
                if(i.customId == `${i.user.id}+denetim-roller`) {
                    if(i.values[0] != "0") {
                        let channel = client.commands.find(x => x.Isim == "rolkur")
                        if(channel) channel.onRequest(client, message, [i.values[0]])
                        await i.update({components: [], content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla rol kurma komutlarına istek gönderildi.`})
                        message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    } else {
                        i.reply({content: `Son 1 saat içerisinde silinen bir veri bulunamadı.`, ephemeral: true})
                    }
                }
            })
        }
        if(i.customId == "denetim-kanallar") {
            msg.delete().catch(err => { })
            let opt = []
            const audit = await message.guild.fetchAuditLogs({ type: 'ChannelDelete' }).then(a => a.entries)
            const denetim = audit.filter(e => Date.now() - e.createdTimestamp < 1000 * 60 * 60)
            .map(e => {
                opt.push({label: `${e.changes.filter(e => e.key === 'name').map(e => e.old)}`, value: e.target.id})
            })
            let RowChannel = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`${i.user.id}+denetim-kanallar`)
                    .setPlaceholder("Son 1 saat içerisinde silinenler.")
                    .setOptions(
                        opt.length > 0 ? opt : [{label: "Son 1 saat içerisinde silinen kanallar yok.", value: "0"}]
                    )
            )
           await i.reply({content: `**Merhaba!** ${message.author.tag}
Aşağıda son 1 saat içerisinde silinen kanal listesi bulunmaktadır.
Seçilen kanal otomatik olarak bot tarafından kurulmaktadır. :tada:`, components: [RowChannel], ephemeral: true})
            var filter = (i) => i.user.id == message.author.id;
            let collector = msg.channel.createMessageComponentCollector({filter: filter, time: 60000, max: 1});
            collector.on('collect', async (i) => {
                if(i.customId == `${i.user.id}+denetim-kanallar`) {
                    if(i.values[0] != "0") {
                        let channel = client.commands.find(x => x.Isim == "seskur")
                        if(channel) channel.onRequest(client, message, [i.values[0]])
                        let voice = client.commands.find(x => x.Isim == "metinkur")
                        if(voice) voice.onRequest(client, message, [i.values[0]])
                        let category = client.commands.find(x => x.Isim == "kategorikur")
                        if(category) category.onRequest(client, message, [i.values[0]])
                        await i.update({components: [], content: `${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla kanal kurma komutlarına istek gönderildi.`})
                        message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
                    } else {
                        i.reply({content: `Son 1 saat içerisinde silinen bir veri bulunamadı.`, ephemeral: true})
                    }
                }
            })
        }
    })

})
   }
};