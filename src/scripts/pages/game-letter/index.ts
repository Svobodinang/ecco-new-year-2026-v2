import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { LetterWidget } from './letterWidget';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';
import { gameIds, games } from '@/scripts/games';

const curentGameIndex = games.findIndex((game) => game.id === gameIds.LETTER);
const curentGame = games[curentGameIndex];

const content: IContent = {
    screenClass: `screen--${curentGame.id}`,
    title: 'Поздравление коллеге',
    date: curentGame.dateText,
    eyebrow: `Активность №${curentGameIndex + 1}`,
    rules: '<p>Делитесь праздничным настроением и&nbsp;отправляйте поздравления коллегам!</p> <p>Заполните форму и&nbsp;ваш коллега получит на&nbsp;электронную почту* тематическую открытку и&nbsp;одно из&nbsp;300 уникальных тематических поздравлений.</p> <p>Количество отправок не&nbsp;ограничено!</p> <p class="label-small">*на&nbsp;корпоративную или, при ее&nbsp;отсутствии, на&nbsp;ту, что была указана при регистрации в&nbsp;ECCO Club, директора магазинов получат поздравления на&nbsp;почту магазина</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = `ecco_${curentGame.id}`;

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                gameKey,
                GameControllerClass: LetterWidget,
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
