const fs = require("fs");
const path = require("path");
const utils = require("util");
const message = require('../../messages');

const readFileAsync = utils.promisify(fs.readFile);

let stepTextFile;

module.exports = (bot, chatId) => ({
  async run() {
    try {
      stepTextFile = await readFileAsync(path.join(__dirname, "step.md"));
    } catch (e) {
      console.error("Can not read file step.md", e);
    }

    await bot.sendMessage(chatId, stepTextFile.toString(), {
      parse_mode: "Markdown"
    });

    await bot.sendMessage(chatId, message.enterOptionText, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: message.enterMagneziaButton,
              callback_data: message.enterMagneziaButton
            },
            {
              text: message.enterKastorkaButton,
              callback_data: message.enterKastorkaButton
            },
          ]
        ]
      }
    });

    await bot.sendMessage(chatId, message.klizmaButton, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: message.klizmaButton,
              callback_data: message.klizmaButton
            },
          ]
        ]
      }
    });
  }
});
