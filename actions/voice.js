const config = require("../config.json");
const bot = require('../index')

const deleteChannelVoice = async (voiceChannel) => {
	if (!voiceChannel) {
	  throw new Error("Invalid voice channel provided.");
	}
  
	try {
	  await voiceChannel.delete();
	  console.log(`Deleted voice channel: ${voiceChannel.name}`);
	} catch (error) {
	  console.log(error);
	  throw new Error("Failed to delete the voice channel.");
	}
  };
  

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
  
  

function deleteEmptyChannelAfterDelay(voiceChannel, delayMS = 1000) {
	if (!voiceChannel) return;
	if (voiceChannel.members.size > 0) return;
	if (!voiceChannel.health) voiceChannel.health = 0;
	voiceChannel.health += 1;
	setTimeout(function () {
	  if (!voiceChannel) return;
	  if (voiceChannel.members.size > 0) return;
	  voiceChannel.health -= 1;
	  if (voiceChannel.health > 0) return;
	  voiceChannel.delete().catch((error) => console.log(error));
	}, delayMS);
  }


module.exports = {
    deleteChannel, deleteEmptyChannelAfterDelay
}