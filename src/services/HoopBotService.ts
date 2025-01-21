import { Context } from 'grammy';
import { GameService } from './GameService';

type PlayerType = 'player' | 'bot';

export class HoopBotService {
  private readonly gameService: GameService;
  private readonly replyDelay = 5000;

  constructor() {
    this.gameService = new GameService();
  }

  public async initGame(ctx: Context): Promise<void> {
    this.gameService.resetScores();
    const playerScore = this.gameService.getPlayerScore();
    const botScore = this.gameService.getBotScore();

    await ctx.reply(
      `Okay, lets start the battle! \nYour score: ${playerScore} \nMy score: ${botScore}`,
    );

    await ctx.reply(`You will be the first, just throw me that sticker 🏀`);
  }

  public async playerTurnHandler(ctx: Context): Promise<void> {
    const diceRes = ctx.message?.dice?.value;
    if (diceRes) this.gameService.addScore('player', diceRes);
  }

  public async botTurnHandler(ctx: Context): Promise<void> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const botDiceMessage = await ctx.replyWithDice('🏀');
        const diceValue = botDiceMessage?.dice?.value;
        if (diceValue) this.gameService.addScore('bot', diceValue);
        resolve();
      }, this.replyDelay);
    });
  }

  public async showAllScores(ctx: Context): Promise<void> {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const playerScore = this.gameService.getPlayerScore();
        const botScore = this.gameService.getBotScore();

        await ctx.reply(
          `*LAP RESULT*:\nYour score: *${playerScore}*\nMy score: *${botScore}*`,
          { parse_mode: 'MarkdownV2' },
        );
        resolve();
      }, this.replyDelay);
    });
  }

  public async showScore(ctx: Context, playerType: PlayerType): Promise<void> {
    switch (playerType) {
      case 'player':
        await ctx.reply(`Your score: ${this.gameService.getPlayerScore()}`);
        break;

      case 'bot':
        await ctx.reply(`My score: ${this.gameService.getBotScore()}`);
        break;

      default:
        await ctx.reply('Who is that player? Probably it is a stranger...');
        break;
    }
  }
}
