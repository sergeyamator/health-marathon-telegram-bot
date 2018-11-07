const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_API_KEY;
require('./src/db');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// STEPS
const preparationStep = require('./src/steps/preparation/preparationStep');
const actionsStep = require('./src/action/actions');
const step1 = require('./src/steps/step1/daysAmountActions');
const daysAmountCallback = require('./src/steps/step1/daysAmountCallback'); 
const userService = require('./src/services/userService');
const times = require('./src/services/time');

const message = require("./src/messages.js");


bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;
  
  userService.save({
    first_name: msg.from.first_name,
    last_name: msg.from.last_name,
    username: msg.from.username,
    chat_id: msg.chat.id,
  });

  preparationStep(bot, chatId).run(); 

});

bot.onText(/\/actions/, (msg, match) => {
    const chatId = msg.chat.id;
    actionsStep(bot, chatId);
})

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', (msg) => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message');
// });

require('./src/callbackButtonActions')(bot)