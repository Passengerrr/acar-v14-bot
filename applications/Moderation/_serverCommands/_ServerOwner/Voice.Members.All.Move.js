const { Client, Message, EmbedBuilder, ChannelType } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");

module.exports = {
    Isim: "toplutaşı",
    Komut: ["toplutasi"],
    Kullanim: "toplutaşı <Kanal ID>",
    Aciklama: "",
    Kategori: "kurucu",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} msg 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    if(!sistem._rooter.rooters.includes(message.member.id) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
     if (!message.member.voice.channelId) return message.reply(`${cevaplar.prefix} Ses kanalında olmadığın için işlem iptal edildi.`).then(x => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            x.delete()
        }, 7500);
    	});
        let channel = args[0]
        if (args.length < 1) return message.reply(`${cevaplar.prefix} Ses kanalındaki üyeleri hangi kanala taşımamı istiyorsun?`).then(x => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            x.delete()
        }, 7500);
    	});
        let positionChannel = message.guild.channels.cache.find(x => x.id == channel)
        if (!positionChannel) return message.reply(`${cevaplar.prefix} Belirtilen argüman bir kanal değil lütfen geçerli bir kanal girin!`).then(x => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            x.delete()
        }, 7500);
    	});
	if(positionChannel.type != ChannelType.GuildVoice) return message.reply(`${cevaplar.prefix} Belirtilen ${positionChannel} kanalı bir ses kanalı değil!`).then(x => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            x.delete()
        }, 7500);
    	});
        let channelMembers = message.member.voice.channel.members.map(x => x.id)
        for (let i = 0; i < channelMembers.length; i++) {
            setTimeout(() => {
                message.guild.members.cache.get(channelMembers[i]).voice.setChannel(positionChannel.id).catch(err => {})
            }, (i + 1) * 1000)
        }
    message.reply(`${message.guild.emojiGöster(emojiler.onay_cartel)} \`${message.member.voice.channel.name}\` adlı ses kanalındaki üyeler ${positionChannel} kanalına taşınmaya başlandı!`);
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
  }
}