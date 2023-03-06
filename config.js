//--------------[  CONST  ]-------------//
const fs = require('fs')
const chalk = require('chalk')
//--------------[  GLOBAL  ]-------------//
global.owner = ['6285752765133']
global.packname = 'Created by ZainiZen123'
global.author = ''
global.sessionName = 'session'
global.prefa = ['','!','.','🐦','🐤','🗿']
global.myweb = `https://api-kimimaru.herokuapp.com/`
global.mess = {
    success: '✓ Success',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Loading...',
}
global.thumb = fs.readFileSync('./src/thumb.jpg')
global.thumb2 = fs.readFileSync('./src/thumb2.jpg')
global.menu = fs.readFileSync('./src/menu.jpg')
//--------------[  UPDATE FILE  ]-------------//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
