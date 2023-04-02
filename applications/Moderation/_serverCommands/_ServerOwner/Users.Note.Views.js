const { Client, Message, EmbedBuilder, Util } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Users = require('../../../../database/Schemas/Client.Users');

module.exports = {
    Isim: "notlar",
    Komut: ["not-listele","notes"],
    Kullanim: "notlar <@cartel/ID>",
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
    let User = await Users.findOne({_id: cartelcim.id})
    if(!User) return message.reply({content: `${message.guild.emojiGöster(emojiler.no_cartel)} Belirtilen ${cartelcim} isimli üyenin veritabanında hiç bir kayıdı bulunamadı.`}).then(msg => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    if(User && !User.Notes) return message.reply({content: `${message.guild.emojiGöster(emojiler.no_cartel)} Belirtilen ${cartelcim} isimli üyenin notları bulunamadı.`}).then(msg => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    if(User && User.Notes && !User.Notes.length > 0) return message.reply({content: `${message.guild.emojiGöster(emojiler.no_cartel)} Belirtilen ${cartelcim} isimli üyenin notları bulunamadı.`}).then(msg => {
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        setTimeout(() => {
            msg.delete()
        }, 7500);
    })
    let Notlar = User.Notes.map((data, index) => `\` ${index + 1} \` **${data.Note}** (${data.Author ? message.guild.members.cache.get(data.Author) : `<@${data.Author}>`}) (\`${data.Date ? tarihsel(data.Date) : tarihsel(Date.now())}\`)`).join("\n")
    message.channel.send({embeds: [new EmbedBuilder().setFooter({text:`${message.member.user.tag} tarafından istendi.`}).setDescription(`Aşağıda ${cartelcim} isimli üyenin yöneticiler tarafından eklenmiş notları listelenmektedir.\n\n${Notlar}`)]}).then(async (msg) => {
    })
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    }
};

