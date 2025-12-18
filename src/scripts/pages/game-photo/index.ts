import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { PhotoWidget } from './photoWidget';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';
import { gameIds, games } from '@/scripts/games';

const curentGameIndex = games.findIndex((game) => game.id === gameIds.PHOTO);
const curentGame = games[curentGameIndex];

const content: IContent = {
    screenClass: `screen--${curentGame.id}`,
    title: 'Новогодняя фотография',
    date: curentGame.dateText,
    eyebrow: `Активность №${curentGameIndex + 1}`,
    rules: '<p>Поделитесь своим праздничным настроением&nbsp;&mdash; загрузите свою новогоднюю фотографию.</p> <p>Она станет частью большого корпоративного новогоднего коллажа.</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = `ecco_${curentGame.id}`;

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                gameKey,
                GameControllerClass: PhotoWidget,
                content,
                game: curentGame,
            })
        );
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
