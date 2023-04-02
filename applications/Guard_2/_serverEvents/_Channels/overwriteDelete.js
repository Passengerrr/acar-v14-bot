const { GuildMember, EmbedBuilder, GuildChannel, Permissions, AuditLogEvent, ChannelType } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");


 /**
 * @param {GuildChannel} oldChannel
 * @param {GuildChannel} newChannel
 */


module.exports = async (oldChannel, newChannel) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: oldChannel.guild.id})
    if(Data && !Data.channelGuard) return;
    let embed = new EmbedBuilder().setTitle("Sunucuda Kanal İzni Silindi!")
    let entry = await newChannel.guild.fetchAuditLogs({type: AuditLogEventChannelOverwriteDelete}).then(audit => audit.entries.first())
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "channels" ,"Kanal İzni Silindi!")) return;
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    let cartel = member.guild.kanalBul("guard-log");
    cartel.send({embeds: [embed.setColor("Random").setDescription(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`#${oldChannel.name}\` isimli kanalda izni sildi ve yasaklandı.`)]});
    
    await newChannel.permissionOverwrites.set(oldChannel.permissionOverwrites.cache.array());
    
    const owner = await newChannel.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Kanal İzni Silme!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "channelUpdate"
}
