const { Client, Message, EmbedBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");

module.exports = {
    Isim: "ünlemkaldır",
    Komut: ["unlemkaldır", "isim-ünlemtemizle", "unlemkaldir", "ümlemlerikaldır"],
    Kullanim: "ünlemkaldır",
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
    let ünlemliler = message.guild.members.cache.filter(x => x.displayName.includes("!"))
    ünlemliler.forEach(async (cartelcim) => {
       await cartelcim.setNickname(cartelcim.displayName.replace("!","")).catch(err => {})
       if(cartelcim.displayName.includes(".")) await cartelcim.setNickname(cartelcim.displayName.replace(".","")).catch(err => {})
    })
    message.channel.send({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla \`${ünlemliler.size}\` üyenin isminde ki __ünlem, özel karakter veya boşluk__ kaldırıldı.`)]}).then(x => {
        message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
        setTimeout(() => {
            x.delete()
        }, 17500);
    })
} 
};

