import { Form } from '@/scripts/form';
import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { GameMemoryController } from './game/controller';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';
import { gameIds, games } from '@/scripts/games';

const curentGameIndex = games.findIndex((game) => game.id === gameIds.GAME_MEMORY);
const curentGame = games[curentGameIndex];

const content: IContent = {
    screenClass: `screen--${curentGame.id}`,
    title: 'Новогодняя пара',
    date: curentGame.dateText,
    eyebrow: `Активность №${curentGameIndex + 1}`,
    rules: '<p>Время наводить уют и&nbsp;порядок.</p> <p>Сегодня вам предстоит разобрать по&nbsp;парам одинаковые новогодние игрушки.</p> <p>Переворачивайте карточки, чтобы найти все совпадающие пары.</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = `ecco_${curentGame.id}`;

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
