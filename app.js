const TelegramBot = require("node-telegram-bot-api");
const fs = require('fs');
const path = require('path');
const util = require('util');
const userService = require('./src/services/userService');

require('dotenv').config();
require('./src/db');

const token = process.env.TELEGRAM_API_KEY;
const bot = new TelegramBot(token, { polling: true });
const readDirAsync = util.promisify(fs.readdir);

const times = require('./src/services/time');

const steps = [];
let dayTimer = 0;

      
readDirAsync(path.join(__dirname, 'src', 'steps'))
  .then(files => {
    files.forEach(file => {
      steps.push(require(path.join(__dirname, 'src', 'steps', file)));
    });
  })
  .catch(err => console.error('error in app.js', err));

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;

  // const intervalId = setInterval(() => {
  //   if (dayTimer < steps.length) {
  //     steps[dayTimer](bot, chatId).run();
  //     dayTimer++
  //   } else {
  //     clearInterval(intervalId);
  //   }
  
  // }, 2000)

  userService.save({
    first_name: msg.from.first_name,
    last_name: msg.from.last_name,
    username: msg.from.username,
    chat_id: msg.chat.id,
    telegramId: msg.from.id,
    current_day: 0,
  }).then(() => {
    steps[0](bot, chatId).run();
  })
});

// bot.onText(/\/actions/, (msg, match) => {
//     const chatId = msg.chat.id;
//     actionsStep(bot, chatId);
// })

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });

require('./src/callbackButtonActions')(bot)