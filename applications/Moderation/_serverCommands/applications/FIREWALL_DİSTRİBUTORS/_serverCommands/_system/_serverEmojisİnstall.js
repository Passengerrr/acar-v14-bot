const { Client, Message, EmbedBuilder} = require("discord.js");
const { cartelEmbed } = require('../../../../base/Reference/Embed')
module.exports = {
    Isim: "emojikur2",
    Komut: ["emkur2"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
    const emojis = [

            // Penal & Require

        { name: "maviDegnek", url: "https://cdn.discordapp.com/emojis/843809647675834398.gif"},
        { name: "sariYildiz", url: "https://cdn.discordapp.com/emojis/909164076570116167.gif?size=44"},

            // UpStaff
        { name: "baslangicBar", url: "https://cdn.discordapp.com/emojis/1056636223977959494.png" },
        { name: "baslamaBar", url: "https://cdn.discordapp.com/emojis/1056980594707402782.png" },
        {name: "warning", url: "https://cdn.discordapp.com/emojis/992534211053486153.webp?size=96&quality=lossless"},
        {name: "mail", url: "https://cdn.discordapp.com/emojis/984956292152061982.webp?size=96&quality=lossless"},
        { name: "doluBar", url: "https://cdn.discordapp.com/emojis/1056980428499722270.png" },
        { name: "doluBitisBar", url: "https://cdn.discordapp.com/emojis/1056980464788840628.png" },
        { name: "bosBar", url: "https://cdn.discordapp.com/emojis/1056279090904178738.png" },
        { name: "bosBitisBar", url: "https://cdn.discordapp.com/emojis/988437379121557514.png" },
        { name: "icon", url: "https://cdn.discordapp.com/emojis/1056279166590394408.png" },
        { name: "miniicon", url: "https://cdn.discordapp.com/emojis/1056279166590394408.png" },

            // Task

      ];
  
      const numEmojis = [
        { name: "sifir", url: "https://cdn.discordapp.com/emojis/804121295875866645.gif?size=96" },
        { name: "bir", url: "https://cdn.discordapp.com/emojis/804121340818096158.gif?size=96" },
        { name: "iki", url: "https://cdn.discordapp.com/emojis/804121379183656990.gif?size=96" },
        { name: "uc", url: "https://cdn.discordapp.com/emojis/804121470997495828.gif?size=96" },
        { name: "dort", url: "https://cdn.discordapp.com/emojis/804122294644506634.gif?size=96" },
        { name: "bes", url: "https://cdn.discordapp.com/emojis/804122311732625409.gif?size=96" },
        { name: "alti", url: "https://cdn.discordapp.com/emojis/804122334117101599.gif?size=96" },
        { name: "yedi", url: "https://cdn.discordapp.com/emojis/804122378929176586.gif?size=96" },
        { name: "sekiz", url: "https://cdn.discordapp.com/emojis/804122401956560906.gif?size=96" },
        { name: "dokuz", url: "https://cdn.discordapp.com/emojis/804122434068414474.gif?size=96" }
      ];
  
      emojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
        const emoji = await message.guild.emojis.create(x.url, x.name);
        message.channel.send({embeds: [new EmbedBuilder().setDescription(`\`${x.name}\` isimli emoji oluşturuldu! ${emoji.toString()}`)]})

        
      
      });

    }
};