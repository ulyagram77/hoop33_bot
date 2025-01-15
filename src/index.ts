import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError } from 'grammy';

dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY);

bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Start a bot',
  },
  {
    command: 'hello',
    description: 'Get a greeting from bot',
  },
]);

bot.command('start', async (ctx) => {
  await ctx.reply('Hi I am hoop 33 bot and you are only botik)');
});

bot.command(['hello'], async (ctx) => {
  await ctx.reply('Hello botik)');
});

bot.on(':voice', async (ctx) => {
  await ctx.reply('Your voice so sex!!');
});

bot.on('::url', async (ctx) => {
  await ctx.reply('Golyb told URLL!!');
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling an update ${ctx.update.update_id}:`);
  const e = err.error;

  if (e instanceof GrammyError) {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError) {
    console.error('Could not connect to the telegram:', e);
  } else {
    console.error('Unknown error occured', e);
  }
});

bot.start();
