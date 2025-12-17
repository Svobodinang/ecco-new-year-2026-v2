import { GameControllerAbstract, TOnEndGame } from '../../game-common/gameControllerAbstract';
import { gameStatuses } from '../../game-common/gameStatuses';
import { cardStatuses, GameMemoryModel, IModelCard, IResult } from './model';
import { GameMemoryView } from './view';

export type TOnClickCard = (card: IModelCard) => void;

export class GameMemoryController extends GameControllerAbstract {
    private view: GameMemoryView;
    private model: GameMemoryModel;
    private rowsCount = 4;
    private columnCount = 4;
    private endGameTimeout: ReturnType<typeof setTimeout> | null = null;
    private flipCardTimeout: ReturnType<typeof setTimeout> | null = null;

    constructor(params: { onEndGame: TOnEndGame }) {
        super(params);

        this.model = new GameMemoryModel(this.rowsCount, this.columnCount);
        this.view = new GameMemoryView(this.toOpenCard.bind(this));
    }

    toOpenCard(card: IModelCard) {
        if (this.model.gameStatus !== gameStatuses.IN_PROGRESS) return;

        const result: IResult | undefined = this.model.toOpenCard(card);

        if (!result) return;

        switch (result.status) {
            case cardStatuses.OPEN:
                this.view.openCards(result.triggerCards);

                break;
            case cardStatuses.MATCHED:
                this.view.openCards(result.triggerCards);

                if (result.callback) result.callback();

                if (this.model.gameStatus === gameStatuses.WIN) {
                    this.endGame();
                }

                break;
            case cardStatuses.NOT_MATCHED:
                this.view.openCards(result.triggerCards);

                this.flipCardTimeout = setTimeout(() => {
                    this.view.closeCards(result.triggerCards);

                    if (result.callback) result.callback();

                    this.flipCardTimeout = null;
                }, 600);

                break;
        }
    }

    startGame(): void {
        this.model.initGame();
        this.view.render(this.model.cardsMatrix);
    }

    endGame(): void {
        if (this.endGameTimeout) {
            clearTimeout(this.endGameTimeout);

            this.endGameTimeout = null;
        }

        if (this.flipCardTimeout) {
            clearTimeout(this.flipCardTimeout);

            this.flipCardTimeout = null;
        }

        this.endGameTimeout = setTimeout(() => {
            if (this.onEndGame) this.onEndGame(this.model.gameStatus);
        }, 600);
    }
}
