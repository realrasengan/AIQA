import AIQA from "./aiqa.js";
import TelegramBot from 'node-telegram-bot-api';  // npm install node-telegram-bot-api

const token = ''; // telegram botfather key
const KEY = "sk-"; // openai api key
const CHUNK_SIZE = 800;
const DOC = ""; // path to pdf file.pdf

(async function() {
  const bot = new TelegramBot(token, {polling: true});

  let previousMessages=[];
  let chanMessages = {};

  let aiqa = await new AIQA(KEY, CHUNK_SIZE, DOC);
  let history="";

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const chatUsername = msg.from.username;
    const text = msg.text;

    console.dir(msg);

    if(typeof chanMessages[chatId]==="undefined") {
      chanMessages[chatId]=[];
    }

    if(chanMessages[chatId].length>20) {
      chanMessages[chatId].shift();
      chanMessages[chatId].shift();
    }
    chanMessages[chatId].push(`<${chatUsername}> ${text}`);
    let prev = chanMessages[chatId].join("\n");
    if(text) {
      if(msg.chat.type==="private") {
        let result = await aiqa.query(text,prev);
        bot.sendMessage(chatId, result.text);
        chanMessages[chatId].push(`<ChatGPT> ${result.text}`);
      }
    }
  });

})();
