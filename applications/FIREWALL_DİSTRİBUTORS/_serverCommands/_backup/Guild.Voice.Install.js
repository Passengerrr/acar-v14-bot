const { Client, Message, EmbedBuilder, ChannelType } = Discord = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const CategoryChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Category.Channels");
const TextChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Text.Channels");
const VoiceChannels = require("../../../../database/Schemas/Guards/Backup/Guild.Voice.Channels");
module.exports = {
    Isim: "seskur",
    Komut: ["seskur"],
    Kullanim: "kategorikur @cartel/ID",
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
   
    if (!args[0] || isNaN(args[0])) return message.reply("Lütfen Ses kanalı ID'si giriniz.")
    VoiceChannels.findOne({ channelID: args[0] }, async (err, data) => {
      if (!data) return;
      const newChannel = await message.guild.channels.create(data.name, {
        type: ChannelType.GuildText,
        bitrate: data.bitrate,
        parentID: data.parentID,
        position: data.position,
        userLimit: data.userLimit ? data.userLimit : 0
      });
      await message.channel.send({ embeds: [embed.setColor("Random").setDescription(`**${newChannel.name}** isimli ses kanalının, \`${tarihsel(Date.now())}\` tarihli ses kanalı kurulmaya başladı.`)]})
      const newOverwrite = [];
      for (let index = 0; index < data.overwrites.length; index++) {
        const veri = data.overwrites[index];
        newOverwrite.push({
          id: veri.id,
          allow: new Discord.Permissions(veri.allow).toArray(),
          deny: new Discord.Permissions(veri.deny).toArray()
        });
      }
      if(message.guild.channels.cache.get(data.parentID)) {
        newChannel.setParent(data.parentID)
    }   
      await newChannel.permissionOverwrites.set(newOverwrite);
      await client.queryManage(args[0], newChannel.id)
      data.channelID = newChannel.id
      data.save()
    });
  }
};