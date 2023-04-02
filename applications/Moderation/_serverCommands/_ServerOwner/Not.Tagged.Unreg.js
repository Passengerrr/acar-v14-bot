const { Client, Message, EmbedBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Kullanici = require('../../../../database/Schemas/Client.Users')
module.exports = {
    Isim: "tagsızat",
    Komut: ["tagsızkayıtsız"],
    Kullanim: "tagsızat",
    Aciklama: "Sunucudaki üyeler içerisinde tagı olmayanları kayıtsıza at.",
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
    const embed = new EmbedBuilder() 
    if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!ayarlar.taglıalım) return message.channel.send(`${cevaplar.prefix} \`Taglı-Alım\` modu kapalı olduğundan dolayı işlem iptal edildi.`);
    let tagsızlar = message.guild.members.cache.filter(x => !x.user.username.includes(ayarlar.tag) && !x.roles.cache.has(roller.vipRolü)  && !x.roles.cache.has(roller.boosterRolü) 
    && (roller.kadınRolleri.some(r => x.roles.cache.has(r) || roller.erkekRolleri.some(r => x.roles.cache.has(r)))))
    tagsızlar.forEach(async (cartelcim) => {
            cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`).catch(err => {})
            cartelcim.roles.set(roller.kayıtsızRolleri).catch(err => {})
            if(cartelcim.voice.channel) cartelcim.voice.disconnect()
            let data = await Kullanici.findOne({_id: cartelcim.id});
            if(data && data.Name) await Kullanici.updateOne({_id: cartelcim.id}, {$set: { "Gender": "Kayıtsız" }, $push: { "Names": { Staff: message.member.id, Date: Date.now(), Name: data.Name, State: "Tagsız Kayıtsıza Atıldı" } } }, { upsert: true })
            cartelcim.Delete()
            cartelcim.removeStaff()
    })
    message.channel.send({embeds: [embed.setColor("Random").setDescription(`Sunucuda kayıtlı olup tagı olmayan \`${tagsızlar.size}\` üye başarıyla kayıtsız'a atıldı!`)]}).then(x => {
        setTimeout(() => {
            x.delete()
        }, 7500);
    })
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)

 }
};