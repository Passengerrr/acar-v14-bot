const { Client, Message, EmbedBuilder} = require("discord.js");
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Users = require('../../../../database/Schemas/Client.Users');
const Forcebans = require('../../../../database/Schemas/Punitives.Forcebans');
const { cartelEmbed } = require('../../../../base/Reference/Embed');
module.exports = {
    Isim: "kalkmazban-kaldır",
    Komut: ["cartelban-kaldır", "unforceban","kalkmazbankaldır"],
    Kullanim: "kalkmazban-kaldır <@cartel/ID>",
    Aciklama: "Belirlenen üyeyi sunucudan uzaklaştırır.",
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
    if(!sistem._rooter.rooters.includes(message.member.id)) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let cartelcim = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0])
    if(!cartelcim) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    if(message.author.id === cartelcim.id) return message.reply(cevaplar.kendi).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
        await Punitives.findOne({Member: cartelcim.id, Type: "Kalkmaz Yasaklama", Active: true}).exec(async (err, res) => {
                 if(res) {
                    if(res.Staff !== message.author.id) return message.channel.send({embeds: [new EmbedBuilder().setDescription(`${cevaplar.prefix} Bu ceza ${res.Staff ? message.guild.members.cache.get(res.Staff) ? `${message.guild.members.cache.get(res.Staff)} (\`${res.Staff}\`)` : `${res.Staff}` :  `${res.Staff}`} Tarafından cezalandırılmış. **Bu Cezayı Açman Münkün Değil!**`).setFooter({text:"yaptırım yapılan cezada yaptırımı yapan yetkili işlem uygulayabilir."})]}).then(x => {
                        message.react(message.guild.emojiGöster(emojiler.no_cartel) ? message.guild.emojiGöster(emojiler.no_cartel).id : undefined)
                        setTimeout(() => {
                            x.delete()
                        }, 7500);
                    });
                }
                if(res) await Punitives.updateOne({ No: res.No }, { $set: { "Active": false, Expried: Date.now(), Remover: message.member.id} }, { upsert: true })
                await message.guild.members.unban(cartelcim.id).catch(err => {});
                let findChannel = message.guild.kanalBul("forceban-log");
                await Forcebans.deleteOne({ _id: cartelcim.id })
                if(findChannel) await findChannel.send({embeds: [new EmbedBuilder().setDescription(`${cartelcim} kullanıcısının sunucudaki ${res ? `\`#${res.No}\` ceza numaralı kalkmaz yasaklaması` : "kalkmaz yasaklaması"}, <t:${String(Date.now()).slice(0, 10)}:R> ${message.author} tarafından kaldırıldı.`)]})
                await message.channel.send(`${message.guild.emojiGöster(emojiler.onay_cartel)} Başarıyla ${cartelcim} üyesinin ${res ? `(\`#${res.No}\`) ceza numaralı` : "sunucudaki"} kalkmaz yasaklaması kaldırıldı!`);
                message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined)
        })
    
    }
};

  