const message = require("../messages.js");

module.exports = (bot, chatId) => {
  bot.sendMessage(chatId, "Какой срок условного голодания вы выбрали?")

  bot.sendMessage(chatId, "Какой срок условного голодания вы выбрали?", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: message.enterMagneziaButton,
            callback_data: message.enterMagneziaButton
          },

          {
            text: message.enterKastorkaButton,
            callback_data: message.days14button
          }
        ]
    ]}
  });

  bot.sendMessage(chatId, message.hello);
};
