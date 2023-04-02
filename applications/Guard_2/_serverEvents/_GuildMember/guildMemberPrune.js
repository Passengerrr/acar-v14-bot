const { GuildMember, EmbedBuilder, Message , AuditLogEvent, ChannelType} = require("discord.js");
const fs = require('fs');
const { cartelEmbed } = require("../../../../base/Reference/Embed");

 /**
 * @param {GuildMember} member
 */


module.exports = async (member) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: member.guild.id})
    if(Data && !Data.pruneGuard) return;
    let embed = new EmbedBuilder()
    .setTitle("Sunucuda Üye Çıkar Atıldı!")
    let entry = await member.guild.fetchAuditLogs({type: AuditLogEvent.MemberPrune}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || Date.now() - entry.createdTimestamp > 5000 || await client.checkMember(entry.executor.id, undefined, "Sunucudan Üye Çıkartma!")) return;
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    let cartel = member.guild.kanalBul("guard-log");
    cartel.send({embeds: [embed.setColor("Random").setDescription(`${member} (\`${member.id}\`) üyesi, ${entry.executor} (\`${entry.executor.id}\`) tarafından sunucuda üye çıkartıldı! atan kişi ise yasaklandı.`)]});
    
    const owner = await guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    
    client.processGuard({
        type: "Üye Çıkartma!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "guildMemberRemove"
}
