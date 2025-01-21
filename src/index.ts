import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError } from 'grammy';
import * as emoji from 'node-emoji';
import { HoopBotService } from './services/HoopBotService';

dotenv.config();

const bot = new Bot(process.env.BOT_API_KEY);
const botService = new HoopBotService();

bot.api.setMyCommands([
  {
    command: 'hoop_game',
    description: 'Start 33 basketball game',
  },
  {
    command: 'info',
    description: 'Get some info about bot',
  },
]);

bot.command('info', async (ctx) => {
  await ctx.reply(
    'Hi\\) __*I am hoop 33 bot*__\\. I can allow you to play 33 game with your friends\\. It will be funny and I will be a part of your company during the game\\. \nJust connect me to your telegram group via the __[bot link](t.me/hoop33_bot)__',
    { parse_mode: 'MarkdownV2' },
  );
});

bot.command('hoop_game', (ctx) => botService.initGame(ctx));

bot.on('message').filter(
  (ctx) => ctx.message.dice?.emoji === emoji.get(':basketball:'),
  async (ctx) => {
    await botService
      .playerTurnHandler(ctx)
      .then(() => botService.botTurnHandler(ctx))
      .then(() => botService.showAllScores(ctx))
      .catch((e) => {
        console.log(e);
      });
  },
);

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
