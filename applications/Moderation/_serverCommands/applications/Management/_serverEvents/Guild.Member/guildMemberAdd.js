const { Collection, EmbedBuilder, ChannelType } = require('discord.js')
const alwaysJoined = new Collection()
const Invite = require('../../../../database/Schemas/Global.Guild.Invites')
const Users = require('../../../../database/Schemas/Client.Users');
const Jails = require('../../../../database/Schemas/Punitives.Jails');
const VMutes = require('../../../../database/Schemas/Punitives.Vmutes');
const Mutes = require('../../../../database/Schemas/Punitives.Mutes');
const Forcebans = require('../../../../database/Schemas/Punitives.Forcebans');
const Punitives = require('../../../../database/Schemas/Global.Punitives');
const Settings = require('../../../../database/Schemas/Global.Guild.Settings');
const Welcome = require('../../../../database/Schemas/Others/Guild.Welcome.Settings');
const {VK, DC, STREAM} = require('../../../../database/Schemas/Punitives.Activitys');
const { cartelEmbed } = require('../../../../base/Reference/Embed');
const getInvite = new Collection()


 /**
 * @param {Client} client 
 */

client.on("ready", () => {
  setInterval(() => {
    console.log(`[Giriş-Çıkış Temizleme] ${alwaysJoined.length || 0} veri temizlendi.`)
    alwaysJoined.map((çıkgir, id) => {
      alwaysJoined.delete(id)
    })
  }, 1000 * 60 * 60 * 1)

})

