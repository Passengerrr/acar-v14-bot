const { GuildMember, EmbedBuilder, Message , AuditLogEvent, ChannelType} = require("discord.js");
const fs = require('fs');
const { cartelEmbed } = require("../../../../base/Reference/Embed");

 /**
 * @param {GuildMember} member
 */


module.exports = async (member) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: member.guild.id})
    if(Data && !Data.kickGuard) return;
    let embed = new EmbedBuilder()
    .setTitle("Sunucuda Sağ-Tık Üye Atıldı!")
    let entry = await member.guild.fetchAuditLogs({type: AuditLogEvent.MemberKick}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "member" ,"Sağ-Tık Atma!")) return;
    client.punitivesAdd(entry.executor.id, "jail")
    client.allPermissionClose()
    let cartel = member.guild.kanalBul("guard-log");
    cartel.send({embeds: [embed.setColor("Random").setDescription(`${member} (\`${member.id}\`) üyesi, ${entry.executor} (\`${entry.executor.id}\`) tarafından sunucudan \`Sağ-Tık\` ile atıldı! atan kişi ise yasaklandı.`)]});
    
    const owner = await member.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    
    client.processGuard({
        type: "Sağ-tık Üye Atma!",
        target: entry.executor.id,
        member: member.id,
    })
}

module.exports.config = {
    Event: "guildMemberRemove"
}
