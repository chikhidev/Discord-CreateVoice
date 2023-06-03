const commands = [
	{cmd: "+onetap", use: "ila bghiti tdir one tap b command"},
	{cmd: "+serverid", use: "ila bghiti t3ref server id"},
]

const serverid = async (message) => {
    if (message.content.startsWith("+serverid")) {
        // Get the server ID
        const guildId = message.guild.id;
    
        // Send the server ID as a reply
        message.channel.send(`The server ID is: ${guildId}`);
      }
}

const memberCount = async (message) => {
    const guild = message.guild;
    const totalMembers = guild.memberCount; 
        message.reply(`Kayn: ${totalMembers}`);
};

// Command to get a list of all members in the guild
const memberList = async (message) => {
    const guild = message.guild;
    const members = guild.members.cache.map((member) => member.displayName);
    const memberList = members.join('\n');
    message.reply(`Member List:\n${memberList}`);
};

// Command to get the nickname of a specific member
const nickname = async (message) => {
    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
        const nickname = mentionedMember.displayName;
        message.reply(`Nickname of ${mentionedMember}: ${nickname}`);
    } else {
        message.reply('Please mention a member to get their nickname.');
    }
};

// Command to get the roles of a specific member
const memberRoles = async (message) => {
    const mentionedMember = message.mentions.members.first();
    if (mentionedMember) {
        const roles = mentionedMember.roles.cache.map((role) => role.name);
        const roleList = roles.join(', ');
        message.reply(`Roles of ${mentionedMember}:\n${roleList}`);
    } else {
        message.reply('Please mention a member to get their roles.');
    }
};

const help = async (message) => {
	// Create an array of fields for each command
	const fields = commands.map((command) => ({
		name: `**${command.cmd}**`,
		value: command.use,
		inline: false,
	}));

	// Create the embed message with the command list
	const embed = {
		color: 0xffd700, // Golden color
		title: "Command List",
		description: "Here is a list of available commands:",
		fields: fields,
	};

	// Update the field name to be in golden color
	embed.fields.forEach((field) => {
		field.name = `**${field.name}**`;
	});

	// Send the embed message as a reply
	message.reply({ embed });
};
module.exports = {
    serverid, help, memberCount, memberList, nickname, memberRoles,
}