const { GuildMember, EmbedBuilder, Message, Guild, AuditLogEvent, ChannelType } = require("discord.js");
const fs = require('fs');
const { cartelEmbed } = require("../../../../base/Reference/Embed");
const Users = require('../../../../database/Schemas/Client.Users');
const ms = require('ms')
const dataLimit = new Map()
 /**
 * @param {GuildMember} oldMember
 * @param {GuildMember} newMember
 */

module.exports = async (oldMember, newMember) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: oldMember.guild.id})
    if(Data && !Data.memberRoleGuard) return;
    const permissionStaff = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
    let embed = new EmbedBuilder()
    .setTitle("Sunucuda Sağ-Tık Rol Verildi/Alındı!")
    if (newMember.roles.cache.size > oldMember.roles.cache.size) {
    let entry = await newMember.guild.fetchAuditLogs({type: AuditLogEvent.MemberRoleUptade}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "member" ,"Sağ-Tık Rol/Ver Alma!")) return;
        if (permissionStaff.some(p => oldMember.permissions.has(p) && newMember.permissions.has(p))) {
       
                await newMember.roles.set(oldMember.roles.cache.map(r => r.id))  
                let cartel = member.guild.kanalBul("guard-log");
    cartel.send({embeds: [embed.setColor("Random").setDescription(`${newMember} (__${newMember.id}__) üyesine ${entry.executor} (__${entry.executor.id}__) tarafından Sağtık Rol İşlemi Yapıldı! Veren kişi cezalandırıldı ve verilen kişiden rol geri alındı.`)]});
          
                await client.punitivesAdd(entry.executor.id, "jail")
                const owner = await newMember.guild.fetchOwner();
                if(owner) owner.send({embeds: [embed]}).catch(err => {})
                client.processGuard({
                    type: "Sağ-tık Rol Verme/Alma!",
                    target: entry.executor.id,
                    member: newMember.id,
                })
            
        }
    };
}

module.exports.config = {
    Event: "guildMemberUpdate"
}




