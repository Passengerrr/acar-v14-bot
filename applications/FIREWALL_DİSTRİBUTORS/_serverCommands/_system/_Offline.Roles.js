const Roles = require('../../../../database/Schemas/Guards/GuildMember.Roles.Backup');
const { Client, Message, EmbedBuilder} = Discord = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");

module.exports = {
    Isim: "offlineroles",
    Komut: ["of-roles","offline-roles","kapalılar","çıkmışyetkililer"],
    Kullanim: "offlineroles <@cartel/ID> <Miktar>",
    Aciklama: "24 Saatte bir belirli bir coin ödülü alırsınız.",
    Kategori: "eco",
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
    let embed = new EmbedBuilder()
    let data = await Roles.find({})
    if(!data) message.reply({content: `Veritabanında çevrim-dışı olmuş ve yetkisi çekilmiş bir üye bulunamadı. ${message.guild.emojiGöster(emojiler.onay_cartel)}`}).then(x => setTimeout(() => x.delete().catch(err => {}), 7500))
    let çevrimdışılar = data || []
    let rolBul = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(rolBul) çevrimdışılar = data.filter(x => x.Roles.includes(rolBul.id) && message.guild.members.cache.get(x._id)) || []
    let cartelimBul = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(cartelimBul) çevrimdışılar = data.filter(x => x._id == cartelimBul.id && message.guild.members.cache.get(x._id)) || []
    if(cartelimBul && args[1] == "sil") {
        await Roles.deleteOne({_id: cartelimBul.id})
        return message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
    }
    if(args[0] == "auto") {
       let gg = data.filter(x => !message.guild.members.cache.get(x._id)) || []
       if(gg) gg.forEach(async (x) => {
            await Roles.deleteOne({_id: x._id})
       })
       return message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined).catch(err => {})
    }
    if(rolBul) {
        return message.reply({embeds: [embed.setColor("Random").setDescription(`Aşağıda ${rolBul} rolünde çevrim-dışı alınca yetkisi alınan üyeler aşağıda listelenmektedir.

**Üyeler (${rolBul})**:
${çevrimdışılar.filter(x => x.Roles.includes(rolBul.id)).map(x => `> ${message.guild.members.cache.get(x._id)} (${x.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")})`).join("\n")}
`)]})
    }
    if(cartelimBul) {
        return message.reply({embeds: [embed.setColor("Random").setDescription(`Aşağıda ${cartelimBul} üyesinin çevrim-dışı veya tarayıcı girişinden alınan yetkileri ${çevrimdışılar ? `listelenmektedir.
         
**Rol(ler) (${cartelimBul})**:
${çevrimdışılar.map(x => `> ${x.Roles.map(c => message.guild.roles.cache.get(c))} (${x.Reason}) (<t:${String(Date.parse(x.Date)).slice(0, 10)}:R>)`)}` : `bulunamadı. ${cevaplar.prefix}`}
         `)]})
     }
    if(!rolBul || !cartelimBul) {
        const arr = Discord.Util.splitMessage(`${çevrimdışılar.filter(x => x.Reason == "Çevrimdışı" && message.guild.members.cache.get(x._id)).map(x => `> ${message.guild.members.cache.get(x._id)} (${x.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")})`).join("\n")}`, { maxLength: 3000, char: "\n" });
        arr.forEach(element => {
            message.reply({embeds: [embed.setColor("Random").setDescription(`Aşağıda **${ayarlar.serverName}** sunucusunun çevrim-dışı alınca yetkisi alınan üyeler aşağıda listelenmektedir.

**Çevrim-Dışı Olanlar**:
${element}`)]})
        });
        const arr2 = Discord.Util.splitMessage(`${çevrimdışılar.filter(x => x.Reason == "Web tarayıcı girişi için kaldırıldı." && message.guild.members.cache.get(x._id)).map(x => `> ${message.guild.members.cache.get(x._id)} (${x.Roles.map(x => message.guild.roles.cache.get(x)).join(", ")})`).join("\n")}}`, { maxLength: 3000, char: "\n" });
        arr2.forEach(element => {
            message.reply({embeds: [embed.setColor("Random").setDescription(`Aşağıda **${ayarlar.serverName}** sunucusunun çevrim-dışı alınca yetkisi alınan üyeler aşağıda listelenmektedir.

**Tarayıcı Girişi Olanlar**:
${element}`)]})
        });
    }
  }
};