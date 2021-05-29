import { Message, MessageEmbed } from 'discord.js';

import config from '../../../config';
import { Bot } from '../../..';
import { IQueue } from '../../../types';
import { Reaction } from '../../../utils/ReactionsHandler';

function run (bot: Bot, msg: Message, args: string[]) {
  const queueExists: IQueue = bot.queues.get(msg.guild!.id);
  if (!queueExists) return msg.reply('There\'s no song playing in your current channel.');

  const embed = new MessageEmbed();
  embed
    .setTitle('⏹  Stop Music')
    .setDescription('Understood! Stopping the music function.')
    .setColor('#6E76E5');
  msg.channel.send({ embed });

  queueExists.connection.disconnect();
  bot.queues.delete(msg.guild!.id);
  Reaction.handleDeletion(true);
}

export default {
  name: `${config.botPrefix}stop`,
  help: 'Stops the music function',
  permissionLvl: 0,
  run
};