import { append, h } from '@/scripts/core/dom';
import { cardsList } from './cardsList';
import { TOnClickCard } from './controller';
import { IModelCard } from './model';

export class GameMemoryView {
    private container?: HTMLElement | null;
    private gridCells: HTMLElement[][] = [];
    private onClickCard?: TOnClickCard;
    cardsMatrix: number[][] = [];

    constructor(onClickCard: TOnClickCard) {
        this.onClickCard = onClickCard;
    }

    render(cardsMatrix: typeof this.cardsMatrix): void {
        this.cardsMatrix = cardsMatrix;

        this.container = document.getElementById('game-container');
        if (!this.container) throw new Error('game 5 letter view | container is not defined');

        this.container.innerHTML = '';

        this.renderGrid();
    }

    private renderGrid() {
        if (!this.container) return;

        const grid: HTMLElement = h('div', { class: 'grid' });

        this.cardsMatrix.forEach((array, i) => {
            const row = h('div', { class: 'row' });
            this.gridCells[i] = [];

            this.cardsMatrix[i].forEach((item, j) => {
                const cell = h(
                    'button',
                    {
                        class: 'cell',
                        onClick: () => {
                            if (this.onClickCard) this.onClickCard({ rowIndex: i, columnIndex: j });
                        },
                    },
                    h('div', { class: 'cell-side cell-side--back' }),
                    h(
                        'div',
                        { class: 'cell-side cell-side--front' },
                        h('img', { src: cardsList[item].image })
                    )
                );

                this.gridCells[i][j] = cell;

                append(row, cell);
            });

            append(grid, row);
        });

        append(this.container, grid);
    }

    openCards(openedCards: IModelCard[]) {
        openedCards.forEach((card) => {
            if (!this.gridCells[card.rowIndex][card.columnIndex].classList.contains('open'))
                this.gridCells[card.rowIndex][card.columnIndex].classList.add('open');
        });
    }

    closeCards(openedCards: IModelCard[]) {
        openedCards.forEach((card) => {
            this.gridCells[card.rowIndex][card.columnIndex].classList.remove('open');
        });
    }
}
