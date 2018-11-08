const message = require("../messages.js");

module.exports = (bot, chatId) => {
  bot.sendMessage(chatId, message.herbalRecipe);
}
