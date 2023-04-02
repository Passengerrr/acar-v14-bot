const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder,  StringSelectMenuBuilder, ChannelType } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');

const { 
    Modal,
    TextInputComponent,
    SelectMenuComponent,
    showModal
  } = dcmodal = require('discord-modals')

let Select = ''
module.exports = {
    Isim: "kanal",
    Komut: ["kanal-düzenle","kanal-yönet","kanal-ayarla"],
    Kullanim: "kanal <@cartel/ID>",
    Aciklama: "Belirlenen kanalı düzenlemeye yardımcı olur",
    Kategori: "kurucu",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: async function (client) {
    client.on('modalSubmit', async (modal) => {
        let guild = client.guilds.cache.get(modal.guildId);
  
        if(!guild) {
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Sistemsel olarak bir hata oluştur` , ephemeral: true })
        }
        let cartelcim = guild.members.cache.get(modal.user.id)
        if(!cartelcim){
          await modal.deferReply({ ephemeral: true })
          return await modal.followUp({content: `Sistemsel hata oluştu.` , ephemeral: true })
        }
        if(modal.customId == "kanal_ismi") {
            let isim = modal.getTextInputValue('name');
            if(isim && isim.length > 42) {
                await modal.deferReply({ ephemeral: true })
                return await modal.followUp({content: `Belirtilen isim 42 karakterden uzun olduğu için işleme devam edilemiyor.` , ephemeral: true })
            } 
            await modal.deferReply({ ephemeral: true })
            await modal.followUp({content: `Başarıyla **${Select.name}** kanalının ismi **${isim}** olarak değiştirildi. ${guild.emojiGöster(emojiler.onay_cartel)}` , ephemeral: true })
            let logKanalı = guild.kanalBul("guild-log")
            if(logKanalı) logKanalı.send({embeds: [new EmbedBuilder()
            .setFooter({text:cartelcim.user.tag, iconURL: cartelcim.user.avatarURL({dynamic: true})})
            .setThumbnail(guild.iconURL({dynamic: true}))
            .setDescription(`**${guild.name}** sunucusuna ait ${Select ? Select : "#deleted-channel"} kanalı ${cartelcim} tarafından "${Select ? Select.name : isim}" olan ismi "${isim}" olarak <t:${String(Date.now()).slice(0, 10)}:R> güncellendi.`)
            ]})
            if(Select) return Select.setName(isim)
            
        }
        if(modal.customId == "kanal_limit") {
            let isim = modal.getTextInputValue('limit');
            if(isNaN(isim)) {
                await modal.deferReply({ ephemeral: true })
                return await modal.followUp({content: `Belirtilen limit rakam olmalıdır.` , ephemeral: true })
            } 
            if(isim < 0 && isim > 99) {
                await modal.deferReply({ ephemeral: true })
                return await modal.followUp({content: `Belirtilen limit 0'dan büyük 99'da eşit veya küçük olmalıdır.` , ephemeral: true })
            } 
            await modal.deferReply({ ephemeral: true })
            await modal.followUp({content: `Başarıyla ${Select ? Select : "#deleted-channel"} kanalının limiti "${isim}" olarak değiştirildi. ${guild.emojiGöster(emojiler.onay_cartel)}` , ephemeral: true })
            let logKanalı = guild.kanalBul("guild-log")
            if(logKanalı) logKanalı.send({embeds: [new EmbedBuilder()
            .setFooter({text:cartelcim.user.tag, iconURL: cartelcim.user.avatarURL({dynamic: true})})
            .setThumbnail(guild.iconURL({dynamic: true}))
            .setDescription(`**${guild.name}** sunucusuna ait ${Select ? Select : "#deleted-channel"} kanalı ${cartelcim} tarafından limiti **${isim}** olarak <t:${String(Date.now()).slice(0, 10)}:R> güncellendi.`)
            ]})
            if(Select) return Select.setUserLimit(isim)
            
        }
      })
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
    let kanal = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(x => x.name.includes(args[0])) || message.channel
    if(!kanal) return message.reply({content: `Belirtilen argümanda bir kanal bulunamadı. ${cevaplar.prefix}`}).then(x => {
        setTimeout(() => {
            x.delete().catch(err => {})
        }, 7500)
    });
    let load = await message.reply({content: `Düzenleme işlemi için **${message.guild.name}** sunucusundaki "${kanal}" kanalı hazırlanıyor. Lütfen Bekleyin!`})
    let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    
    let Row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("_name")
                .setLabel(`İsim Güncelleme`)
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId("_limit")
                .setLabel("Limit Güncelleme")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(kanal.type != ChannelType.GuildVoice ? true : false),
        )
    let Row_Two = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("_yukarı")
                .setLabel("🔼")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("_aşağı")
                .setLabel("🔽")
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId("_iptal")
                .setEmoji(message.guild.emojiGöster(emojiler.no_cartel).id)
                .setStyle(ButtonStyle.Secondary),
            )


                let embed = new EmbedBuilder().setThumbnail(message.guild.iconURL({dynamic: true}))
                .setDescription(`Aşağı da ${kanal} kanalını yönetmeniz için size düğme verildi.
Kanalın sırasını güncellemek için "🔼 Yukarı" ve "🔽 Aşağı" simgesini kullanarak kanalı taşıyabilirsiniz. Bu sizler için bi kolaylıktır.`)
                load.edit({content: null, embeds: [embed], components: [Row_Two, Row]})
            
                var filter = (i) => i.user.id == message.member.id
                let collector = load.createMessageComponentCollector({filter: filter, time: 30000})
                collector.on('end', (c, reason) => {
                    if(reason == "time") {
                        load.delete().catch(err => {})
                    }
                })
                collector.on('collect', async (i) => {

                    if(i.customId == "_limit") {
                        const modal = new ModalBuilder()
                        .setCustomId('kanal_limit')
                        .setTitle(`Ses Kanalı Limiti Değiştirme`)
                        .addComponents(
                          new TextInputComponent()
                          .setCustomId('limit')
                          .setLabel('Limit:')
                          .setStyle('SHORT')
                          .setMinLength(1)
                          .setMaxLength(2)
                          .setPlaceholder(`Örn: 5`)
                          .setRequired(true),
                        );
                        Select = kanal
                        showModal(modal, {
                          client: client,
                          interaction: i 
                        })
                    }
                    if(i.customId == "_name") {
                        const modal = new ModalBuilder()
                        .setCustomId('kanal_ismi')
                        .setTitle(`Kanal İsim Değiştirme`)
                        .addComponents(
                          new TextInputComponent()
                          .setCustomId('name')
                          .setLabel('Yeni İsim Girin:')
                          .setStyle('SHORT')
                          .setMinLength(3)
                          .setMaxLength(120)
                          .setPlaceholder(`${kanal.name}`)
                          .setRequired(true),
                        );
                        Select = kanal
                        showModal(modal, {
                          client: client,
                          interaction: i 
                        })
                    }
                    if(i.customId == "_iptal") {
                        load.delete().catch(err => {})
                        message.reply(message.guild.emojiGöster(emojiler.onay_cartel)).catch(err => {})
                        i.deferUpdate().catch(err => {})
                    }


                    if(i.customId == "_yukarı") {
                        kanal.setPosition(kanal.rawPosition - 1)
                        embed.setColor("Random").setFooter({text:`Başarıyla ${kanal.name} kanalı yukarı taşındı. ✅`})
                        Row_Two.components[0].setStyle(ButtonStyle.Success)
                        Row_Two.components[0].setDisabled(true)
                        load.edit({embeds: [embed], components: [Row_Two, Row]})
                        let logKanalı = message.guild.kanalBul("guild-log")
                        if(logKanalı) logKanalı.send({embeds: [new EmbedBuilder()
                        .setFooter({text:message.member.user.tag, iconURL: message.member.user.avatarURL({dynamic: true})})
                        .setThumbnail(message.guild.iconURL({dynamic: true}))
                        .setDescription(`**${message.guild.name}** sunucusuna ait ${kanal} kanalı ${message} tarafından <t:${String(Date.now()).slice(0, 10)}:R> yukarı taşındı.`)
                        ]})
                        setTimeout(() => {
                            Row_Two.components[0].setStyle(ButtonStyle.Secondary)
                            Row_Two.components[0].setDisabled(false)
                            embed.setColor("Random").setFooter({text:null})
                        load.edit({embeds: [embed], components: [Row_Two, Row]})
                        
                        }, 2250)
                        i.deferUpdate().catch(err => {})
                    }
                    if(i.customId == "_aşağı") {
                        kanal.setPosition(kanal.rawPosition + 1)
                        embed.setColor("Random").setFooter({text:`Başarıyla ${kanal.name} kanalı aşağı taşındı. ✅`})
                        Row_Two.components[1].setStyle(ButtonStyle.Success)
                        Row_Two.components[1].setDisabled(true)
                        load.edit({embeds: [embed], components: [Row_Two, Row]})
                        let logKanalı = message.guild.kanalBul("guild-log")
                        if(logKanalı) logKanalı.send({embeds: [new EmbedBuilder()
                        .setFooter({text:message.member.user.tag, iconURL: message.member.user.avatarURL({dynamic: true})})
                        .setThumbnail(message.guild.iconURL({dynamic: true}))
                        .setDescription(`**${message.guild.name}** sunucusuna ait ${kanal} kanalı ${message} tarafından <t:${String(Date.now()).slice(0, 10)}:R> aşağı taşındı.`)
                        ]})
                        setTimeout(() => {
                            embed.setColor("Random").setFooter({text:null})
                            Row_Two.components[1].setStyle(ButtonStyle.Secondary)
                            Row_Two.components[1].setDisabled(false)
                        load.edit({embeds: [embed], components: [Row_Two, Row]})
                        }, 2250)
                        load.edit({embeds: [embed]})
                        i.deferUpdate().catch(err => {})
                    }
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