export class GameService {
  private playerScore: number;
  private botScore: number;

  constructor() {
    this.playerScore = 0;
    this.botScore = 0;
  }

  public resetScores(): void {
    this.playerScore = 0;
    this.botScore = 0;
  }

  public getPlayerScore(): number {
    return this.playerScore;
  }

  public getBotScore(): number {
    return this.botScore;
  }

  public addScore(playerType: 'player' | 'bot', emojiState: number): void {
    const score = this._setScore(emojiState);
    if (playerType === 'player') {
      this.playerScore += score;
    } else if (playerType === 'bot') {
      this.botScore += score;
    }
  }

  private _setScore(emojiState: number): number {
    let score = 0;

    switch (emojiState) {
      case 4:
      case 5:
        score += 3;
        break;
      default:
        break;
    }

    return score;
  }
}
