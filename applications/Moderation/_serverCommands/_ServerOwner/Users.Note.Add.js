const { Client, Message, EmbedBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Users = require('../../../../database/Schemas/Client.Users');

module.exports = {
    Isim: "not",
    Komut: ["notoluştur"],
    Kullanim: "not <@cartel/ID> <Not>",
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
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    if(!sistem._rooter.rooters.includes(message.member.id) && !message.member.permissions.has('ADMINISTRATOR') && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.reply({content: `${message.guild.emojiGöster(emojiler.no_cartel)} Bir üye belirtmediğinden işlem iptal edildi.`}).then(msg => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    const not = args.slice(1).join(" ");
    if(!not) return message.reply({content: `${message.guild.emojiGöster(emojiler.no_cartel)} Bir not girmediğinden dolayı işlem iptal edildi.`}).then(msg => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    await Users.updateOne({_id: cartelcim.id}, {$push: { "Notes": { "Author": message.member.id, "Note": not, "Date": Date.now() }}}, {upsert: true})
    message.channel.send({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} ${cartelcim} isimli üyeye \`${not}\` notu <t:${String(Date.now()).slice(0, 10)}:R> eklendi.`)]}).then(msg => {
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    }
};

