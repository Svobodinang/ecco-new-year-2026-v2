import { append, h } from '@/scripts/core/dom';
import { GameControllerAbstract, TOnEndGame } from '../game-common/gameControllerAbstract';
import { gameStatuses } from '../game-common/gameStatuses';

export class PhotoWidget extends GameControllerAbstract {
    container: HTMLElement | null = null;

    constructor(params: { onEndGame: TOnEndGame }) {
        super(params);
    }

    startGame() {
        this.container = document.getElementById('game-container');

        if (!this.container) return;

        const helpText = h(
            'p',
            { class: 'help-text label' },
            '<p>Форма доступна для сотрдников с&nbsp;корпоративной почтой.</p> <p>Те, у&nbsp;кого ее&nbsp;нет, могут поделиться своими любимыми фотографиями в&nbsp;<a href="https://club.ecco.ru/news/829" target="_blank" rel=""noopener>специальной новости в&nbsp;ECCO Club.</a></p>'
        );

        const widget = h(
            'div',
            { class: 'widget-wrapper' },
            '<iframe width="640px" height="480px" src="https://forms.office.com/Pages/ResponsePage.aspx?id=ISEVBsW0REWr9ZJo5120SCG82j34x5VAnalFAN_1XilURTJHV0FCRjJTTkxBM1JYUUJQQkNBN1BBVC4u&embed=true" frameborder="0" marginwidth="0" marginheight="0" style="border: none; max-width:100%; max-height:100vh" allowfullscreen webkitallowfullscreen mozallowfullscreen msallowfullscreen> </iframe>'
        );

        append(this.container, helpText);
        append(this.container, widget);

        this.endGame();
    }

    endGame() {
        if (this.onEndGame) this.onEndGame(gameStatuses.WIN, true);
    }
}
