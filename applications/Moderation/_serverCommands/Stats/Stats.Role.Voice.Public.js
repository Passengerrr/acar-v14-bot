const { EmbedBuilder } = Discord = require("discord.js");
const Stats = require('../../../../database/Schemas/Plugins/Client.Users.Stats')
const InviteData = require('../../../../database/Schemas/Global.Guild.Invites');
const Users = require('../../../../database/Schemas/Client.Users');
const Upstaffs = require('../../../../database/Schemas/Plugins/Client.Users.Staffs');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const moment = require('moment');
require('moment-duration-format');
require('moment-timezone');
module.exports = {
    Isim: "public",
    Komut: ["public","publicodalar"],
    Kullanim: "public <@rol/ID>",
    Aciklama: "Belirlenen role sahip üyelerin public, register ve genel ses denetimini sağlar.",
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
    let embed = new EmbedBuilder()
    if(!roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!rol) return message.reply({content: `${cevaplar.prefix} Denetleyebilmem için lütfen bir rol belirtiniz.`, ephemeral: true })
    if (rol.members.size === 0) return message.reply({content: `${cevaplar.prefix} Belirtilen rolde üye bulunamadığından işlem iptal edildi.`, ephemeral: true }),message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
    let Sesdenetim =  await Stats.find({guildID: message.guild.id});
    Sesdenetim = Sesdenetim.filter(s => message.guild.members.cache.has(s.userID) && message.guild.members.cache.get(s.userID).roles.cache.has(rol.id));
    let veriler = []
    
    let PublicListele = Sesdenetim.sort((cartelcim1, cartelcim2) => {
        let cartelcim2Toplam = 0;
        cartelcim2.voiceStats.forEach((x, key) => {
            if(key == kanallar.publicKategorisi) cartelcim2Toplam += x
        });
        let cartelcim1Toplam = 0;
        cartelcim1.voiceStats.forEach((x, key) => {
            if(key == kanallar.publicKategorisi) cartelcim1Toplam += x
        });
        return cartelcim2Toplam-cartelcim1Toplam;
    }).map((m, index) => {
        let cartelcimToplam = 0;
        m.voiceStats.forEach((x, key) => { if(key == kanallar.publicKategorisi) cartelcimToplam += x });
        veriler.push(m.userID)
        return `\` ${index+1}. \` ${message.guild.members.cache.get(m.userID).toString()} \`${client.sureCevir(cartelcimToplam)}\``;
    }).join('\n');
    let verisizler = rol.members.filter(x => !veriler.includes(x.id))
    let text = `Aşağı da **${rol.name}** (\`${rol.id}\`) rolüne ait haftalık **Public (Genel Ses Odaları)** kategori istatistikleri listelendirilmiştir.
──────────────────────
${PublicListele}${verisizler.size > 0 ? `
──────────────────────
**${rol.name}** rolüne ait **Public (Genel Ses Odaları)** kategorisine ait verileri bulunmayan kullanıcılar şunlardır:
${verisizler.map(x => x).join(", ")}` : ``}`
    message.reply({content: `${text}`}).catch(err => {        
        const arr = Discord.Util.splitMessage(`${text}`, { maxLength: 1950, char: "\n" });
        arr.forEach(element => {
           message.channel.send({content: `${element}`});
        });
    })
  }
};