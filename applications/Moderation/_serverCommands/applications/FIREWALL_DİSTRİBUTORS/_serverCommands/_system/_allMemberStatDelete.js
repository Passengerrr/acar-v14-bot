const { Client, Message, Util, EmbedBuilder } = require("discord.js");
const StatsSchema = require('../../../../database/Schemas/Plugins/Client.Users.Stats');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const ms = require('ms')
module.exports = {
    Isim: "stattemizle",
    Komut: ["stat-temizle"],
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
    message.channel.send({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla **${tarihsel(Date.now() - ms("7d"))}** tarihinden itibaren olan tüm veriler temizlendi.`)]}).then(async (x) => {
    
     await StatsSchema.updateMany({ guildID: message.guild.id }, { voiceStats: new Map(), chatStats: new Map(), totalVoiceStats: 0, totalChatStats: 0 });
            let stats = await StatsSchema.find({ guildID: message.guild.id});
            stats.filter(s => !message.guild.members.cache.has(s.userID)).forEach(s => StatsSchema.findByIdAndDelete(s._id));
            await StatsSchema.updateMany({ guildID: message.guild.id }, { voiceStats: new Map(), chatStats: new Map(), totalVoiceStats: 0, totalChatStats: 0 });
            await StatsSchema.updateMany({ guildID: message.guild.id }, { voiceStats: new Map(), chatStats: new Map(), totalVoiceStats: 0, totalChatStats: 0 });
            await StatsSchema.deleteMany({ guildID: message.guild.id})
            message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
            setTimeout(() => {
              x.delete()
            }, 13500);
    })
    }
};