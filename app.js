const TelegramBot = require("node-telegram-bot-api");
require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_API_KEY;
require('./src/db');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// STEPS
const preparationStep = require('./src/preparationStep');
const actionsStep = require('./src/action/actions');
const step1 = require('./src/steps/step1/daysAmountActions');
const daysAmountCallback = require('./src/steps/step1/daysAmountCallback'); 
const userService = require('./src/services/userService');
const times = require('./src/services/time');

const message = require("./src/messages.js");


bot.onText(/\/start/, (msg, match) => {
  console.log(msg)
  console.log(match)
  const chatId = msg.chat.id;
  
  userService.save({
    first_name: msg.from.first_name,
    last_name: msg.from.last_name,
    username: msg.from.username,
    chat_id: msg.chat.id,
  });

  preparationStep(bot, chatId);

  // First day
  setTimeout()


  // step1(bot, chatId)
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

bot.on("callback_query", query => {
  const { id } = query.message.chat;
  const { data } = query;

  switch (data) {
    case message.purchasesButton:
      bot.sendMessage(id, message.purchases, {parse_mode: 'Markdown'});
      break;

    case message.actions.herbalRecipe:
      bot.sendMessage(id, message.herbalRecipe, {parse_mode: 'Markdown'});
      break;

    case message.enterMagnezia:
      bot.sendMessage(id, message.enterMagnezia, {parse_mode: 'Markdown'});
      break;

    case message.enterKastorkaButton:
      bot.sendMessage(id, message.enterKastorka, {parse_mode: 'Markdown'});
      break;

    case message.days7button:
    case message.days14button:
      daysAmountCallback(data);
      break;
    }
});
