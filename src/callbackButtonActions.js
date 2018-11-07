const fs = require("fs");
const path = require("path");
const utils = require("util");
const message = require("./messages");

const readFileAsync = utils.promisify(fs.readFile);

module.exports = bot => {
  bot.on("callback_query", async query => {
    const { id } = query.message.chat;
    const { data } = query;

    let instructionsTextFilePath;

    switch (data) {
      case message.purchasesButton:
        instructionsTextFilePath = "purchases.md";
        break;

      case message.actions.herbalRecipe:
        instructionsTextFilePath = "herbalRecipe.md";
        break;

      case message.enterMagnezia:
        instructionsTextFilePath = "enterMagnezia.md";
        break;

      case message.enterKastorkaButton:
        instructionsTextFilePath = "enterKastorka.md";
        break;

      case message.days7button:
      case message.days14button:
        daysAmountCallback(data);
        break;
    }

    if (!instructionsTextFilePath) {
      return;
    }

    const instructionsTextFile = await readFileAsync(
      path.join(__dirname, "instructions", instructionsTextFilePath)
    );

    bot.sendMessage(id, instructionsTextFile.toString(), {
      parse_mode: "Markdown"
    });
  });
};
