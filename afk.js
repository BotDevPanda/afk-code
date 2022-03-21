const Discord = require('discord.js');
const afkSchema = require('../../Schemas/afkSchema')

module.exports = {
    data: {
        name: "afk",
        description: "sets your AFK on/off",
        type: "CHAT_INPUT",
        options: [
            {
                name: 'reason',
                description: 'Why you are going AFK',
                type: 3,
                required: false
            }
        ]
    },
    botreqperms: [],
    reqperms: [],
    usage: '',
    cooldown: 0,
    staffOnly: false,
    ownerOnly: false,
    async execute(client, interaction, args) {
        const reason = interaction.options.getString('reason') || 'No Reason Provided'
    
    const params = {
        Guild: interaction.guild.id,
        User: interaction.user.id
    }

    afkSchema.findOne({params}, async(err, data) => {
        if(data) {
            data.delete()
            await interaction.followUp({embeds: [new Discord.MessageEmbed().setDescription(`${client.echeckmark} You are no longer AFK!`).setColor(client.csuccess)]})
        } else {
            new afkSchema({
                Guild: interaction.guild.id,
                User: interaction.user.id,
                Reason: reason,
                Date: Date.now()
            }).save()

            await interaction.followUp({embeds: [new Discord.MessageEmbed().setDescription(`${client.echeckmark} You are now AFK for: __**${reason}**__`).setColor(client.csuccess)]})
        }
    })
    }

}