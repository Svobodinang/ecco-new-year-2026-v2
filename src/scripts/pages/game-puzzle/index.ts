import { Form } from '@/scripts/form';
import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { GamePuzzleController } from './game/controller';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';

const content: IContent = {
    screenClass: 'screen--game-puzzle',
    title: 'Новогодний пазл',
    date: 'Дата открытия: 20 декабря 2025',
    eyebrow: 'Активность №1',
    rules: '<p>Ваша задача&nbsp;&mdash; собрать новогодний пазл.</p> <p>Под картинкой вы&nbsp;увидите перемешанные фрагменты&nbsp;&mdash; выберите каждый из&nbsp;них по&nbsp;очереди и&nbsp;вставьте на&nbsp;свое место. Если кусочек подходит, он&nbsp;сразу займёт своё место, а&nbsp;если нет&nbsp;&mdash; попробуйте другой. Когда весь пазл сложится, игра будет успешно завершена.</p> <p>Пусть это станет первым шагом к&nbsp;нашему праздничному чуду!</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = 'ecco_puzzle';

    const form = new Form();
    cleanupList.push(() => form.cleanup());

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                form,
                gameKey,
                GameControllerClass: GamePuzzleController,
                content,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
