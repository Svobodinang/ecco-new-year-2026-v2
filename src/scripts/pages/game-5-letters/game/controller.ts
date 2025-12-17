import { Game5lettersView } from './view';
import { Game5lettersModel, TFinalWord } from './model';
import { specialKeys } from './keyboard';
import { gameStatuses } from './gameStatuses';
import { GameControllerAbstract } from '../../game-common/gameControllerAbstract';

export type TOnClickKeyboardLetter = (symbol: string) => void;

export class Game5lettersController extends GameControllerAbstract {
    private finalWord: TFinalWord = ['с', 'у', 'м', 'к', 'а'];
    private view;
    private model;
    readonly maxAttempts: number = 6;
    readonly cellsCount: number = 5;

    constructor(params: { onEndGame: (gameStatus: string) => void }) {
        super(params);

        this.view = new Game5lettersView(
            this.maxAttempts,
            this.cellsCount,
            this.onClickKeyboardLetter.bind(this)
        );
        this.model = new Game5lettersModel(this.maxAttempts, this.cellsCount, this.finalWord);
    }

    onClickKeyboardLetter(symbol: string) {
        if (symbol === specialKeys.DELETE) {
            this.model.removeLetter();
            this.view.renderWord(this.model.currentWord, this.model.currentAttempts);
        } else if (symbol === specialKeys.OK) {
            this.model.checkWord();

            if (this.model.canCheckWord) {
                this.view.renderLettersStatus(
                    this.model.letterStatusesInCurrentWord,
                    this.model.letterKnowledge,
                    this.model.currentAttempts
                );

                this.model.startNewWord();
            }

            if (this.model.gameStatus !== gameStatuses.IN_PROGRESS) this.endGame();
        } else {
            this.model.addLetter(symbol);
            this.view.renderWord(this.model.currentWord, this.model.currentAttempts);
        }

        this.view.updateAbilities(this.model.canCheckWord, this.model.canDelete);
    }

    startGame(): void {
        this.model.startGame();
        this.view.render();
    }

    endGame(): void {
        if (this.onEndGame) this.onEndGame(this.model.gameStatus);
        this.view.endGame();
    }
}
