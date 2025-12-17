import { append, h } from '@/scripts/core/dom';
import { GameControllerAbstract, TOnEndGame } from '../game-common/gameControllerAbstract';
import { gameStatuses } from '../game-common/gameStatuses';

export class LetterWidget extends GameControllerAbstract {
    container: HTMLElement | null = null;

    constructor(params: { onEndGame: TOnEndGame }) {
        super(params);
    }

    startGame() {
        this.container = document.getElementById('game-container');

        if (!this.container) return;

        const widget = h(
            'div',
            { class: 'widget-wrapper' },
            '<iframe src="https://forms.office.com/Pages/ResponsePage.aspx?id=ISEVBsW0REWr9ZJo5120SIBhTAg0ktRMt8BkwPFYhsNURUlSVEJXNTFFOUc5RzFYMlRIMlcwMjJKRS4u&embed=true%22 frameborder="0" marginwidth="0" marginheight="0" style="border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>'
        );

        append(this.container, widget);

        this.endGame();
    }

    endGame() {
        if (this.onEndGame) this.onEndGame(gameStatuses.WIN, true);
    }
}
