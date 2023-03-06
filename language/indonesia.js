exports.menu = (prefix, pe, week, date, time, dateIslamic) => {
    return ` *</INFORMATION>*
• Author: K1mimaru
• Runtime: ${pe}
• Day: ${week}
• Date: ${date}
• Time: ${time}
• Dateislamic: ${dateIslamic}

 *</ALL MENU>*
• ${prefix}autoread </enable/disable>
• ${prefix}autotyping </enable/disable>
• ${prefix}autorecording </enable/disable>
• ${prefix}linkgroup [ group ]
• ${prefix}ephemeral </enable/disable>
• ${prefix}setppgc </reply image>
• ${prefix}setname </group name>
• ${prefix}setdesc </group desc>
• ${prefix}group </open/close>
• ${prefix}editinfo </open/close>
• ${prefix}add </@tag/reply>
• ${prefix}kick </@tag/reply>
• ${prefix}hidetag </text tag>
• ${prefix}tagall </text tag>
• ${prefix}antilink </on/off>
• ${prefix}mute </on/off>
• ${prefix}promote </@tag/reply>
• ${prefix}demote </@tag/reply>
• ${prefix}listonline [ group ]
• ${prefix}delete </reply message>
• ${prefix}infochat </reply message>
• ${prefix}quoted </reply message>
• ${prefix}toimage </reply sticker>
• ${prefix}sticker </reply img/vid>
• ${prefix}stickerwm </text|text>
• ${prefix}take </text|text>
• ${prefix}emojimix </emoji+emoji>
• ${prefix}tovideo </reply sticker>
• ${prefix}togif </reply sticker>
• ${prefix}tourl </reply img/vid>
• ${prefix}tovn </reply video>
• ${prefix}tomp3 </reply video>
• ${prefix}toaudio </reply video>
• ${prefix}ebinary </decode binary>
• ${prefix}dbinary </encode binary>
• ${prefix}smeme </text|text>
• ${prefix}react </emoji>
• ${prefix}chat </option>
• ${prefix}join </group link>
• ${prefix}leave [ group ]
• ${prefix}block </@tag/reply>
• ${prefix}unblock </@tag/reply>
• ${prefix}setppbot </reply image/full>
• ${prefix}setexif </packname|author>
• ${prefix}setprefix </prefix>`
}