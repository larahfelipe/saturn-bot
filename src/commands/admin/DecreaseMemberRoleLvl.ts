import { Message, MessageEmbed } from 'discord.js';

import config from '../../config';
import { Bot } from '../..';
import { handleMemberDemotion } from '../../services/UpdateMemberService';

async function run (bot: Bot, msg: Message, args: string[]) {
  const targetMember = msg.mentions.members?.first();
  if (!targetMember) return msg.reply('You need to tag someone!');

  const embed = new MessageEmbed();
  embed
    .setAuthor(`SATURN Database Manager`, bot.user?.avatarURL()!)
    .setDescription(`**» ${targetMember} REGISTRY HAS BEEN UPDATED.**\n*Database was updated at ${msg.createdAt}.*`)
    .setTimestamp(Date.now())
    .setFooter('MongoDB', 'https://pbs.twimg.com/profile_images/1234528105819189248/b6F1hk_6_400x400.jpg')
    .setColor('#6E76E5');

  try {
    await handleMemberDemotion(targetMember)
      .then(() => msg.channel.send({ embed }));
  } catch (err) {
    console.error(err);
    msg.reply('Member is not registered in database!');
  }
}

export default {
  name: `${config.botPrefix}unsetadmin`,
  help: 'Unsets a member as server administrator',
  permissionLvl: 1,
  run
};