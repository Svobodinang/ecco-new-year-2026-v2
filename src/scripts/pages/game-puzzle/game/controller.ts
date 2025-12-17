import { GamePuzzleView } from './view';
import { GameControllerAbstract } from '../../game-common/gameControllerAbstract';
import { GamePuzzleModel, ItemStatuses } from './model';
import { gameStatuses } from '../../game-common/gameStatuses';

export type TOnClickKeyboardLetter = (symbol: string) => void;

export class GamePuzzleController extends GameControllerAbstract {
    private view;
    private model;

    constructor(params: { onEndGame: (gameStatus: string) => void }) {
        super(params);

        this.model = new GamePuzzleModel();
        this.view = new GamePuzzleView(this.toChooseItem.bind(this));
    }

    toChooseItem(itemId: string): void {
        const resultStatus = this.model.toChooseItem(itemId);

        if (resultStatus === ItemStatuses.CORRECT) {
            this.view.renderCorrect(itemId);

            setTimeout(() => {
                this.model.nextQuestion();

                if (this.model.gameStatus === gameStatuses.WIN) {
                    this.endGame();

                    return;
                }

                this.view.showQuestion(this.model.currentQuestionIndex);
            }, 300);
        }
    }

    startGame(): void {
        this.model.startGame();
        this.view.render(this.model.shuffledItems, this.model.shuffleQuestions);

        setTimeout(() => {
            this.view.showQuestion(this.model.currentQuestionIndex);
        }, 500);
    }

    endGame(): void {
        if (this.onEndGame) this.onEndGame(this.model.gameStatus);
    }
}
