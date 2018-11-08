const message = require("../../messages.js");
const { TIME_PERIOD } = require('../../constants');

module.exports = (bot, chatId) => {
  bot.sendMessage(chatId, "Какой срок условного голодания вы выбрали?", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: message.days7button,
            callback_data: TIME_PERIOD.short
          },

          {
            text: message.days14button,
            callback_data: TIME_PERIOD.long
          }
        ]
      ]
    }
  });
};
