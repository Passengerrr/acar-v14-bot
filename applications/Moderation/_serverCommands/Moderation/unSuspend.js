const { Client, Message, EmbedBuilder} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Jail = require('../../../../database/Schemas/Punitives.Jails');
const Users = require('../../../../database/Schemas/Client.Users');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
module.exports = {
    Isim: "şüpheliçıkart",
    Komut: ["unsuspend", "unsuspect"],
    Kullanim: "şüpheliçıkart <@cartel/ID> <Sebep>",
    Aciklama: "Belirtilen üye yeni bir hesapsa onu şüpheliden çıkartır.",
    Kategori: "yetkili",
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
    if(!roller.jailHammer.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku))  && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(cartelcim.user.bot) return message.reply(cevaplar.bot).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.author.id === cartelcim.id) return message.reply(cevaplar.kendi).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(!cartelcim.manageable) return message.reply(cevaplar.dokunulmaz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.member.roles.highest.position <= cartelcim.roles.highest.position) return message.reply(cevaplar.yetkiust).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let cezakontrol = await Jail.findById(cartelcim.id)
    if(cezakontrol) {
        message.channel.send(`${cevaplar.prefix} Belirtilen üye sistemsel tarafından cezalandırılmış, şüpheli çıkart komutu ile çıkartman münkün gözükmüyor.`).then(x => {
          setTimeout(() => {
            x.delete()
          }, 7500);
        });
        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
        return;
    };
    let User = await Users.findOne({_id: cartelcim.id});
    if(!ayarlar.taglıalım && User && User.Name && User.Names && User.Gender) {
        if(cartelcim && cartelcim.manageable) await cartelcim.setNickname(`${ayarlar.type ? cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag + " " : (ayarlar.tagsiz ? ayarlar.tagsiz + " " : (ayarlar.tag || "")) : ""}${User.Name}`)
        if(User.Gender == "Erkek") await cartelcim.setRoles(roller.erkekRolleri)
        if(User.Gender == "Kadın") await cartelcim.setRoles(roller.kadınRolleri)
        if(User.Gender == "Kayıtsız") cartelcim.setRoles(roller.kayıtsızRolleri)
        if(cartelcim.user.username.includes(ayarlar.tag)) cartelcim.roles.add(roller.tagRolü)
    } else {
        cartelcim.setRoles(roller.kayıtsızRolleri)
        if(cartelcim && cartelcim.manageable && ayarlar.type && ayarlar.isimyas) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type && ayarlar.isimyas) await cartelcim.setNickname(`İsim | Yaş`)
        if(cartelcim && cartelcim.manageable && !ayarlar.type && !ayarlar.isimyas) await cartelcim.setNickname(`Kayıtsız`)
        if(cartelcim && cartelcim.manageable && ayarlar.type && !ayarlar.isimyas) await cartelcim.setNickname(`${cartelcim.user.username.includes(ayarlar.tag) ? ayarlar.tag : (ayarlar.tagsiz ? ayarlar.tagsiz : (ayarlar.tag || ""))} Kayıtsız`)
    }
    let findChannel = message.guild.kanalBul("şüpheli-log")
    if(findChannel) findChannel.send({embeds: [new EmbedBuilder().setDescription(`${cartelcim} kullanıcısının şüpheli durumu <t:${String(Date.now()).slice(0, 10)}:R> ${message.member} tarafından kaldırıldı.`)]})
    
    await message.reply({embeds: [new EmbedBuilder().setDescription(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} isimli üye şüpheli hesap konumundan çıkartıldı!`)]})
    .then(x => {
      setTimeout(() => {
        x.delete()
      }, 7500);
    })
    if(cartelcim) cartelcim.send({embeds: [new EmbedBuilder().setAuthor(cartelcim.user.tag, cartelcim.user.displayAvatarURL({dynamic: true})).setDescription(`${cartelcim.user.tag}, ${message.author} tarafından <t:${String(Date.now()).slice(0, 10)}:R> şüpheliden çıkartıldın.`)]}).catch(x => {
      
    });
    message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
    }
};