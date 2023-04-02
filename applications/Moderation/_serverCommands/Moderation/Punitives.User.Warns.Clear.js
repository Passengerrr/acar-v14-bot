const { Client, Message, EmbedBuilder} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Users = require('../../../../database/Schemas/Client.Users');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
module.exports = {
    Isim: "uyarıtemizle",
    Komut: ["uyarılartemizle","uyarilartemizle"],
    Kullanim: "uyarıtemizle <@cartel/ID>",
    Aciklama: "Belirtilen ceza numarasının bütün bilgilerini gösterir.",
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
    if(!sistem._rooter.rooters.includes(message.member.id) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));

    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])
    if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let cezalar = await Punitives.findOne({Member: cartelcim.id});
    if(!cezalar) return message.reply({embeds: [new EmbedBuilder().setDescription(`${cartelcim} isimli üyenin cezası bulunamadı.`)]});
    if(await Punitives.findOne({Member: cartelcim.id, Type: "Uyarılma"})) {
    	await message.reply({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} ${cartelcim} üyesinin tüm uyarılmaları başarıyla temizlendi.`)]})
    	await Punitives.updateMany({Member: cartelcim.id, Type: "Uyarılma" }, { $set: { Member: `Silindi (${cartelcim.id})`, No: "-99999", Remover: `Sildi (${message.author.id})`} }, { upsert: true });
    	await message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    } else { 
	await message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
	return message.reply({embeds: [new EmbedBuilder().setDescription(`${cartelcim} isimli üyenin uyarısı bulunamadığından dolayı işlem iptal edili.`)]});
    }
    }
};