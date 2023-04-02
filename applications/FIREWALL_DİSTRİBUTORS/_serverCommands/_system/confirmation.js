const { Client, Message, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require("discord.js");
const { cartelinEmbedi } = require('../../../../base/Reference/Embed')
const GUILDS_SETTINGS = require('../../../../database/Schemas/Global.Guild.Settings');
module.exports = {
    Isim: "confirmation",
    Komut: ["Q1EWQR"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    
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
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let kanal = message.guild.kanalBul(kanallar.hoşgeldinKanalı)
    
   let confirmation = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
  .setCustomId("confirm")
  .setLabel("Doğrula")
  .setStyle(ButtonStyle.Success),
   )
 let msg = message.channel.send({content: (`
**Merhaba Kullanıcı;**

Sunucumuz şuan çok hızlı giriş işlemi yapıldığı için rol dağıtımı durduruldu. Aşağıdaki butona tıklayarak bot hesap olmadığını doğrulayıp sunucuda gerekli rollerini alabilirsin. Eğer yanlış bir durum olduğunu düşünüyorsan sağ taraftaki yetkililere yazmaktan çekinme!

Eğer bu kanalı anlık olarak gördüysen kayıt işlemine ${kanal} bu kanaldan devam edebilirsin

İyi günler dileriz.

APTAL BOTCU RAMAL 

   `), components: [ confirmation ]})
  
  let collector = msg.createMessageComponentCollector({});
  collector.on('collect', async (i) => {
    if(i.customId == "confirm") {
await i.reply(`Doğrulandı Teyit Kanallarına Yönlendiriliyorsunuz....`)
  await member.roles.add(roller.kayıtsızRolleri)

    
    }
    collector.on('end', collected => { 
      x.delete().catch(err => {})
   });


})
    }

};