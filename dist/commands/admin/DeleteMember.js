"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const DeleteMemberService_1 = require("../../services/DeleteMemberService");
async function run(bot, msg, args) {
    var _a, _b;
    const targetMember = (_a = msg.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
    if (!targetMember)
        return msg.reply('You need to tag someone!');
    const embed = new discord_js_1.MessageEmbed();
    embed
        .setAuthor(`SATURN Database Manager`, (_b = bot.user) === null || _b === void 0 ? void 0 : _b.avatarURL())
        .setDescription(`**» ${targetMember} REGISTRY HAS BEEN DELETED.**\n*Database was updated at ${msg.createdAt}.*`)
        .setTimestamp(new Date())
        .setFooter('MongoDB', 'https://pbs.twimg.com/profile_images/1234528105819189248/b6F1hk_6_400x400.jpg')
        .setColor('#6E76E5');
    try {
        await DeleteMemberService_1.handleMemberDeletion(msg.author, targetMember)
            .then(() => msg.channel.send({ embed }));
    }
    catch (err) {
        console.error(err);
        msg.reply('Member is not registered in database!');
    }
}
exports.default = {
    name: '.del',
    help: 'Deletes a member from database',
    permissionLvl: 1,
    run
};
