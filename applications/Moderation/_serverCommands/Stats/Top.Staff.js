const { Client, Message, EmbedBuilder } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Users = require('../../../../database/Schemas/Client.Users');
module.exports = {
  Isim: "topyetkili",
  Komut: ["topyetkililer"],
  Kullanim: "topyetkili",
  Aciklama: "",
  Kategori: "stat",
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
    let load = await message.reply({content: `${message.guild.name} sunucusuna ait yetkili çekme sıralaması yükleniyor. Lütfen bekleyin!`})
    let embed = new EmbedBuilder()
    let findedIndex = ''
    let data = await Users.find()
      let topTagli = data.filter(x => x.Staffs).sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam2 = 0;
        cartelcim2Toplam2 = cartelcim2.Staffs.length
        let cartelcim1Toplam2 = 0;
        cartelcim1Toplam2 = cartelcim1.Staffs.length
        return cartelcim2Toplam2-cartelcim1Toplam2;
    }).map((m, index) => {
        let cartelcimToplam2 = 0;
        cartelcimToplam2 = m.Staffs.length
        if(m._id == message.author.id && (index + 1) > 20) findedIndex = `\`${index+1}.\` <@${m._id}>: \` ${cartelcimToplam2} Yetkili \` **(Siz)**`
        return `\`${index + 1}.\` <@${m._id}>: \` ${cartelcimToplam2} Yetkili \` ${m._id == message.member.id ? `**(Siz)**` : ``}`;
    }).slice(0, 20).join('\n');

    load.edit({content: null, embeds: [embed.setColor("Random").setDescription(`Aşağı da **${message.guild.name}** sunucusunun en iyi yetki çekenlerin sıralaması belirtilmiştir.\n\n${topTagli ? `${topTagli}\n${findedIndex}` : `${cevaplar.prefix} ${message.guild.name} Sunucusun da yetkili bilgileri bulunamadı.`}`)]}).then(x => {
      setTimeout(() => {
        x.delete().catch(err => {})
      }, 20000);
    })
  
  }
};

