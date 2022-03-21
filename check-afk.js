const client = require('../index')
const afkSchema = require('../Schemas/afkSchema')
const Discord = require('discord.js')

client.on('messageCreate', async(message) => {
    if(message.author.bot) return;


    const checkafk = await afkSchema.findOne({Guild: message.guild.id, User: message.author.id})

    if(checkafk) {
        checkafk.delete()

        const dataDeletedEmbed = new Discord.MessageEmbed()
        .setDescription(`${client.echeckmark} You are no longer AFK!`)
        .setColor(client.csuccess)


        message.channel.send({embeds: [dataDeletedEmbed]})
    }

    const mentionedUser = message.mentions.users.first();
    if(mentionedUser) {

        const data = await afkSchema.findOne({Guild: message.guild.id, User: mentionedUser.id})

        if(data) {
            const embed = new Discord.MessageEmbed()
            .setTitle(`${mentionedUser.username} is currently AFK!`)
            .setColor(client.cmain)
            .setDescription(`Reason: ${data.Reason} \n Since: <t:${Math.round(data.Date / 1000)}:R>`)

            message.channel.send({embeds: [embed]})
        }
    }
})