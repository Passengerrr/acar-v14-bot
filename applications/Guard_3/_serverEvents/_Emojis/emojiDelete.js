const { GuildMember, EmbedBuilder, Message, Guild, GuildEmoji, AuditLogEvent, ChannelType } = require("discord.js");
const fs = require('fs');
const { cartelEmbed } = require("../../../../base/Reference/Embed");

 /**
 * @param {GuildEmoji} emoji
 */


module.exports = async (emoji) => {
    const Guard = require('../../../../database/Schemas/Guards/Global.Guard.Settings');
    let Data = await Guard.findOne({guildID: emoji.guild.id})
    if(Data && !Data.emojiGuard) return;
    let embed = new EmbedBuilder().setTitle("Sunucuda Emoji Kaldırıldı!")
    let entry = await emoji.guild.fetchAuditLogs({type: AuditLogEvent.EmojiDelete}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await client.checkMember(entry.executor.id, "emoji" ,"Emoji Kaldırma!")) return;
    client.punitivesAdd(entry.executor.id, "jail")
    client.allPermissionClose()
    embed.setColor("Random").setDescription(`${entry.executor} (\`${entry.executor.id}\`) tarafından \`${emoji.name}\` isimli emoji silindi ve cezalandırıldı.`);
    let loged = emoji.guild.kanalBul("guard-log");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await emoji.guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
    client.processGuard({
        type: "Emoji Sildi!",
        target: entry.executor.id,
    })
}

module.exports.config = {
    Event: "emojiDelete"
}
