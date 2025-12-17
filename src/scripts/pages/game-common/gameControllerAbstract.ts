export type TOnEndGame = (gameStatus: string, noChangeScreen?: boolean) => void;

export abstract class GameControllerAbstract {
    onEndGame?: TOnEndGame;

    constructor({ onEndGame }: { onEndGame: TOnEndGame }) {
        if (onEndGame) this.onEndGame = onEndGame;
    }

    abstract startGame(): void;
    abstract endGame(): void;
}
