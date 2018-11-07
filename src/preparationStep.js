const message = require("./messages.js");

module.exports = (bot, chatId) => {
    bot.sendMessage(chatId, message.hello);

    bot.sendMessage(chatId, message.purchasesButton, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: message.purchasesButton,
                callback_data: message.purchasesButton
              },
            ]
          ]
        }
    });
}