module.exports = async (member) => {
    if(member.guild.id != global.sistem.SUNUCU.GUILD) return;
 
    let User = await Users.findOne({ _id: member.id }) 
    let Jail = await Jails.findOne({ _id: member.id });
    let Forceban = await Forcebans.findOne({ _id: member.id });
    let Underworld =  await Punitives.findOne({Member: member.id, Type: "Underworld", Active: true})
    const _findServer = await Settings.findOne({ guildID: sistem.SUNUCU.GUILD })
    const _set = global._set = _findServer.Ayarlar
    let OneWeak = Date.now()-member.user.createdTimestamp <= 1000*60*60*24*7;
    member = member.guild.members.cache.get(member.id)
    let cezaPuan = await member.cezaPuan()
    let amkSürekliÇıkıyoGiriyo = alwaysJoined.get(member.id) || 0
    if(amkSürekliÇıkıyoGiriyo >= 3) {
      let hgKanalı = member.guild.channels.cache.get(_set.hoşgeldinKanalı)
      if(hgKanalı) hgKanalı.send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucuya sürekli fazla giriş yaptığı için işlem uygulandı.`)]}).then(x => {})
      alwaysJoined.delete(member.id)
      return await member.ban({reason: "Sürekli Çıkış/Giriş işlemi uygulamak."})
    } else {
      if(!member) return;
      let getir = alwaysJoined.get(member.id) || 0
      alwaysJoined.set(member.id, getir + 1)
    }
    if(_set.otoIsim && User && User.Name && User.Names && User.Gender && User.Gender != "Kayıtsız") {
      await member.setNickname(`${_set.type ? member.user.username.includes(_set.tag) ? _set.tag + " " : (_set.tagsiz ? _set.tagsiz + " " : (_set.tag || "")) : ""}${User.Name}`).catch(err => {});    
    } else {
      await member.setNickname(`Kayıtsız`).catch(err => {});
      if(member && member.manageable && _set.type && _set.isimyas) await member.setNickname(`${member.user.username.includes(_set.tag) ? _set.tag : (_set.tagsiz ? _set.tagsiz : (_set.tag || ""))} İsim | Yaş`)
      if(member && member.manageable && !_set.type && _set.isimyas) await member.setNickname(`İsim | Yaş`)
      if(member && member.manageable && !_set.type && !_set.isimyas) await member.setNickname(`Kayıtsız`)
      if(member && member.manageable && _set.type && !_set.isimyas) await member.setNickname(`${member.user.username.includes(_set.tag) ? _set.tag : (_set.tagsiz ? _set.tagsiz : (_set.tag || ""))} Kayıtsız`)
    }
    if(OneWeak) {
        await member.setRoles(_set.şüpheliRolü)
        await member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucuya katıldı fakat hesabı ${global.timeTag(Date.parse(member.user.createdAt))} açıldığı için şüpheli olarak işaretlendi.`)]});
        return member.guild.kanalBul("şüpheli-log").send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucuya katıldı fakat hesabı ${global.timeTag(Date.parse(member.user.createdAt))} açıldığı için şüpheli olarak işaretlendi.`)]});
    };
    if(_set.yasakTaglar && _set.yasakTaglar.some(tag => member.user.username.includes(tag) || member.user.discriminator.includes(tag))) {
        await member.setRoles(_set.yasaklıTagRolü)
member.send(`**Merhaba!**
Üzerinizde bulunan **\` ${_set.yasakTaglar.find(x => member.user.username.includes(x) || member.user.discriminator.includes(x))} \`** bu sembol veya etiket yasaklandığı için sizi yasaklı kategorisine ekledik.
\`\`\`
Üzerinizde bulunan yasaklı tag çıkarıldığında kayıtlı iseniz otomatik kayıt olacaksınız kayıtlı değilseniz kayıtsıza tekrardan düşeceksiniz.
\`\`\``).catch(err => {})
        await member.guild.kanalBul("yasaklı-tag-log").send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucuya katıldı fakat isminde yasaklı tag/etiket barındırdığından dolayı yasaklı olarak işaretlendi.`)]});
        return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucumuza katıldı fakat ismininde \` Yasaklı Tag \` bulundurduğu için cezalı olarak belirlendi.`)]});
    };
    if(Jail) {
        await member.setRoles(_set.jailRolü)
        return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucuya katıldı fakat önceden aktif bir cezalandırılması bulunduğu için tekrardan cezalandırıldı.`)]});
    };
    if(Underworld) {
      await member.setRoles(_set.underworldRolü)
      return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucumuza katıldı fakat aktif bir Underworld cezası bulunduğu için tekrardan Underworld'e gönderildi.`)]});
    };
    if(Forceban) {
        await member.ban({ reason: 'Forceban tarafından yasaklandı.' })
        return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new EmbedBuilder().setDescription(`${member} isimli üye sunucumuza katıldı. fakat Kalkmazban sistemi ile yasaklandığından dolayı sunucumuzda tekrar yasaklandı.`)]});
    };
    if(cezaPuan >= 50) {
    	await member.setRoles(_set.jailRolü)
	    await member.send({embeds: [new EmbedBuilder().setDescription(`Merhaba Kullanıcı; \`\`\` Ceza puanın 50'nin üzerinde olduğu için cezalı olarak olarak belirlendin.
\`\`\`fix
Ceza Puanın: \`${cezaPuan}\``)]}).catch(x => {});
      return member.guild.channels.cache.get(_set.hoşgeldinKanalı).send({embeds: [new EmbedBuilder().setDescription(`${member} isimli kullanıcı sunucumuza katıldı, fakat Ceza puanı \`50\` üzeri olduğu için cezalı olarak belirlendi.`)]});
    }
    if(_set.otoKayıt && User && User.Name && User.Names && User.Gender) {
        if(_set.taglıalım) {
          await rolTanımlama(member,_set.kayıtsızRolleri);
          return hoşgeldinMesajı(member);
        }
        let hosgeldinKanal = member.guild.channels.cache.get(_set.hoşgeldinKanalı)
        let chatKanal = member.guild.channels.cache.get(_set.chatKanalı)
        if(User.Gender == "Erkek") {
            if(hosgeldinKanal) hosgeldinKanal.send({embeds: [new EmbedBuilder().setDescription(` ${member} isimli kullanıcı daha önceden sunucu üzerinde kayıtlı olduğu için eski rolleri verilerek kayıt edildi.`)]})
            if(chatKanal) chatKanal.send({embeds: [new EmbedBuilder().setDescription(`${member} kullanıcısı aramıza tekrardan katıldı ona tekrardan hoşgeldin diyelim!`)]}).then(x => {
              setTimeout(() => {
                x.delete().catch(err => {})
              }, 12500)
            })
            await Users.updateOne({_id: member.id}, { $push: { "Names": { Name: User.Name, State: `Oto. Bot Kayıt) (${_set.erkekRolleri.map(x => member.guild.roles.cache.get(x)).join(",")}`, Date: Date.now() }}}, {upsert: true})
            return await rolTanımlama(member,_set.erkekRolleri)
        }
        if(User.Gender == "Kadın") { 
            if(hosgeldinKanal) hosgeldinKanal.send({content:  `${member} isimli kullanıcı daha önceden sunucu üzerinde kayıtlı olduğu için eski rolleri verilerek kayıt edildi.`})
            if(chatKanal) chatKanal.send({embeds: [new EmbedBuilder().setDescription(`${member} kullanıcısı aramıza tekrardan katıldı ona tekrardan hoşgeldin diyelim!`)]}).then(x => {
              setTimeout(() => {
                x.delete().catch(err => {})
              }, 12500)
            })
            await Users.updateOne({_id: member.id}, { $push: { "Names": { Name: User.Name, State: `Oto. Bot Kayıt) (${_set.kadınRolleri.map(x => member.guild.roles.cache.get(x)).join(",")}`, Date: Date.now() }}}, {upsert: true})
            return await rolTanımlama(member,_set.kadınRolleri)
        }
    }
    await rolTanımlama(member,_set.kayıtsızRolleri);
    hoşgeldinMesajı(member);

}

client.on('inviteCreate', async invite => {
    invite.guild.invites.fetch().then((guildInvites) => {
        const cacheInvites = new Collection();
        guildInvites.map((inv) => {
          cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
        });
        getInvite.set(invite.guild.id, cacheInvites);
      });
})

client.on('inviteDelete', async invite => {
    setTimeout(async () => {
        invite.guild.invites.fetch().then((guildInvites) => {
          const cacheInvites = new Collection();
          guildInvites.map((inv) => {
            cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
          });
          getInvite.set(invite.guild.id, cacheInvites);
        });
      }, 5000)
})

