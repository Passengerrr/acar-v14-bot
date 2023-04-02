const {ButtonBuilder,ActionRowBuilder, GuildMember} = require('discord.js')
const Upstaffs = require('../../../database//Schemas/Plugins/Client.Users.Staffs');
const mongoose = require('mongoose');
let uPConf;
const { cartelEmbed } = require('../../Reference/Embed');
const Users = require('../../../database//Schemas/Client.Users')
const Tasks = require('../../../database//Schemas/Plugins/Client.Users.Tasks')
const Stats = require('../../../database//Schemas/Plugins/Client.Users.Stats')

class Staff {

    static async showPoint(id) {
        var reload = require('require-reload')(require);
        _statSystem = global._statSystem = uPConf=  reload('./Sources/_settings.js');
      let data = await Upstaffs.findOne({_id: id})
      return new Promise(function (resolve, reject) {
            if(data) {
              let _cached = {
                    Point: data.Point || 0,
                    ToplamPuan: data.ToplamPuan || 0,
                    Invite: data.Invite || 0,
                    Tag: data.Tag || 0,
                    Yetkili: data.Yetkili || 0,
                    Register: data.Register || 0    
                }
              resolve(_cached)
          } else {
              reject("ERR: Belirtilen üye yetkili olmadığı için işlem iptal edildi.");
          }
      })
    }

