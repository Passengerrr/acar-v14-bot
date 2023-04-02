const { Client, Message} = Discord = require("discord.js");
const children = require("child_process");

module.exports = {
    Isim: "pm2",
    Komut: ["pm2-controller"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    
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

    if(!sistem._rooters.rooters.includes(message.member.id)) return;
    const ls = children.exec(`pm2 ${args.join(' ')}`);
    ls.stdout.on('data', async function (data) {
        const arr = await client.splitMessage(data, { maxLength: 1950, char: "\n" }).then(x => x);
        arr.forEach(datas => {
            message.channel.send({ content: `\`\`\`js\n${datas}\`\`\`` })
        });
    });
    }
};