const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Users = require('../../../../database/Schemas/Client.Users');
module.exports = {
    Isim: "isimler",
    Komut: ["isimsorgu"],
    Kullanim: "isimler <@cartel/ID>",
    Aciklama: "Belirlenen üyenin önceki isim ve yaşlarını gösterir.",
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
    if(!roller.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) return message.reply(cevaplar.yetersiz).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    let cartelcim = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    if (!cartelcim) return message.reply(cevaplar.üyeyok).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    cartelcim = message.guild.members.cache.get(cartelcim.id)
    let isimveri = await Users.findById(cartelcim.id)
    if(isimveri && isimveri.Names) {
    let isimler = isimveri.Names.length > 0 ? isimveri.Names.reverse().map((value, index) => `\`${value.Name}\` (${value.State}) ${value.Staff ? "(<@"+ value.Staff + ">)" : ""}`).join("\n") : "";
	if(isimveri.Names.length < 10) {
        message.reply({embeds: [new EmbedBuilder().setAuthor({ name: cartelcim.user.tag, iconURL: cartelcim.user.avatarURL({dynamic: true})}).setDescription(`${cartelcim} üyesinin toplamda **${isimveri.Names.length || 0}** isim kayıtı bulundu.\n\n${isimler}`)]})
    } else {
        const button1 = new ButtonBuilder()
        .setCustomId('geri')
        .setLabel('◀️ Önceki Sayfa')
        .setStyle(ButtonStyle.Primary);
  const buttonkapat = new ButtonBuilder()
        .setCustomId('kapat')
        .setLabel('❌')
        .setStyle(ButtonStyle.Secondary);
  const button2 = new ButtonBuilder()
        .setCustomId('ileri')
        .setLabel('▶️ Sonraki Sayfa')
        .setStyle(ButtonStyle.Primary);
  Users.findOne({_id: cartelcim.id }, async (err, res) => {
    let msg = await message.reply({embeds: [new EmbedBuilder().setDescription(`${cartelcim} üyesinin isim kayıtları yükleniyor...`)]})
  let pages = res.Names.sort((a, b) => b.Date - a.Date).chunk(10);
  var currentPage = 1
  if (!pages && !pages.length || !pages[currentPage - 1]) return msg.edit({embeds: [new EmbedBuilder().setAuthor({ name: cartelcim.user.tag, iconURL: cartelcim.user.avatarURL({dynamic: true})}).setDescription(`${cartelcim} isimli yetkilinin yükseltim geçmiş bilgisi bulunamadı.`)]}).then(x => setTimeout(() => {x.delete().catch(err => {})}, 7500))
  let embed = new EmbedBuilder().setColor("Random").setAuthor({ name: cartelcim.user.tag, iconURL: cartelcim.user.avatarURL({dynamic: true})}).setFooter({text:`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length}`, iconURL: message.guild.iconURL({dynamic: true})})
  const row = new ActionRowBuilder().addComponents([button1, buttonkapat, button2]);
  if (message.deferred == false){
  await message.deferReply()
  };
  const curPage = await msg.edit({
  embeds: [embed.setColor("Random").setDescription(`${cartelcim} üyesinin isim geçmişi yükleniyor...`)],
  components: [row], fetchReply: true,
  }).catch(err => {});

  await curPage.edit({embeds: [embed.setColor("Random").setDescription(`${cartelcim} üyesinin toplamda **${isimveri.Names.length || 0}** isim kayıtı bulundu.\n\n${pages[currentPage - 1].map((value, index) => `\`${value.Name}\` (${value.State}) ${value.Staff ? "(<@"+ value.Staff + ">)" : ""}`).join("\n")}`)]}).catch(err => {})

  const filter = (i) => i.user.id == message.member.id

  const collector = await curPage.createMessageComponentCollector({
  filter,
  time: 30000,
  });

  collector.on("collect", async (i) => {
  switch (i.customId) {
  case "ileri":
    if (currentPage == pages.length) break;
    currentPage++;
    break;
  case "geri":
    if (currentPage == 1) break;
    currentPage--;
    break;
  default:
    break;
  case "kapat": 
    i.deferUpdate().catch(err => {});
    curPage.delete().catch(err => {})
    return message.react(message.guild.emojiGöster(emojiler.onay_cartel) ? message.guild.emojiGöster(emojiler.onay_cartel).id : undefined);
  }
  await i.deferUpdate();
  await curPage.edit({
  embeds: [embed.setColor("Random").setFooter({text:`${ayarlar.serverName ? ayarlar.serverName : message.guild.name} • ${currentPage} / ${pages.length} `, iconURL: message.guild.iconURL({dynamic: true})}).setDescription(`${cartelcim} üyesinin toplamda **${isimveri.Names.length || 0}** isim kayıtı bulundu.\n\n${pages[currentPage - 1].map((value, index) => `\`${value.Name}\` (${value.State}) ${value.Staff ? "(<@"+ value.Staff + ">)" : ""}`).join("\n")}`)]
  }).catch(err => {});
  collector.resetTimer();
  });
  collector.on("end", () => {
  if(curPage) curPage.edit({
  embeds: [embed.setColor("Random").setFooter({text:`${ayarlar.serverName ? ayarlar.serverName : message.guild.name}`, iconURL: message.guild.iconURL({dynamic: true})}).setDescription(`${cartelcim} isimli üyesinin toplamda \`${res.Names.length || 0}\` adet isim geçmişi bulunmakta.`)],
  components: [],
  }).catch(err => {});
  })
  })
    }
    } else {
         message.reply({embeds: [new EmbedBuilder().setAuthor({ name: cartelcim.user.tag, iconURL: cartelcim.user.avatarURL({dynamic: true})}).setDescription(`${cartelcim} üyesinin isim kayıtı bulunamadı.`)]});
     }
    }
};