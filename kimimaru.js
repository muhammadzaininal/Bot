require('./config')
//--------------[  CONST  ]-------------//
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const path = require('path')
const os = require('os')
const moment = require('moment-timezone')
const speed = require('performance-now')
const { performance } = require('perf_hooks')
const { JSDOM } = require('jsdom')
const { smsg, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./lib/myfunc')
//--------------[  SETTING BOT  ]-------------//
const footerwm = `ʙʏ K1ᴍɪᴍᴀʀᴜ`
const timtlerepl = `Sᴇʟғʙᴏᴛ Mᴅ ʙʏ K1ᴍɪᴍᴀʀᴜ`
prefix = '.' 
replybiasater = "Hehhh.. Seperti biasa... yang"
const { ind } = require('./language')
lang = ind
autoread = false
autorecording = false
autotyping = false
//--------------[  MODULE  ]-------------//
module.exports = conn = async (conn, m, chatUpdate, store) => {
    try {
        const type = getContentType(m.message)
        const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        const isCmd = body.startsWith(prefix)
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await conn.decodeJid(conn.user.id)
        const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == botNumber ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const isMedia = /image|video|sticker|audio/.test(mime)
//--------------[  GROUP  ]-------------//
        const groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const totalchat = await store.chats.all()
        const replyowner = (texxxt) => {
            conn.sendMessage(`${global.owner}@s.whatsapp.net`, {text: texxxt}, {quoted: m})
        }
        const _uptime = process.uptime() * 1000
        global.u = clockString(_uptime)
        const reply = (tekss) => {
            conn.sendMessage(m.chat, { text: tekss }, {quoted: m})
        }
        try {
            let isNumber = x => typeof x === 'number' && !isNaN(x)
            let chats = global.db.data.chats[m.chat]
            if (typeof chats !== 'object') global.db.data.chats[m.chat] = {}
            if (chats) {
                if (!('mute' in chats)) chats.mute = false
                if (!('antilink' in chats)) chats.antilink = false
            } else global.db.data.chats[m.chat] = {
                mute: false,
                antilink: false,
            }
            let setting = global.db.data.settings[botNumber]
            if (typeof setting !== 'object') global.db.data.settings[botNumber] = {}
            if (setting) {
                if (!isNumber(setting.status)) setting.status = 0
                if (!('autobio' in setting)) setting.autobio = false
                if (!('templateImage' in setting)) setting.templateImage = true
                if (!('templateVideo' in setting)) setting.templateVideo = false
                if (!('templateGif' in setting)) setting.templateGif = false
                if (!('templateMsg' in setting)) setting.templateMsg = false
            } else global.db.data.settings[botNumber] = {
                status: 0,
                autobio: false,
                templateImage: true,
                templateVideo: false,
                templateGif: false,
                templateMsg: false,
            }
        } catch (err) {
        console.error(err)
        }
//--------------[  SELF  ]-------------//
        if (!conn.public) {
            if (!m.key.fromMe && !isCreator) return
        }
//--------------[  CONSOLE  ]-------------//
        if (m.message) {
            console.log(chalk.black(chalk.bgWhite('[ PESAN ]')), chalk.black(chalk.bgGreen(new Date)), chalk.black(chalk.bgBlue(budy || m.mtype)) + '\n' + chalk.magenta('=> Dari'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.blueBright('=> Di'), chalk.green(m.isGroup ? pushname : 'Private Chat', m.chat))
        }
        const sendFileFromUrl = async (from, url, caption, men) => {
            let mime = '';
            let res = await axios.head(url)
            mime = res.headers['content-type']
            if (mime.split("/")[1] === "gif") {
                return conn.sendMessage(from, { video: await getBuffer(url), caption: caption, gifPlayback: true, mentions: men ? men : [], mimetype: 'video/mp4'}, {quoted: m})
            }
            let type = mime.split("/")[0]+"Message"
            if(mime === "application/pdf"){
                return conn.sendMessage(m.chat, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, mentions: men ? men : []}, {quoted: m })
            }
            if(mime.split("/")[0] === "image"){
                return conn.sendMessage(m.chat, { image: await getBuffer(url), caption: caption, mentions: men ? men : []}, {quoted: m})
            }
            if(mime.split("/")[0] === "video"){
                return conn.sendMessage(m.chat, { video: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'video/mp4'}, {quoted: m})
            }
            if(mime.split("/")[0] === "audio"){
                return conn.sendMessage(m.chat, { audio: await getBuffer(url), caption: caption, mentions: men ? men : [], mimetype: 'audio/mpeg'}, {quoted: m })
            }
        }
        let d = new Date(new Date + 3600000)
        let locale = 'id'
        let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
        const week = d.toLocaleDateString(locale, { weekday: 'long' })
        const date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        const dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(d)
        const time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
        let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
//-------------[ FUNCTIONS ]---------------//
        if (autorecording == true) setInterval(async () => {
            if (autorecording == true) await conn.sendPresenceUpdate('recording', m.chat)
        }, 5 * 1000)
        if (autotyping == true) setInterval(async () => {
            if (autotyping == true) await conn.sendPresenceUpdate('composing', m.chat)
        }, 5 * 1000)
        if (autoread == true) {
            conn.readMessages([m.key], m.isGroup ? m.sender : undefined, m.id || m.key.id)
        }
        if (m.key.remoteJid === 'status@broadcast') {
            conn.readMessages([m.key], m.isGroup ? m.sender : undefined, m.id || m.key.id)
        }
//--------------[  COMMAND  ]-------------//
        switch(command) {
            case 'autoread': {
              if (!m.key.fromMe) return
              if (text === "on" || text === "enable") {
                autoread = true
                m.reply("Successfully enable autoread")
              } else if (text === "off" || text === "disable") {
                autoread = false
                m.reply("Successfully disable autoreply")
              } else {
                m.reply("Input query on/off or enable/disable")
              }
            }
            break
            case 'autorecording': case 'autovn': {
               if (!m.key.fromMe) return
               if (text === "on" || text === "enable") {
                 autorecording = true
                 m.reply("Successfully enable autorecording")
               } else if (text === "off" || text === "disable") {
                 autorecording = false
                 m.reply("Successfully disable autorecording")
               } else {
                 m.reply("Input query on/off or enable/disable")
               }
            }
            break
            case 'autotyping': {
               if (!m.key.fromMe) return
               if (text === "on" || text === "enable") {
                 autotyping = true
                 m.reply("Successfully enable autotyping")
               } else if (text === "off" || text === "disable") {
                 autotyping = false
                 m.reply("Successfully disable autotyping")
               } else {
                 m.reply("Input query on/off or enable/disable")
               }
            }
            break
            case 'chat': {
                if (!m.key.fromMe) return
                if (!q) throw 'Option : 1. mute\n2. unmute\n3. archive\n4. unarchive\n5. read\n6. unread\n7. delete'
                if (args[0] === 'mute') {
                    conn.chatModify({ mute: 'Infinity' }, m.chat, []).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'unmute') {
                    conn.chatModify({ mute: null }, m.chat, []).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'archive') {
                    conn.chatModify({  archive: true }, m.chat, []).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'unarchive') {
                    conn.chatModify({ archive: false }, m.chat, []).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'read') {
                    conn.chatModify({ markRead: true }, m.chat, []).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'unread') {
                    conn.chatModify({ markRead: false }, m.chat, []).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'delete') {
                    conn.chatModify({ clear: { message: { id: m.quoted.id, fromMe: true }} }, m.chat, []).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                }
            }
            break
            case 'react': {
                if (!m.key.fromMe) return
                reactionMessage = {
                    react: {
                        text: args[0],
                        key: { remoteJid: m.chat, fromMe: true, id: quoted.id }
                    }
                }
                conn.sendMessage(m.chat, reactionMessage)
            }
            break  
            case 'join': {
                if (!m.key.fromMe) return
                if (!text) throw 'Masukkan Link Group!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await conn.groupAcceptInvite(result).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'leave': {
                if (!m.key.fromMe) return
                await conn.groupLeave(m.chat).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'setexif': {
                if (!m.key.fromMe) return
                if (!text) throw `Example : ${prefix + command} packname|author`
                global.packname = text.split("|")[0]
                global.author = text.split("|")[1]
                reply(`Exif berhasil diubah menjadi\n\n⭓ Packname : ${global.packname}\n⭓ Author : ${global.author}`)
            }
            break
            case 'kick': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'add': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'promote': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'demote': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'block': {
                if (!m.key.fromMe) return
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.updateBlockStatus(users, 'block').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'unblock': {
                if (!m.key.fromMe) return
                let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
                await conn.updateBlockStatus(users, 'unblock').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'setname': case 'setsubject': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (!text) throw 'Text ?'
                await conn.groupUpdateSubject(m.chat, text).then((res) => reply(mess.success)).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'setdesc': case 'setdesk': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (!text) throw 'Text ?'
                await conn.groupUpdateDescription(m.chat, text).then((res) => reply(mess.success)).catch((err) => reply(jsonformat(err)))
            }
            break
            case 'setppbot': case 'setpp':{
                if (!m.key.fromMe) return
                if (!quoted) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                if (!/image/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                if (/webp/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                var media = await conn.downloadAndSaveMediaMessage(quoted)
                try {
                    if (args[0] == "/full") {
                        const { generateProfilePicture } = require("./lib/myfunc")
                        var { img } = await generateProfilePicture(media)
                        await conn.query({ tag: 'iq',  attrs: { to: botNumber, type:'set', xmlns: 'w:profile:picture'}, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]})
                    } else { await conn.updateProfilePicture(botNumber, { url: media }) }
                    m.reply(mess.success)
                } catch { m.reply('Gagal Mengganti Photo Profile') }
            }
            break
            case 'setppgroup': case 'setppgrup': case 'setppgc': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isAdmins) throw mess.admin
                if (!quoted) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                if (!/image/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                if (/webp/.test(mime)) throw `Kirim/Reply Image Dengan Caption ${prefix + command}`
                let media = await conn.downloadAndSaveMediaMessage(quoted)
                try {
                    if (args[0] == "/full") {
                        const { generateProfilePicture } = require("./lib/myfunc")
                        var { img } = await generateProfilePicture(media)
                        await conn.query({ tag: 'iq',  attrs: { to: m.chat, type:'set', xmlns: 'w:profile:picture'}, content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }]})
                        } else { await conn.updateProfilePicture(m.chat, { url: media }) }
                            m.reply(mess.success)
                    } catch { m.reply('Gagal Mengganti Photo Profile') }
            }
            break
            case 'tagall': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isAdmins) throw mess.admin
                let teks = `══✪〘 *👥 Tag All* 〙✪══
                ➲ *Pesan : ${q ? q : '-'}*\n`
                for (let mem of participants) {
                    teks += `➤ @${mem.id.split('@')[0]}\n`
                }
                conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
            }
            break
            case 'hidetag': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isAdmins) throw mess.admin
                conn.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
            }
            break
            case 'group': case 'grup': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (args[0] === 'close'){
                    await conn.groupSettingUpdate(m.chat, 'announcement').then((res) => reply(`Sukses Menutup Group`)).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'open'){
                    await conn.groupSettingUpdate(m.chat, 'not_announcement').then((res) => reply(`Sukses Membuka Group`)).catch((err) => reply(jsonformat(err)))
                } else {
                    let buttons = [
                    { buttonId: 'group open', buttonText: { displayText: 'Open' }, type: 1 },
                    { buttonId: 'group close', buttonText: { displayText: 'Close' }, type: 1 }
                    ]
                await conn.sendButtonText(m.chat, buttons, `Mode Group`, conn.user.name, m)
                }
            }
            break
            case 'editinfo': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (args[0] === 'open'){
                    await conn.groupSettingUpdate(m.chat, 'unlocked').then((res) => reply(`Sukses Membuka Edit Info Group`)).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'close'){
                    await conn.groupSettingUpdate(m.chat, 'locked').then((res) => reply(`Sukses Menutup Edit Info Group`)).catch((err) => reply(jsonformat(err)))
                } else {
                    let buttons = [
                        { buttonId: 'editinfo open', buttonText: { displayText: 'Open' }, type: 1 },
                        { buttonId: 'editinfo close', buttonText: { displayText: 'Close' }, type: 1 }
                    ]
                    await conn.sendButtonText(m.chat, buttons, `Mode Edit Info`, conn.user.name, m)
                }
            }
            break
            case 'antilink': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].antilink) return reply(`Sudah Aktif Sebelumnya`)
                    db.data.chats[m.chat].antilink = true
                    reply(`Antilink Aktif !`)
                } else if (args[0] === "off") {        
                    if (!db.data.chats[m.chat].antilink) return reply(`Sudah Tidak Aktif Sebelumnya`)
                    db.data.chats[m.chat].antilink = false
                    reply(`Antilink Tidak Aktif !`)
                } else {
                    let buttons = [
                        { buttonId: 'antilink on', buttonText: { displayText: 'On' }, type: 1 },
                        { buttonId: 'antilink off', buttonText: { displayText: 'Off' }, type: 1 }
                    ]
                await conn.sendButtonText(m.chat, buttons, `Mode Antilink`, conn.user.name, m)
                }
            }
            break
            case 'mute': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (args[0] === "on") {
                    if (db.data.chats[m.chat].mute) return reply(`Sudah Aktif Sebelumnya`)
                    db.data.chats[m.chat].mute = true
                    reply(`${conn.user.name} telah di mute di group ini !`)
                } else if (args[0] === "off") {
                    if (!db.data.chats[m.chat].mute) return reply(`Sudah Tidak Aktif Sebelumnya`)
                    db.data.chats[m.chat].mute = false
                    reply(`${conn.user.name} telah di unmute di group ini !`)
                } else {
                    let buttons = [
                        { buttonId: 'mute on', buttonText: { displayText: 'On' }, type: 1 },
                        { buttonId: 'mute off', buttonText: { displayText: 'Off' }, type: 1 }
                    ]
                    await conn.sendButtonText(m.chat, buttons, `Mute Bot`, conn.user.name, m)
                }
            }
            break
            case 'linkgroup': case 'linkgc': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                let response = await conn.groupInviteCode(m.chat)
                conn.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink Group : ${groupMetadata.subject}`, m, { detectLink: true })
            }
            break
            case 'ephemeral': {
                if (!m.key.fromMe) return
                if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isAdmins) throw mess.admin
                if (!text) throw 'Masukkan value enable/disable'
                if (args[0] === 'enable') {
                    await conn.sendMessage(m.chat, { disappearingMessagesInChat: WA_DEFAULT_EPHEMERAL }).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                } else if (args[0] === 'disable') {
                    await conn.sendMessage(m.chat, { disappearingMessagesInChat: false }).then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
                }
            }
            break
            case 'delete': case 'del': {
                if (!m.key.fromMe) return
                if (!m.quoted) throw false
                let { chat, fromMe, id, isBaileys } = m.quoted
                if (!isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
            }
            break
            case 'infochat': {
                if (!m.key.fromMe) return
                if (!m.quoted) reply('Reply Pesan')
                let msg = await m.getQuotedObj()
                if (!m.quoted.isBaileys) throw 'Pesan tersebut bukan dikirim oleh bot!'
                let teks = ''
                for (let i of msg.userReceipt) {
                    let read = i.readTimestamp
                    let unread = i.receiptTimestamp
                    let waktu = read ? read : unread
                    teks += `⭓ @${i.userJid.split('@')[0]}\n`
                    teks += ` ┗━⭓ *Waktu :* ${moment(waktu * 1000).format('DD/MM/YY HH:mm:ss')} ⭓ *Status :* ${read ? 'Dibaca' : 'Terkirim'}\n\n`
                }
                conn.sendTextWithMentions(m.chat, teks, m)
            }
            break
            case 'q': case 'quoted': {
                if (!m.key.fromMe) return
                if (!m.quoted) return reply('Reply Pesannya!!')
                let wokwol = await conn.serializeM(await m.getQuotedObj())
                if (!wokwol.quoted) return reply('Pesan Yang anda reply tidak mengandung reply')
                await wokwol.quoted.copyNForward(m.chat, true)
            }
            break
            case 'listpc': {
                if (!m.key.fromMe) return
                let anu = await store.chats.all().filter(v => v.id.endsWith('.net')).map(v => v.id)
                let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`
                for (let i of anu) {
                    let nama = store.messages[i].array[0].pushName
                    teks += `⬡ *Nama :* ${nama}\n⬡ *User :* @${i.split('@')[0]}\n⬡ *Chat :* https://wa.me/${i.split('@')[0]}\n\n────────────────────────\n\n`
                }
                conn.sendTextWithMentions(m.chat, teks, m)
            }
            break
            case 'listgc': {
                if (!m.key.fromMe) return
                let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
                let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`
                for (let i of anu) {
                    let metadata = await conn.groupMetadata(i)
                    teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Owner :* ${metadata.owner !== undefined ? '@' + metadata.owner.split`@`[0] : 'Tidak diketahui'}\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(metadata.creation * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Member :* ${metadata.participants.length}\n\n────────────────────────\n\n`
                }
                conn.sendTextWithMentions(m.chat, teks, m)
            }
            break
            case 'listonline': case 'liston': {
                if (!m.key.fromMe) return
                let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
                let online = [...Object.keys(store.presences[id]), botNumber]
                conn.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭓ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
            }
            break
            case 'sticker': case 's': case 'stickergif': case 'sgif': {
                if (!m.key.fromMe) return
                if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command}`
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!')
                    let media = await quoted.download()
                    let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                    await fs.unlinkSync(encmedia)
                } else {
                    throw `Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`
                }
            }
            break
            case 'stickerwm': case 'swm': case 'stikerwm': {
                if (!m.key.fromMe) return
                if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command} packname|author`
                if (!text) throw `Example: ${prefix + command} packname|author`
                ppp = `${args.join(' ')}`
                let packname2 = ppp.split('|')[0]
                let author2 = ppp.split('|')[1]
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: packname2, author: author2 })
                    await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                    if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!')
                    let media = await quoted.download()
                    let encmedia = await conn.sendVideoAsSticker(m.chat, media, m, { packname: packname2, author: author2 })
                    await fs.unlinkSync(encmedia)
                } else {
                    throw `Kirim Gambar/Video Dengan Caption ${prefix + command} packname|author\nDurasi Video 1-9 Detik`
                }
            }
            break
            case 'takestick': case 'take': case 'takesticker': {
                if (!m.key.fromMe) return
                if (!quoted) throw `Balas Video/Image Dengan Caption ${prefix + command} packname|author`
                if (!text) throw `Example: ${prefix + command} packname|author`
                ppp = `${args.join(' ')}`
                const packname1 = ppp.split('|')[0]
                const author1 = ppp.split('|')[1]
                if (/webp/.test(mime)) {
                    let media = await quoted.download()
                        let encmedia = await conn.sendImageAsSticker(m.chat, media, m, { packname: packname1, author: author1 })
                        await fs.unlinkSync(encmedia)
                } else {
                    throw `Reply Stiker Dengan Caption ${prefix + command} packname|author\nDurasi Video 1-9 Detik`
                }
            }
            break
            case 'ebinary': {
                if (!m.key.fromMe) return
                if (!text) throw `Example : ${prefix + command} text`
                let { eBinary } = require('./lib/binary')
                let eb = await eBinary(text)
                reply(eb)
            }
            break
            case 'dbinary': {
                if (!m.key.fromMe) return
                if (!text) throw `Example : ${prefix + command} text`
                let { dBinary } = require('./lib/binary')
                let db = await dBinary(text)
                reply(db)
            }
            break
            case 'emojimix': {
                if (!m.key.fromMe) return
                let [emoji1, emoji2] = text.split`+`
                if (!emoji1) throw `Example : ${prefix + command} 😅+🤔`
                if (!emoji2) throw `Example : ${prefix + command} 😅+🤔`
                let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
                for (let res of anu.results) {
                    let encmedia = await conn.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
                    await fs.unlinkSync(encmedia)
                }
            }
            break
            case 'smeme': case 'stickmeme': case 'stikmeme': case 'stickermeme': case 'stikermeme': {
                if (!m.key.fromMe) return
                let respond = `Kirim/reply image/sticker dengan caption ${prefix + command} text1|text2`
                if (!/image/.test(mime)) throw respond
                if (!text) throw respond
                atas = text.split('|')[0] ? text.split('|')[0] : '-'
                bawah = text.split('|')[1] ? text.split('|')[1] : '-'
                let dwnld = await conn.downloadAndSaveMediaMessage(quoted)
                let { TelegraPh } = require('./lib/uploader')
                let fatGans = await TelegraPh(dwnld)
                let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas)}/${encodeURIComponent(bawah)}.png?background=${fatGans}`
                let FaTiH = await conn.sendImageAsSticker(m.chat, smeme, m, { packname: global.packname, author: global.auhor })
                await fs.unlinkSync(FaTiH)
            }
            break 
            case 'toimage': case 'toimg': {
                if (!m.key.fromMe) return
                if (!quoted) throw 'Reply Image'
                if (!/webp/.test(mime)) throw `Balas sticker dengan caption *${prefix + command}*`
                let media = await conn.downloadAndSaveMediaMessage(quoted)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) throw err
                    let buffer = fs.readFileSync(ran)
                    conn.sendMessage(m.chat, { image: buffer }, { quoted: m })
                    fs.unlinkSync(ran)
                })
            }
            break
            case 'tomp4': case 'tovideo': {
                if (!m.key.fromMe) return
                if (!quoted) throw 'Reply Sticker'
                if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                let { webp2mp4File } = require('./lib/uploader')
                let media = await conn.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
            case 'toaud': case 'toaudio': {
                if (!m.key.fromMe) return
                if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
                if (!quoted) throw `Kirim/Reply Video Yang Ingin Dijadikan Audio Dengan Caption ${prefix + command}`
                let media = await quoted.download()
                let { toAudio } = require('./lib/converter')
                let audio = await toAudio(media, 'mp4')
                conn.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
            }
            break
            case 'tomp3': {
                if (!m.key.fromMe) return
                if (/document/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
                if (!/video/.test(mime) && !/audio/.test(mime)) throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
                if (!quoted) throw `Kirim/Reply Video Yang Ingin Dijadikan MP3 Dengan Caption ${prefix + command}`
                let media = await quoted.download()
                let { toAudio } = require('./lib/converter')
                let audio = await toAudio(media, 'mp4')
                conn.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By ${conn.user.name}.mp3`}, { quoted : m })
            }
            break
            case 'tovn': case 'toptt': {
                if (!m.key.fromMe) return
                if (!/video/.test(mime) && !/audio/.test(mime)) throw `Reply Video/Audio Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
                if (!quoted) throw `Reply Video Yang Ingin Dijadikan VN Dengan Caption ${prefix + command}`
                let media = await quoted.download()
                let { toPTT } = require('./lib/converter')
                let audio = await toPTT(media, 'mp4')
                conn.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
            }
            break
            case 'togif': {
                if (!m.key.fromMe) return
                if (!quoted) throw 'Reply Sticker'
                if (!/webp/.test(mime)) throw `balas stiker dengan caption *${prefix + command}*`
                let { webp2mp4File } = require('./lib/uploader')
                let media = await conn.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await conn.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
            case 'tourl': {
                if (!m.key.fromMe) return
                let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
                let media = await conn.downloadAndSaveMediaMessage(quoted)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    reply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    reply(util.format(anu))
                }
                await fs.unlinkSync(media)
            }
            break
            case 'setprefix': {
                if (!m.key.fromMe) return
                if (!text) return reply(`Example: ${prefix}${command} ,`)
                prefix = text
                reply(`Sukses mengubah prefix menjadi ${text}`)
            }
            break
            case 'public': {
                if (!m.key.fromMe) return
                conn.public = true
                reply('Sukse Change To Public Usage')
            }
            break
            case 'self': {
                if (!m.key.fromMe) return
                conn.public = false
                reply('Sukses Change To Self Usage')
            }
            break
            case 'ping': case 'speed': {
                if (!m.key.fromMe) return
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_`.trim()
                reply(respon)
            }
            break
            case 'runtime': {
                if (!m.key.fromMe) return
                respon = `Runtime : ${runtime(process.uptime())}`.trim()
                reply(respon)
            }
            break
            case 'speedtest': {
                if (!m.key.fromMe) return
                reply('Testing Speed...')
                let cp = require('child_process')
                let { promisify } = require('util')
                let exec = promisify(cp.exec).bind(cp)
                let o
                try {
                    o = await exec('python speed.py')
                } catch (e) {
                    o = e
                } finally {
                    let { stdout, stderr } = o
                    if (stdout.trim()) reply(stdout)
                    if (stderr.trim()) reply(stderr)
                }
            }
            break
            case 'menu': case 'help': {
                if (!m.key.fromMe) return
                conn.sendMessage(m.chat, { image: require('fs').readFileSync('./src/thumb.jpg'), caption: lang.menu(prefix, global.u, week, date, time, dateIslamic) }, { quoted: m })
            }
            break
            default:
            if (budy.startsWith('=>')) {
                if (!m.key.fromMe) return
                function Return(sul) {
                    sat = JSON.stringify(sul, null, 2)
                    bang = util.format(sat)
                    if (sat == undefined) {
                        bang = util.format(sul)
                    }
                    return reply(bang)
                }
                try {
                    reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                } catch (e) {
                    reply(String(e))
                }
            }
            
            if (budy.startsWith('>')) {
                if (!m.key.fromMe) return
                try {
                    let evaled = await eval(budy.slice(2))
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await reply(evaled)
                } catch (err) {
                    await reply(String(err))
                }
            }
            
            if (budy.startsWith('$')) {
                if (!m.key.fromMe) return
                exec(budy.slice(2), (err, stdout) => {
                    if(err) return reply(err)
                    if (stdout) return reply(stdout)
                })
            }    
        }
    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
