const { GuildMember, EmbedBuilder, Message, Guild, GuildChannel, AuditLogEvent, ChannelType } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");

 /**
 * @param {GuildChannel} channel
 */


module.exports = async (channel) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: channel.guild.id})
    if(Data && !Data.webhookGuard) return;
    let embed = new EmbedBuilder().setTitle("Sunucuda Webhook Kaldırıldı!")
    let entry = await channel.guild.fetchAuditLogs({type: AuditLogEvent.WebhookDelete}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, undefined ,"Webhook Silme!")) return;
    client.punitivesAdd(entry.executor.id, "ban")
    client.allPermissionClose()
    embed.setColor("Random").setDescription(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`${channel.name}\` kanalında webhook sildi ve sildiği gibi cezalandırıldı.`);
    let loged = channel.guild.kanalBul("guard-log");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await channel.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Webhook Silindi!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "webhookUpdate"
}
