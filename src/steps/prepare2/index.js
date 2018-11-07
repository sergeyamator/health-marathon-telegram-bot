const message = require("./messages.js");
const fs = require('fs');
const path = require('path');
const utils = require('util');

const readFileAsync = utils.promisify(fs.readFile);

let stepTextFile;

module.exports = async (bot, chatId) => ({
    async run() {
        try {
            stepTextFile = await readFileAsync(path.join(__dirname, 'step.md'));
        } catch (e) {
          console.error('Can not read file step.md', e);
        }
    
        bot.sendMessage(chatId, stepTextFile.toString());
    }
});