    static async removePoint(id, pnt, tip) {
        var reload = require('require-reload')(require);
        _statSystem = global._statSystem = uPConf=  reload('./Sources/_settings.js');
        if(!uPConf.system) return client.logger.log(`UpStaff Sistemi Kapalı fakat kullanılmaya çalışılıyor.`, "ups");
        const guild = client.guilds.cache.get(sistem.SUNUCU.GUILD)
        let cartelcim = guild.members.cache.get(id)
        if(!cartelcim) return;
        const uP = await Upstaffs.findOne({ _id: cartelcim.id })
        if(ayarlar.type && !cartelcim.user.username.includes(ayarlar.tag)) return;
        if(uP) {
            if(tip == "Invite") {
                if(uP.Mission && !uP.Mission.CompletedInvite && uP.Mission.Invite-1 >= 0)  await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Invite": -1 } }, {upsert: true});
                if (uP && uP.Invite-1 >= 0)  await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Invite": pnt } }, {upsert: true});
                if(uP && uP.Point -1 >= 0) return await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: {"Point": pnt, "ToplamPuan": pnt } }, {upsert: true});
            }
            if(tip == "Taglı") {
                if(uP.Mission && !uP.Mission.CompletedTagged && uP.Mission.Tagged-1 >= 0)  await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Tagged": -1 } }, {upsert: true});
                if (uP && uP.Tag-1 >= 0) await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Tag": pnt } }, {upsert: true});              
                if(uP && uP.Point -1 >= 0) return await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: {"Point": pnt, "ToplamPuan": pnt } }, {upsert: true});
            }
            if(tip == "Kayıt") {
                if (uP && uP.Register-1 >= 0) await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Register": pnt } }, {upsert: true});
                if(uP && uP.Point -1 >= 0) return await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: {"Point": pnt, "ToplamPuan": pnt } }, {upsert: true});
            }
            if(uP.Yönetim) {
                if(tip == "Yetkili") {
                    if(uP.Mission && !uP.Mission.CompletedStaff && uP.Mission.Staff-1 >= 0)  await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Staff": -1 } }, {upsert: true});
                    if (uP && uP.Yetkili-1 >= 0) await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Yetkili": pnt } }, {upsert: true});
                    if(uP && uP.Point -1 >= 0) return await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: {"Point": pnt, "ToplamPuan": pnt } }, {upsert: true});
                }
                
                if(tip == "Görev") {
                    if (uP && uP.Görev-1 >= 0) await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Görev": pnt } }, {upsert: true});
                    if(uP && uP.Point -1 >= 0) return await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: {"Point": pnt, "ToplamPuan": pnt } }, {upsert: true});
                }
              }
        } else {
            return client.logger.log(`[${id}] ID'li yetkilinin puanı silinemedi!`,"log");
        }
    }

    static async addPoint(id, pnt, tip, categoryID) {
        var reload = require('require-reload')(require);
        _statSystem = global._statSystem = uPConf=  reload('./Sources/_settings.js');
        if(!uPConf.system) return client.logger.log(`UpStaff Sistemi Kapalı fakat kullanılmaya çalışılıyor.`, "ups");
        const guild = client.guilds.cache.get(sistem.SUNUCU.GUILD) 
        let cartelcim = guild.members.cache.get(id);
        if(!cartelcim) return;
        const uP = await Upstaffs.findOne({ _id: cartelcim.id })
        if(ayarlar.type && !cartelcim.user.username.includes(ayarlar.tag)) return;
        let görevGetir = await Tasks.findOne({ roleID: cartelcim.roles.hoist ? cartelcim.roles.hoist.id : 0 }) || await Tasks.findOne({ roleID: cartelcim.roles.highest ? cartelcim.roles.highest.id : 0 }) || await Tasks.findOne({ Users: cartelcim.id })
        if(!uP && görevGetir) {
            if(pnt < 0) return;
            return await Upstaffs.updateOne({ _id: cartelcim.id }, { $set: { "staffNo": 1, "staffExNo": 0, "Point": pnt, "ToplamPuan": pnt, "Baslama": Date.now(), "Rolde": Date.now() } }, {upsert: true}); 
        }
        if(!uP) {
            if(!uPConf.staffs.some(x => cartelcim.roles.cache.has(x.rol))) return;
            if(pnt < 0) return;
            if(cartelcim.roles.cache.has(uPConf.endstaff)) return;
            await Upstaffs.updateOne({ _id: cartelcim.id }, { $set: { "staffNo": 1, "staffExNo": 0, "Point": pnt, "ToplamPuan": pnt, "Baslama": Date.now(), "Rolde": Date.now() } }, {upsert: true}); 
            if(tip == "Invite") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Invite": pnt } }, {upsert: true});
            if(tip == "Taglı") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Tag": pnt } }, {upsert: true});
            if(tip == "Kayıt") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Register": pnt } }, {upsert: true});
            if(tip == "Mesaj") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mesaj": pnt, "ToplamMesaj": pnt } }, {upsert: true});
            if(tip == "Bonus") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Bonus": pnt, "ToplamBonus": pnt } }, {upsert: true});
            if(tip == "Toplantı") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Toplantı": pnt, "ToplamToplantı": pnt } }, {upsert: true});        
            if(tip == "Etkinlik") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Etkinlik": pnt, "ToplamEtkinlik": pnt } }, {upsert: true});        
            if(tip == "Yetkili") await await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Yetkili": pnt } }, {upsert: true}); 
            if(tip == "Görev") await await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Görev": pnt } }, {upsert: true});        
            if(tip == "Ses") {
                await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "ToplamSes": pnt} }, {upsert: true}); 
                await Upstaffs.findOne({_id: cartelcim.id},  async (err, data) => {
                        let sespuan = data.Ses.get(categoryID) || 0;
                        let toplamsespuan = data.ToplamSesListe.get(categoryID) || 0;
                        var setle = Number(sespuan) + Number(pnt)
                        var setleiki = Number(toplamsespuan) + Number(pnt)
                        data.Ses.set(categoryID, Number(setle));
                        data.ToplamSesListe.set(categoryID, Number(setleiki));
                        data.save();
                }).catch(err => {})       
            }
            return;
        }
 
        if((uP.Yönetim || görevGetir) && uP.Mission && !uP.Mission.Completed) {
            let logEmbed = new EmbedBuilder().setThumbnail("https://preview.redd.it/qlne8pqzf0301.png?auto=webp&s=70da263d61a6d13378ff2b4aaab10e0bfa233fcf")
            let exRoleYetki = uPConf.staffs.find(x => x.No == uP.staffExNo);
            let MissionData = await Tasks.findOne({roleID: exRoleYetki ? exRoleYetki.rol : 0}) || await Tasks.findOne({ roleID: cartelcim.roles.hoist ? cartelcim.roles.hoist.id : 0 }) || await Tasks.findOne({ roleID: cartelcim.roles.highest ? cartelcim.roles.highest.id : 0 }) 
            let görevLog = cartelcim.guild.kanalBul("görev-tamamlayan")
            if(MissionData) {
                if(MissionData.Active && MissionData.Time && MissionData.Time > 0 && Date.now() >= MissionData.Time) {
                    let amınakodumunKanalı = cartelcim.guild.kanalBul("görev-bilgi")
    let tamamlayanlar = MissionData.Completed || []
    let tamamlamayanlar = []
    let rolGetir = cartelcim.guild.roles.cache.get(MissionData.roleID)
    if(rolGetir) {
      rolGetir.members.forEach(x => {
        if(!MissionData.Completed.includes(x.id)) tamamlamayanlar.push(x.id)
      })
      if(amınakodumunKanalı) amınakodumunKanalı.send({content: `${rolGetir}`, embeds: [new EmbedBuilder()
.setAuthor(rolGetir.name, "https://cdn.discordapp.com/emojis/943285259733184592.png?size=96&quality=lossless")
.setDescription(`Görev tamamlama zamanınız <t:${String(Date.now()).slice(0, 10)}:R> doldu!

**İlk görevi tamamlayan**: ${cartelcim.guild.members.cache.get(tamamlayanlar[0]) ? `${cartelcim.guild.members.cache.get(tamamlayanlar[0])}` : `\` Tespit Edilmedi! \``}
**Görevi tamamlayan**: \` ${tamamlayanlar.length} Kişi \`
**Görevi tamamlamayanlar**: \` ${tamamlamayanlar.length} Kişi \`

Görevi tamamlamayanlar yönetici onayı ile otomatik olarak düşürülecektir.
Görevi tamamlayanlar ise yönetici onayı ile otomatik olarak yükseltilecektir veya yeni göreve tabi tutulacaktır.
`).setFooter({text:`Anlık güncelleme ile "${rolGetir.name}" rolüne ait görev tamamiyle bitmiştir.`})], 

})
    }
    await Tasks.updateOne({roleID: MissionData.roleID}, {$set: {"Active": false}}, {upsert: true});
    return;
          }
                if(!MissionData.Active) return;
                if(tip == "Invite" && MissionData.Invite >= 1 && !uP.Mission.CompletedInvite) {
                    await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Invite": 1 } }, {upsert: true});
                    if(uP.Mission.Invite + 1 >= MissionData.Invite) {
                        if(görevLog) görevLog.send({embeds: [logembed.setColor("Random").setDescription(`${cartelcim} isimli görev sahibi, **Davet** görevini <t:${String(Date.now()).slice(0, 10)}:R> tamamlayarak \`${MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}  Görev Puanı\` kazandı.`)]})
                        await Users.updateOne({_id: cartelcim.id}, {$inc: {"Coin": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}}, {upsert: true})
                        await Upstaffs.updateOne({_id: cartelcim.id}, {$set: {"Mission.CompletedInvite": true}},{upsert: true})
                        await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { 
                            "Mission.completedMission": 1,
                            "Görev": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks,
                        } }, {upsert: true}); 

                    }
                }
                if(tip == "Taglı" && MissionData.Tagged >= 1 && !uP.Mission.CompletedTagged) {
                    await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Tagged": 1 } }, {upsert: true});
                    if(uP.Mission.Tagged + 1 >= MissionData.Tagged) {
                        if(görevLog) görevLog.send({embeds: [logembed.setColor("Random").setDescription(`${cartelcim} isimli görev sahibi, **Taglı** görevini <t:${String(Date.now()).slice(0, 10)}:R> tamamlayarak \`${MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}  Görev Puanı\` kazandı.`)]})
                        await Users.updateOne({_id: cartelcim.id}, {$inc: {"Coin": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}}, {upsert: true})
                        await Upstaffs.updateOne({_id: cartelcim.id}, {$set: {"Mission.CompletedTagged": true}},{upsert: true})
                        await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { 
                            "Mission.completedMission": 1,
                            "Görev": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks,
                        } }, {upsert: true}); 

                    }
                }
                if(tip == "Kayıt" && MissionData.Register >= 1 && !uP.Mission.CompletedRegister) {
                    if(!roller.teyitciRolleri.some(x => cartelcim.roles.cache.has(x))) return;
                    await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Register": 1 } }, {upsert: true});
                    if(uP.Mission.Register + 1 >= MissionData.Register) {
                        if(görevLog) görevLog.send({embeds: [logembed.setColor("Random").setDescription(`${cartelcim} isimli görev sahibi, **Kayıt** görevini <t:${String(Date.now()).slice(0, 10)}:R> tamamlayarak \`${MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}  Görev Puanı\` kazandı.`)]})
                        await Users.updateOne({_id: cartelcim.id}, {$inc: {"Coin": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}}, {upsert: true})
                        await Upstaffs.updateOne({_id: cartelcim.id}, {$set: {"Mission.CompletedRegister": true}},{upsert: true})
                        await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { 
                            "Mission.completedMission": 1,
                            "Görev": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks,
                        } }, {upsert: true}); 
                        
                    }
                }
                if(tip == "Yetkili" && MissionData.Staff >= 1 && !uP.Mission.CompletedStaff) {
                    await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Staff": 1 } }, {upsert: true});
                    if(uP.Mission.Staff + 1 >= MissionData.Staff) {
                        if(görevLog) görevLog.send({embeds: [logembed.setColor("Random").setDescription(`${cartelcim} isimli görev sahibi, **Yetkili** görevini <t:${String(Date.now()).slice(0, 10)}:R> tamamlayarak \`${MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}  Görev Puanı\` kazandı.`)]})
                        await Users.updateOne({_id: cartelcim.id}, {$inc: {"Coin": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}}, {upsert: true})
                        await Upstaffs.updateOne({_id: cartelcim.id}, {$set: {"Mission.CompletedStaff": true}},{upsert: true})
                        await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { 
                            "Mission.completedMission": 1,
                            "Görev": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks,
                        } }, {upsert: true});
                        
                    }
                }   
                if(tip == "Sorumluluk" && MissionData.Sorumluluk >= 1 && !uP.Mission.CompletedSorumluluk) {
                    await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mission.Sorumluluk": pnt } }, {upsert: true});
                    if(uP.Mission.Sorumluluk >= MissionData.Sorumluluk) {
                        if(görevLog) görevLog.send({embeds: [logembed.setColor("Random").setDescription(`${cartelcim} isimli görev sahibi, **Liderlik/Sorumluluk** görevini <t:${String(Date.now()).slice(0, 10)}:R> tamamlayarak \`${MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}  Görev Puanı\` kazandı.`)]})
                        await Users.updateOne({_id: cartelcim.id}, {$inc: {"Coin": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks}}, {upsert: true})
                        await Upstaffs.updateOne({_id: cartelcim.id}, {$set: {"Mission.CompletedSorumluluk": true}},{upsert: true})
                        await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { 
                            "Mission.completedMission": 1,
                            "Görev": MissionData.Reward ? MissionData.Reward  : uPConf.points.tasks,
                        } }, {upsert: true});
                      
                    }
                }   
                let syncData = await Upstaffs.findOne({ _id: cartelcim.id })
                if(MissionData.countTasks && Number(MissionData.countTasks) > 0 && Number(syncData.Mission.completedMission) && Number(syncData.Mission.completedMission) >= 1) {
                    if(Number(syncData.Mission.completedMission) >= Number(MissionData.countTasks)) {
                     if(MissionData.Completed && MissionData.Completed.length > 0 && MissionData.Completed.includes(cartelcim.id)) return;
                     if(görevLog) görevLog.send({content:`${cartelcim}`,embeds: [new EmbedBuilder()
                      .setThumbnail("https://cdn.discordapp.com/attachments/985356878034911313/985361738813808700/unknown.png")
                      .setDescription(`${cartelcim} (\`${cartelcim.id}\`) isimli görev sahibi, görev gereksinimlerini başarıyla <t:${String(Date.now()).slice(0, 10)}:R> tamamladı. ${cartelcim.guild.emojiGöster(emojiler.onay_cartel)}
${MissionData.Completed.length > 0 ? `Onunla beraber <@&${MissionData.roleID}> rolünün görevini **${MissionData.Completed.filter(x => x != cartelcim.id).length}** kişi tamamladı.` : `Tebrik Ederim İlk <@&${MissionData.roleID}> Rolünün Görevini Tamamladı!`}`)
                    ]})
                    await Tasks.updateOne({roleID: MissionData.roleID}, {$push: {"Completed": cartelcim.id}}, {upsert: true})
                    }
                  }
               return
            } 
            
        }

        if(cartelcim.roles.cache.has(uPConf.endstaff)) return;
        if(uP.Yönetim || görevGetir) return;
        if(!uPConf.staffs.some(x => cartelcim.roles.cache.has(x.rol))) return;
        await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: {"Point": pnt, "ToplamPuan": pnt } }, {upsert: true});
        if(tip == "Invite") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Invite": pnt } }, {upsert: true});
		if(tip == "Taglı") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Tag": pnt } }, {upsert: true});
		if(tip == "Kayıt") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Register": pnt } }, {upsert: true});
        if(tip == "Mesaj") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Mesaj": pnt, "ToplamMesaj": pnt } }, {upsert: true});
        if(tip == "Bonus") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Bonus": pnt, "ToplamBonus": pnt } }, {upsert: true});
        if(tip == "Toplantı") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Toplantı": pnt, "ToplamToplantı": pnt } }, {upsert: true});        
        if(tip == "Etkinlik") await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Etkinlik": pnt, "ToplamEtkinlik": pnt } }, {upsert: true}); 
        if(uP.Yönetim && tip == "Yetkili") await await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Yetkili": pnt } }, {upsert: true}); 
        if(uP.Yönetim && tip == "Görev") await await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "Görev": pnt } }, {upsert: true});          
        if(tip == "Ses") {
            await Upstaffs.updateOne({ _id: cartelcim.id }, { $inc: { "ToplamSes": pnt} }, {upsert: true}); 
            await Upstaffs.findOne({_id: cartelcim.id },  async (err, data) => {
                    let sespuan = data.Ses.get(categoryID) || 0;
                    let toplamsespuan = data.ToplamSesListe.get(categoryID) || 0;
                    var setle = Number(sespuan) + Number(pnt)
                    var setleiki = Number(toplamsespuan) + Number(pnt)
                    data.Ses.set(categoryID, Number(setle));
                    data.ToplamSesListe.set(categoryID, Number(setleiki));
                    data.save();
            }).catch(err => {})   
        }

        let exRoleYetki = uPConf.staffs.find(x => x.No == uP.staffExNo);
        if(exRoleYetki.exrol) {
        if(!exRoleYetki.exrol.some(x => cartelcim.roles.cache.has(x))) cartelcim.roles.add(exRoleYetki.exrol)
        }
        let Yetki = uPConf.staffs.find(x => x.No == uP.staffNo)
        if(!Yetki) return;
        let yeniPuan = Yetki.Puan
        if(!yeniPuan) return;
        if (uP && uPConf.staffs.some(x => uP.Point >= yeniPuan)) {
          if(Yetki.Atlama) return;
          let yeniYetki = uPConf.staffs.filter(x => x.No == uP.staffNo);
          yeniYetki = yeniYetki[yeniYetki.length-1];
          const eskiYetki = uPConf.staffs[uPConf.staffs.indexOf(yeniYetki)-1];

          if(roller.altYönetimRolleri.some(x => yeniYetki.rol === x || yeniYetki.exrol.includes(x)) || roller.yönetimRolleri.some(x =>  yeniYetki.rol === x || yeniYetki.exrol.includes(x)) || roller.üstYönetimRolleri.some(x =>  yeniYetki.rol === x || yeniYetki.exrol.includes(x))) {
            await Upstaffs.updateOne({_id: cartelcim.id}, { $set: {"Yönetim": true }}, {upsert: true})
            } else {
                await Upstaffs.updateOne({_id: cartelcim.id}, { $set: {"Yönetim": false }}, {upsert: true})
            }
          await Upstaffs.updateOne({_id: cartelcim.id}, { $set: {"Rolde": Date.now() }}, {upsert: true})
          let newRoles = []
          cartelcim.roles.cache.filter(x => eskiYetki.rol != x.id && !eskiYetki.exrol.includes(x.id)).map(x => newRoles.push(x.id))
          if(yeniYetki && yeniYetki.rol) {
            newRoles.push(yeniYetki.rol)
            if(yeniYetki.exrol && yeniYetki.exrol.length >= 1) newRoles.push(...yeniYetki.exrol)
          }
          cartelcim.roles.set(newRoles)
          await Users.updateOne({ _id: cartelcim.id }, { $push: { "StaffLogs": {
              Date: Date.now(),
              Process: "OTOMATİK YÜKSELME",
              Role: yeniYetki ? yeniYetki.rol : roller.başlangıçYetki,
              Author: cartelcim.id
          }}}, { upsert: true }) 
          
          let embed = new EmbedBuilder()
          let yetkiAtladınKanal = guild.kanalBul(kanallar.TerfiLog) || guild.kanalBul("terfi-log") || guild.kanalBul("yetki-atladın")
          if(yetkiAtladınKanal)  yetkiAtladınKanal.send({embeds: [embed.setColor("Random").setDescription(`:tada: ${cartelcim.toString()} üyesi gereken puana ulaştı ve ${yeniYetki.exrol ? `<@&${yeniYetki.rol}>, `+ yeniYetki.exrol.map(x => cartelcim.guild.roles.cache.get(x)).join(", ") : Array.isArray(yeniYetki.rol) ? yeniYetki.rol.map(x => `<@&${x}>`).join(", ") : `<@&${yeniYetki.rol}>`} isimli yetki rol(leri) verildi!`)]});
          await Upstaffs.updateOne({ _id: cartelcim.id }, { $set: { "Point": 0, "staffNo": uP.staffNo += 1, "staffExNo": uP.staffNo -= 1, "Invite": 0,  "Tag": 0, "Yetkili": 0, "Görev": 0, "Register": 0, "Ses": new Map(), "Mesaj": 0, "Bonus": 0, "Toplantı": 0, "Etkinlik": 0 }}, {upsert: true});
          await Stats.updateOne({userID: cartelcim.id}, {$set: { "upstaffVoiceStats": new Map(), "upstaffChatStats": new Map()}}, {upsert: true})

	} 
        
    }

}

module.exports = Staff 