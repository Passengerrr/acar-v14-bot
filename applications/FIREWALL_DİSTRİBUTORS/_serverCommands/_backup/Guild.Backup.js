const { Client, Message, EmbedBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const { guildBackup } = require('../../../../base/Reference/Guild.Backup');
module.exports = {
    Isim: "backup",
    Komut: ["yedekal"],
    Kullanim: "yedek @cartel/ID",
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
    const embed = new EmbedBuilder() 
    await guildBackup.guildChannels()
    await guildBackup.guildRoles()
    message.channel.send({embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla \`${message.guild.name}\` sunucusunun son bir saat olan yedeklemesi <t:${String(Date.now()).slice(0, 10)}:R> alındı ve kayıtlara işlendi.`)]})
    .then(x => {
        setTimeout(() => {
            x.delete().catch(err => {})
        }, 8500);
    })
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    client.logger.log(`ROL => Manuel olarak backup işlemi gerçekleştirildi. (${message.author.tag})`, "backup") 
 }
};