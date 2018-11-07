const message = require("../../messages.js");

module.exports = (bot, chatId) => {
  bot.sendMessage(chatId, "Какой срок условного голодания вы выбрали?", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: message.days7button,
            callback_data: message.days7button
          },

          {
            text: message.days14button,
            callback_data: message.days14button
          }
        ],
        [
          {
            text: message.purchasesButton,
            callback_data: message.purchasesButton
          }
        ]
      ]
    }
  });

  bot.sendMessage(chatId, message.hello);
};
