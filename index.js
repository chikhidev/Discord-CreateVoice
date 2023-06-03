// Dependencies
var Discord = require("discord.js");
const infos = require('./actions/infos')
const voice = require('./actions/voice')

// Variables
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });
const config = require("./config.json");



bot.on("ready", () => {
  console.log("Bot is online!");
});


bot.on("voiceStateUpdate", (oldState, newState) => {
  voice.deleteEmptyChannelAfterDelay(oldState.channel);
});


bot.on("message", async (message) => {
	if (message.content.startsWith("+onetap")) {
	  if (!message.member) return;
	  var test;
	  for (var bundle of config) {
		if (bundle.guild == message.guild.id) {
		  test = bundle;
		  break;
		}
	  }
  
	  message.guild.createChannel(`${message.member.displayName}'s Channel`, "voice", [
		{
		  id: message.member.id,
		  allow: ["MANAGE_CHANNELS"],
		},
		{
		  id: message.guild.defaultRole.id,
		  deny: ["VIEW_CHANNEL"],
		},
	  ])
	  .then((channel) => {
		deleteEmptyChannelAfterDelay(channel, message);
		channel.setParent(config[0].category)
		  .then(() => {
			const position = message.guild.channels.get(config[0].category).children.size - config[0].position;
			channel.setPosition(position)
			  .then(() => {
				channel.overwritePermissions(message.guild.defaultRole.id, { VIEW_CHANNEL: true })
				  .then(() => {
					if (message.member.voiceChannel) {
						// Move the member to the newly created voice channel
						 message.member.setVoiceChannel(channel)
						  .then(() => {
							message.reply(`**✨** ${message.member.displayName} ditk l ${channel.name}`);
						  })
						  .catch(error => 
							message.reply(`**⚠️** Maymkench ndik l *${channel.name}*.\nW9e3 mochkil!`)
							);
					  } else {
						channel.delete()
						message.reply("Khasek tkon f voice b3da");
					  }
				  })
				  .catch(error => console.log(error));
			  })
			  .catch(error => console.log(error));
		  })
		  .catch(error => console.log(error));
	  })
	  .catch(error => console.log(error));
	}
  });
  

//run any command
bot.on("message", (message) =>{
	if (message.content.startsWith("+") && !message.content.startsWith("+onetap")	){
		if (message.content.startsWith("+serverid")) infos.serverid(message)
		else if (message.content.startsWith("+help")) infos.help(message)
		else if (message.content.startsWith("+memberscount" || "+ch7almnwa7ed")) infos.memberCount(message)
		else	message.reply(`:eye: **makaynach** command ${message.content.split(' '[0])}.\nila bghiti tchof ga3 les commands **+help**.`);
		  
	}

});



function deleteEmptyChannelAfterDelay(voiceChannel, message, delayMS = 1000 ) {
	if (!voiceChannel) return;
	if (voiceChannel.members.size > 0) return;
	if (!voiceChannel.health) voiceChannel.health = 0;
	voiceChannel.health += 1;
	setTimeout(function () {
	  if (!voiceChannel) return;
	  if (voiceChannel.members.size > 0) return;
	  voiceChannel.health -= 1;
	  if (voiceChannel.health > 0) return;
	  voiceChannel.delete()
	  .catch((error) => console.log(error));
	}, delayMS);
  }


const deleteChannel = (message) => {
	// Check if the message author is a member of a guild
	if (!message.member) {
	  message.reply("You are not a member of this server.");
	  return;
	}
  
	// Check if the user is in a voice channel
	if (!message.member.voice || !message.member.voice.channel) {
	  message.reply("You are not in a voice channel.");
	  return;
	}
  
	// Check if the bot has permissions to manage channels
	if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
	  message.reply("I don't have permission to manage channels.");
	  return;
	}
  
	const voiceChannel = message.member.voice.channel;
  
	// Call the deleteChannel function and pass the voice channel object
	deleteChannelVoice(voiceChannel)
	  .then(() => {
		message.reply("Your voice channel has been deleted.");
	  })
	  .catch((error) => {
		console.log(error);
		message.reply("Failed to delete the voice channel.");
	  });
  };
  

bot.login(require("./token.json"));




module.exports = bot