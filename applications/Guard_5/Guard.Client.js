const { cartel } = require('../../base/Clients/Guard.Clients');
const { Mongoose } = require('../../database/Global.MongoDB.Driver');
const client = global.client = new cartel();
const { GUILD } = require('../../base/Reference/Settings');
const { Collection } = require('discord.js');

// Client Ayarları (Başlangıç)
client.botİsmi = "Guard_5"
// Client Ayarları (SON)

Mongoose.Connect()
GUILD.fetch(sistem.SUNUCU.GUILD)
client.fetchCommands(false)
client.fetchEvents(true)
client.connect(sistem.TOKENLER.Guard_5)

