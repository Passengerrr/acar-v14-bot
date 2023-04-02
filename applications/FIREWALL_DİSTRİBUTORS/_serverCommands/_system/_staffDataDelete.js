const { Client, Message, EmbedBuilder } = require("discord.js");
const cmdBans = require('../../../../database/Schemas/Plugins/Guıild.Remove.Staffs')
const { cartelEmbed } = require('../../../../base/Reference/Embed');
module.exports = {
    Isim: "haksıfırla",
    Komut: ["hak-sıfırla", "hak"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
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
    let cartelim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelim) return message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
    await cmdBans.findByIdAndDelete(cartelim.id)
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    message.channel.send({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelim} isimli üyenin \`${message.guild.name}\` sunucusunda ki yetki salma hakları \`${tarihsel(Date.now())}\` tarihinde sıfırlandı.`)]})
  }
};