const { Client, Message, EmbedBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const { guildBackup } = require('../../../../base/Reference/Guild.Backup');
const roleBackup = require('../../../../database/Schemas/Guards/Backup/Guild.Roles')
const guildSettings = require('../../../../database/Schemas/Global.Guild.Settings')
module.exports = {
    Isim: "rolsil",
    Komut: ["rolsil"],
    Kullanim: "rolsil @cartel/ID",
    Aciklama: "Sunucudaki üyeler içerisinde tagı olmayanları kayıtsıza at.",
    Kategori: "-",
    Extend: false,
    
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
    let veriData = await guildSettings.findOne({ guildID: message.guild.id })
    let sunucuData = veriData.Ayarlar 
    const embed = new EmbedBuilder() 
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!rol) message.reply({content: `${cevaplar.prefix} Lütfen geçerli bir rol belirtin!`}).then(x => setTimeout(() => {
        x.delete().catch(err => {})
    }, 7500)),message.reply(message.guild.emojiGöster(emojiler.no_cartel)).catch(err => {})
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
    message.channel.send({ embeds: [embed.setColor("Random").setFooter({text:`silinen rolü tekrardan kurmak istermisin? ${sistem.botSettings.Prefixs[0]}rolkur ${rol.id}`}).setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla **${rol.name}** (\`${rol.id}\`) isimli rol \`${message.guild.name}\` sunucusundan silindi.`)] }).then(x => {
        setTimeout(() => {
            x.delete().catch(err => {})
        }, 35000)
    })
    setTimeout(async () => {
        await rol.delete().catch(err => {})
    }, 2500);

  }
};