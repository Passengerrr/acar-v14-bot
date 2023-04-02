const { GuildMember, EmbedBuilder, Message, Guild } = require("discord.js");
const { cartelEmbed } = require("../../../../base/Reference/Embed");

 /**
 * @param {Guild} guild
 */


module.exports = async (guild) => {
    let embed = new EmbedBuilder().setTitle("Sunucu Kullanılmaz Halde!")
    client.allPermissionClose()
    embed.setColor("Random").setDescription(`Sunucu kullanılmaz hale getirildiği için otomatik olarak sunucu içerisindeki tüm yönetici, rol yönet, kanal yönet ve diğer izinleri tamamiyle kapattım.`);
    let loged = guild.kanalBul("guard-log");
    if(loged) await loged.send({embeds: [embed]});
    const owner = await guild.fetchOwner();
    if(owner) owner.send({embeds: [embed]}).catch(err => {})
}

module.exports.config = {
    Event: "guildUnavailable"
}
