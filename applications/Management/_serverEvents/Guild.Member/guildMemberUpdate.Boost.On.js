const Users = require('../../../../database/Schemas/Client.Users');
const { cartelEmbed } = require('../../../../base/Reference/Embed');
const { EmbedBuilder } = require ('discord.js')
module.exports = async (member) => {
    
    let kanalBul = member.guild.kanalBul(kanallar.chatKanalı)
    if(kanalBul) {
        kanalBul.send({content: `${member}, Sunucumuza takviye yaptığınız için teşekkür ederiz.
Bizde sana ufak bir hediye vermek istedik. **+1 Altın**
Ayrıca sunucumuzda bulunan ${member.guild.channels.cache.filter(x => !x.name.includes("log") && (x.name.includes("rol-al") || x.name.includes("rol-alma"))).map(x => x).join(", ")} kanallarına göz atmayı unutma.`}).then(x => {
    setTimeout(() => {
        x.delete().catch(err => {})
    }, 7500);
})
    }
}

module.exports.config = {
    Event: "guildMemberBoost"
}