client.on('ready', async () => {
    const guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
    guild.invites.fetch().then((guildInvites) => {
      const cacheInvites = new Collection();
      guildInvites.map((inv) => {
        cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
      });
      getInvite.set(guild.id, cacheInvites);
    });
})

async function hoşgeldinMesajı(member) {
    ayarlar = _set
    const guildInvites = getInvite.get(member.guild.id) || new Collection()
    
    const invites = await member.guild.invites.fetch();
    const invite = invites.find((inv) => guildInvites.has(inv.code) && inv.uses > guildInvites.get(inv.code).uses) || guildInvites.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
    const cacheInvites = new Collection();
    invites.map((inv) => { cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter }); });
    getInvite.set(member.guild.id, cacheInvites);
    let davettaslak;
    if (invite === null) {
        davettaslak = `Özel URL`
      } else if (invite === undefined) {
        davettaslak = `Özel URL`
      } else if (!invite) {
        davettaslak = `Özel URL`
      } else if (invite === member.guild.vanityURLCode) { 
        davettaslak = `Özel URL`
      } else {
          davettaslak = member.guild.members.cache.get(invite.inviter.id) ? `${member.guild.members.cache.get(invite.inviter.id)}`: `Özel URL`
      }
      let hoşgeldinKanal = member.guild.channels.cache.get(_set.hoşgeldinKanalı) || member.guild.kanalBul(_set.hoşgeldinKanalı)
      
      let Data = await Welcome.findOne({guildId: member.guild.id})
      if(hoşgeldinKanal) {
        if(Data) {
          let hoşgeldinTextiAmınakodum = Data.Text
            .replace("-tag-", `${ayarlar.tag ? ayarlar.tag : "Tag Bulunamadı!"}`)
            .replace("-sunucu-", `${ayarlar.serverName ? ayarlar.serverName : member.guild.name}`)
            .replace("-üye-", `${member}`)
            .replace("-üyeid-", `${member.id}`)
            .replace("-kişi-", `${global.sayılıEmoji(member.guild.memberCount)}`)
            .replace("-davet-", `${davettaslak}`)
            .replace("-teyitci-", `${_set ? _set.teyitciRolleri ? `${_set.teyitciRolleri.filter(x => member.guild.roles.cache.has(x)).map(x => `<@&${x}>`).join(", ")}` : `@Rol Bulunamadı!` : `@Rol Bulunamadı!`}`)
            .replace("-oluşturma-", `${global.tarihsel(member.user.createdAt)}`)
            .replace("-kaçyıl-", `${global.timeTag(Date.parse(member.user.createdAt))}`)
            .replace("-kurallar-", `${_set.kurallarKanalı ? `<#${_set.kurallarKanalı}>` : member.guild.kanalBul("kurallar")}`)
            .replace("-teyit-", `${member.guild.channels.cache.filter(x => x.parentId == kanallar.registerKategorisi && x.type == ChannelType.GuildVoice).random()}`)
  
          if(Data.Webhook) {
              hoşgeldinKanal.wsend({content: `${hoşgeldinTextiAmınakodum}`});
          } else {
              hoşgeldinKanal.send({content: `${hoşgeldinTextiAmınakodum}`});
          }
        } else {
                 hoşgeldinKanal.send({embeds: [new EmbedBuilder().setDescription(`${_set.serverName ? `${_set.serverName}` : member.guild.name}'e hoşgeldin, ${member}! Hesabın ${global.tarihsel(member.user.createdAt)} tarihinde oluşturulmuş.
Sunucuya erişebilmek için "V.Confirmed" odalarında kayıt olup isim yaş belirtmen gerekmektedir.

${_set.kurallarKanalı ? `<#${_set.kurallarKanalı}>` : member.guild.kanalBul("kurallar")} kanalından sunucu kurallarımızı okumayı ihmal etme!

Seninle beraber ${(member.guild.memberCount)} kişiyiz. ${davettaslak == "Özel URL" ? `` : `${davettaslak} tarafından davet edildin! :tada::tada::tada:`}
`)
]});
        }
  } 
        
} 


async function rolTanımlama(üye, rol) {
    let Mute = await Mutes.findOne({ _id: üye.id });
    let Vk = await VK.findOne({_id: üye.id});
    let Dc = await DC.findOne({_id: üye.id});
    let Stream = await STREAM.findOne({_id: üye.id});
    let startRoles = [...rol]

    if(Mute) startRoles.push(_set.muteRolü)
    if(_set.vkCezalıRolü && Vk) startRoles.push(_set.vkCezalıRolü)
    if(_set.dcCezalıRolü && Dc) startRoles.push(_set.dcCezalıRolü)
    if(_set.streamerCezalıRolü && Stream) startRoles.push(_set.streamerCezalıRolü)
    if(_set.type && üye.user.username.includes(_set.tag)) await startRoles.push(_set.tagRolü)
    await üye.roles.set(startRoles).then(async (cartel) => {})
}

module.exports.config = {
    Event: "guildMemberAdd"
};

