import { gameStatuses, TGameStatus } from '../../game-common/gameStatuses';
import { cardsList } from './cardsList';

export interface IModelCard {
    rowIndex: number;
    columnIndex: number;
}

export const cardStatuses = {
    OPEN: 'open',
    CLOSE: 'close',
    MATCHED: 'matched',
    NOT_MATCHED: 'not-matched',
} as const;

export interface IResult {
    triggerCards: IModelCard[];
    status: string | null;
    callback: (() => void) | null;
}

export class GameMemoryModel {
    cardsMatrix: number[][] = [];
    openedCards: IModelCard[] = [];
    private countOfMatched: number = 0;
    gameStatus: TGameStatus = gameStatuses.NOT_STARTED;
    isLock: boolean = false;

    private previousCard: IModelCard | null = null;

    constructor(
        private rowsCount = 4,
        private columnCount = 4
    ) {}

    initGame() {
        this.cardsMatrix = [];
        this.openedCards = [];
        this.countOfMatched = 0;
        this.gameStatus = gameStatuses.IN_PROGRESS;
        this.isLock = false;

        this.createCardsMatrix();
    }

    private shuffle<T>(arr: T[]): T[] {
        const result = [...arr];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    private toMatrix<T>(arr: T[], rows: number, cols: number): T[][] {
        const matrix: T[][] = [];
        let i = 0;

        for (let r = 0; r < rows; r++) {
            const row: T[] = [];
            for (let c = 0; c < cols; c++) {
                row.push(arr[i]);
                i++;
            }
            matrix.push(row);
        }

        return matrix;
    }

    private createCardsMatrix(): void {
        const cardsIndexes = cardsList.map((el, i) => i);
        const pairs = [...cardsIndexes, ...cardsIndexes];
        const shuffled = this.shuffle(pairs);

        this.cardsMatrix = this.toMatrix(shuffled, this.rowsCount, this.columnCount);
    }

    toOpenCard(card: IModelCard): IResult | undefined {
        if (this.isLock) return;

        const result: IResult = {
            triggerCards: [],
            status: null,
            callback: null,
        };

        if (this.previousCard) {
            if (this.isSameCards(this.previousCard, card)) return;

            this.isLock = true;

            if (this.isMatch(this.previousCard, card)) {
                result.status = cardStatuses.MATCHED;
                result.triggerCards = [card];

                this.countOfMatched += 1;
                this.checkEndGame();
            } else {
                result.status = cardStatuses.NOT_MATCHED;
                result.triggerCards = [this.previousCard, card];
            }

            result.callback = () => {
                this.previousCard = null;
                this.isLock = false;
            };
        } else {
            this.previousCard = card;
            result.status = cardStatuses.OPEN;
            result.triggerCards = [card];
        }

        return result;
    }

    private isSameCards(card1: IModelCard, card2: IModelCard): boolean {
        return card1.rowIndex === card2.rowIndex && card1.columnIndex === card2.columnIndex;
    }

    private isMatch(card1: IModelCard, card2: IModelCard): boolean {
        return !!(
            this.cardsMatrix[card1.rowIndex][card1.columnIndex] ===
            this.cardsMatrix[card2.rowIndex][card2.columnIndex]
        );
    }

    private checkEndGame() {
        if (this.countOfMatched === cardsList.length) this.gameStatus = gameStatuses.WIN;
    }
}
