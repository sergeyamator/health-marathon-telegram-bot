const message = require("../messages.js");

module.exports = (bot, chatId) => {
    bot.sendMessage(chatId, message.purchasesButton, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: message.actions.herbalRecipe,
                callback_data: message.actions.herbalRecipe
              },
            ],
            [
              {
                text: message.klizmaButton,
                callback_data: message.klizmaButton
              },
            ],
            [
              {
                text: message.purchasesButton,
                callback_data: message.purchasesButton
              },
            ]
          ]
        }
    });
};
