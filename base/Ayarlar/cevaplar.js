let prefix = `${client.guilds.cache.get(global.sistem.SUNUCU.GUILD).emojiGöster(emojiler.no_cartel)}`
let uyari = `${client.guilds.cache.get(global.sistem.SUNUCU.GUILD).emojiGöster(emojiler.warn)}`
module.exports = {
    prefix,
    yetersiz:          ``,
    bot:           `${uyari} Botlar Üzerinde İşlem Yapamazsınız.`,
    üye:           `${uyari} Bir üye etiketle ve tekrardan dene!`,
    süre:          `${uyari} İşlemin Yapılması İçin Bir Süre Belirtin.`,
    sebep:         `${uyari} İşlemin Tamamlanmması İçin Bir Sebep Bildirin.`,
    yetkiust:      `${uyari} İşlem Yapılan Üyeye Erişimin Bulunmuyor.`,
    dokunulmaz:    `${uyari} İşlem Yapılan Üyeye Bot'un Erişimi Bulunmuyor.`,
    kayıtlı:       `${uyari} Belirtiğiniz kullanıcı zaten kayıtlı olduğu için işlem iptal edildi.`,
    kayıtsız:      `${uyari} Kayıtsız kullanıcıyı tekrardan kayıtsıza atamazsınız`,
    kendi:         `${uyari} Kendi Üzerine İşlem Uygulayamazsın.`,
    bulunamadi:    `${uyari} Belirttiğiniz ID sunucu veya da sistem içerisinde bulunamadı.`,
    üyeyok:        `${uyari} Belirtilen kullanıcı sunucu içerisinde görüntülenemedi.`,
    yenihesap:     `${uyari} Belirtilen kullanıcı bir haftadan önce hesabı kurulduğu için işlem iptal edildi.`,
    cezalicartelim: `${uyari} Belirtilen kullanıcı cezalı olduğu için işlem iptal edildi.`,
    yetersizyaş:   `${uyari} Belirtilen kullanıcının yaşı ${ayarlar ? ayarlar.minYaş : 0}'den küçük olduğu için kayıt işlemi yapılamıyor.`,
    argümandoldur: `${uyari} Belirtilen argümanlar geçersiz olduğu için işlem iptal edildi.`,
    taglıalım:     `${uyari} Belirtilen kullanıcının isminde Sunucu Tagı bulunmadığından işleme iptal edildi.`, 
    isimapi:       `${uyari} Belirtilen isim 32 karakterden uzun olduğu için işlem iptal edildi.`,
    cezavar:       `${uyari} Belirtilen kullanıcının aktif bir cezalandırılması bulunduğundan işlem uygulanamaz.`,
    cezayok:       `${uyari} Belirtilen kullanıcının aktif bir cezası bulunmuyor.`,
    yetkilinoban:  `${uyari} Belirtilen kullanıcının üzerinde Yetkili Rolü olduğundan işlem yapılamıyor.`,
    yasaklamayok:  `${uyari} Sunucuda herhangi bir yasaklama bulunmuyor.`,
    ayarlamayok:    `Belirtilen komutun ayarları yapılmadığından dolayı işlem iptal edildi.`,
    notSetup: `Lütfen kullanılan komut ayarlarını tamamlayın. \`${global.sistem.botSettings.Prefixs[0]}setup\` komutundan kurulumunu yapınız.`,
    data: `${uyari} Belirtilen kullanıcının geçmişi bulunamadı.`,
    bokyolu: `${uyari} Kullanım hakkınız dolduğu için işleminiz iptal edildi. ` 

}