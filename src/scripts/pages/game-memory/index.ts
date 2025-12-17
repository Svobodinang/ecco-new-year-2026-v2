import { Form } from '@/scripts/form';
import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { GameMemoryController } from './game/controller';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';

const content: IContent = {
    screenClass: 'screen--game-memory',
    title: 'Новогодняя пара',
    date: 'Дата открытия: 22&nbsp;декабря 2025',
    eyebrow: 'Активность №3',
    rules: '<p>Время наводить уют и&nbsp;порядок.</p> <p>Сегодня вам предстоит разобрать по&nbsp;парам одинаковые новогодние игрушки.</p> <p>Переворачивайте карточки, чтобы найти все совпадающие пары.</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = 'ecco_memory-game';

    const form = new Form();
    cleanupList.push(() => form.cleanup());

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                form,
                gameKey,
                GameControllerClass: GameMemoryController,
                content,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
