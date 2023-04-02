const { EmbedBuilder } = require("discord.js");
const moment = require('moment');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Heykel = require('../../../../database/Schemas/Others/Middle.Heykels')
require('moment-duration-format');
require('moment-timezone');

module.exports = {
    Isim: "best",
    Komut: ["best","best-friend","bestfriend"],
    Kullanim: "best <@cartel/ID>",
    Aciklama: "Belirlenen üyeyi terfi sistemine senkronize eder.",
    Kategori: "kurucu",
    Extend: false,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {
      
var CronJob = require('cron').CronJob
let heykelTemizle = new CronJob('0 0 * * *', async function() { 
   let guild = client.guilds.cache.get(sistem.SUNUCU.GUILD);
   if(!roller.Buttons) return;
   if(!roller.Buttons.bestFriendRolü) return;
   guild.members.cache.filter(x => x.roles.cache.has(roller.Buttons.bestFriendRolü)).forEach(cartelcim => {
    if(cartelcim.roles.cache.has(roller.Buttons.bestFriendRolü)) cartelcim.roles.remove(roller.Buttons.bestFriendRolü).catch(err => {})
    })
    console.log("heykeller temizlendi...")
}, null, true, 'Europe/Istanbul');
heykelTemizle.start()
  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    if(!roller.Buttons) return;
    if(!roller.Buttons.bestFriendRolü) return;
    let embed = new EmbedBuilder()
    if(!sistem._rooter.rooters.includes(message.member.id) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let allData = await Heykel.find({})
    if(args[0] == "liste") {
        return message.channel.send({embeds: [new EmbedBuilder().setDescription(`${allData ? allData.filter(x => message.guild.members.cache.has(x._id)).map((x, index) => `\` ${index + 1} \` ${message.guild.members.cache.get(x._id)} ${x.added ? message.guild.members.cache.has(x.added) ? `(${message.guild.members.cache.get(x.added)})` : "" : ""}`).join("\n") : "Yakın arkadaş sistemine eklenmiş bir üye bulunamadı."}`)]})
    }
    let kullArray = message.content.split(" ");
    let kullArgs = kullArray.slice(0);
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(kullArgs[1]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === kullArgs.slice(1).join(" ") || x.user.username === kullArgs[1])
    if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.author.id === cartelcim.id) return message.reply(cevaplar.kendi).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let data = await Heykel.findOne({_id: cartelcim.id})
    let buttonKanalı = message.guild.kanalBul("best-friends")
    if(data) {
        message.channel.send({embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} üyesi ${roller.Buttons.bestFriendRolü ? message.guild.roles.cache.get(roller.Buttons.bestFriendRolü) : "@Best Friend"} rolünü alması için izin kaldırıldı!`)]}).then(x => {
            setTimeout(() => {
                x.delete()
            }, 7500)
        });;
        await Heykel.deleteOne({_id: cartelcim.id})
       if(roller.Buttons && roller.Buttons.bestFriendRolü && message.guild.roles.cache.get(roller.Buttons.bestFriendRolü)) cartelcim.roles.remove(roller.Buttons.bestFriendRolü).catch(err => {})
        await buttonKanalı.permissionOverwrites.edit(cartelcim.id, { VIEW_CHANNEL: false, READ_MESSAGE_HISTORY: false });
    } else if(!data) {
        message.channel.send({embeds: [embed.setColor("Random").setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} üyesi ${roller.Buttons.bestFriendRolü ? message.guild.roles.cache.get(roller.Buttons.bestFriendRolü) : "@Best Friend"} rolünü alması için izin eklendi!`)]}).then(x => {
            setTimeout(() => {
                x.delete()
            }, 7500)
        });
        await Heykel.updateOne({_id: cartelcim.id}, {$set: {"added":message.member.id, "date": Date.now()}}, {upsert: true})
        await buttonKanalı.permissionOverwrites.edit(cartelcim.id, { VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true });
    }
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
  }
};