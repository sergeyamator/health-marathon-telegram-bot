const message = require("../../messages.js");
const fs = require('fs');
const path = require('path');
const utils = require('util');

const userService = require('../../services/userService');

const readFileAsync = utils.promisify(fs.readFile);

module.exports = (bot, chatId) => ({
  async run() {
    let stepTextFile;

    try {
      stepTextFile = await readFileAsync(path.join(__dirname, 'step.md'));
    } catch (e) {
      console.error('Can not read file step.md', e);
    }

    if (!stepTextFile) {
      return;
    }

    await bot.sendMessage(chatId, stepTextFile.toString(), {
      parse_mode: "Markdown"
    });

    bot.sendMessage(chatId, message.conditions, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: message.conditionsButton,
              callback_data: message.conditionsButton
            },
          ]
        ]
      }
    }).catch(console.error);
  }
});
