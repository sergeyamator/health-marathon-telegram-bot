const TelegramBot = require("node-telegram-bot-api");
const fs = require('fs');
const path = require('path');
const util = require('util');
const userService = require('./src/services/userService');
const dateService = require('./src/services/dateService');
const actionsStep = require('./src/action/actions');

require('dotenv').config();
require('./src/db');

const token = process.env.TELEGRAM_API_KEY;
const bot = new TelegramBot(token, {polling: true});
const readDirAsync = util.promisify(fs.readdir);
const steps = [];

readDirAsync(path.join(__dirname, 'src', 'steps'))
  .then(files => {
    files.sort((a, b) => {
      const regExp = RegExp(/step(\d+)/);
      const firstNumber = Number(a.match(regExp)[1]);
      const secondNumber = Number(b.match(regExp)[1]);

      return firstNumber > secondNumber ? 1 : -1;
    });

    files.forEach(file => {
      steps.push(require(path.join(__dirname, 'src', 'steps', file)));
    });
  })
  .catch(err => console.error('error in app.js', err));

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  userService.save({
    first_name: msg.from.first_name,
    last_name: msg.from.last_name,
    username: msg.from.username,
    chat_id: msg.chat.id,
    telegramId: msg.from.id,
    current_day: 0,
  }).then(() => {
    steps[0](bot, chatId).run();

    userService.getUser(chatId)
      .then(user => {
        if (!user.agreement) {
          return;
        }

  /*      dateService.scheduleJobForEveryDay({
          timeStart: new Date(2018, 11, 20, 8),
          job: steps,
          stop: 20,
          bot,
          chatId,
        });*/
      })
  })
});

bot.onText(/\/actions/, (msg, match) => {
  const chatId = msg.chat.id;
  actionsStep(bot, chatId);
});

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });

require('./src/callbackButtonActions')(bot);
