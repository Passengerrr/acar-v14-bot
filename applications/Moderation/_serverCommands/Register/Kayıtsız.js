const Kullanici = require('../../../../database/Schemas/Client.Users');
const { cartelEmbed } = require('../../../../base/Reference/Embed');
const getLimit = new Map();

module.exports = {
    Isim: "kayıtsız",
    Komut: ["unregistered","kayitsizyap","kayitsiz"],
    Kullanim: "kayıtsız <@cartel/ID> <Sebep>",
    Aciklama: "Belirlenen üyeyi kayıtsız üye olarak belirler.",
    Kategori: "teyit",
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
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if (getLimit.get(message.author.id) >= ayarlar.kayıtsızLimit) return message.reply(cevaplar.bokyolu).then(s => setTimeout(() => s.delete().catch(err => {}), 7500));
    if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.author.id === cartelcim.id) return message.reply(cevaplar.kendi).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(cartelcim.user.bot) return message.reply(cevaplar.bot).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!cartelcim.manageable) return message.reply(cevaplar.dokunulmaz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.reply(cevaplar.yetkiust).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(roller.kayıtsızRolleri.some(x => cartelcim.roles.cache.has(x))) return message.reply(cevaplar.kayıtsız).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let sebep = args.splice(1).join(" ");
    if(!sebep) return message.reply(cevaplar.sebep).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(ayarlar.isimyas) {
      if(ayarlar.type) {
        await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag  : (ayarlar.tagsiz ? ayarlar.tagsiz  : (ayarlar.tag || ""))} İsim | Yaş`)
      } else {
        await cartelcim.setNickname(`İsim | Yaş`)
      }
    } else {
      if(ayarlar.type) {
        await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag  : (ayarlar.tagsiz ? ayarlar.tagsiz  : (ayarlar.tag || ""))} Kayıtsız`)
      } else {
        await cartelcim.setNickname(`Kayıtsız`)
      }
    }
    cartelcim.setRoles(roller.kayıtsızRolleri)
    if(cartelcim.voice.channel) cartelcim.voice.disconnect()
    let data = await Kullanici.findOne({_id: cartelcim.id});
    if(data && data.Name) await Kullanici.updateOne({_id: cartelcim.id}, {$set: { "Gender": "Kayıtsız" }, $push: { "Names": { Staff: message.member.id, Date: Date.now(), Name: data.Name, State: "Kayıtsıza Atıldı" } } }, { upsert: true })
    cartelcim.Delete()
    cartelcim.removeStaff()
    let kayıtsızLog = message.guild.kanalBul("kayıtsız-log")
    if(kayıtsızLog) kayıtsızLog.send({embeds: [ new EmbedBuilder().setDescription(`${cartelcim} isimli üye ${message.author} tarafından <t:${String(Date.now()).slice(0, 10)}:R> **${sebep}** nedeniyle \`${message.guild.name}\` sunucusunda kayıtsız üye olarak belirlendi.`)]})
    message.reply({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} ${cartelcim} üyesi, **${sebep}** nedeniyle başarıyla kayıtsız'a gönderildi.`)]})
    cartelcim.send({embeds: [new EmbedBuilder().setDescription(`${message.author} tarafından \`${sebep}\` sebebi ile <t:${String(Date.now()).slice(0, 10)}:R> kayıtsız'a atıldın.`)]}).catch(x => {
      })
    if(Number(ayarlar.kayıtsızLimit) && ayarlar.kayıtsızLimit > 1) {
      if(!message.member.permissions.has('ADMINISTRATOR') && !sistem._rooter.rooters.includes(message.member.id) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku))) {
        getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) + 1)
        setTimeout(() => {
          getLimit.set(`${message.member.id}`, (Number(getLimit.get(`${message.member.id}`) || 0)) - 1)
        },1000*60*5)
      }
    }
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    }
};