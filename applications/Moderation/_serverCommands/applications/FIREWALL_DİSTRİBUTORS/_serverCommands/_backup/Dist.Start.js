const { Client, Message, EmbedBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const { guildBackup } = require('../../../../base/Reference/Guild.Backup');
module.exports = {
    Isim: "start",
    Komut: ["start"],
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
    if(!client.Distributors && client.Distributors.length < 1) return message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined); 
    await client.startDistributors()
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
 }
};