const message = require("../../messages.js");
const fs = require('fs');
const path = require('path');
const utils = require('util');

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

    bot.sendMessage(chatId, stepTextFile.toString());
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
})