import { IContent } from '../game-common/screens';
import { useScreenManager } from '../game-common/screen-manager';
import { GamePuzzleController } from './game/controller';
import { useBurgerMenu } from '@/scripts/useBurgerMenu';
import { gameIds, games } from '@/scripts/games';

const curentGameIndex = games.findIndex((game) => game.id === gameIds.GAME_PUZZLE);
const curentGame = games[curentGameIndex];

const content: IContent = {
    screenClass: `screen--${curentGame.id}`,
    title: 'Новогодний пазл',
    date: curentGame.dateText,
    eyebrow: `Активность №${curentGameIndex + 1}`,
    rules: '<p>Ваша задача&nbsp;&mdash; собрать новогодний пазл.</p> <p>Под картинкой вы&nbsp;увидите перемешанные фрагменты&nbsp;&mdash; выберите каждый из&nbsp;них по&nbsp;очереди и&nbsp;вставьте на&nbsp;свое место. Если кусочек подходит, он&nbsp;сразу займёт своё место, а&nbsp;если нет&nbsp;&mdash; попробуйте другой. Когда весь пазл сложится, игра будет успешно завершена.</p> <p>Пусть это станет первым шагом к&nbsp;нашему праздничному чуду!</p>',
};

const init = () => {
    const cleanupList: (() => void)[] = [];
    const gameKey = `ecco_${curentGame.id}`;

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());

        cleanupList.push(
            useScreenManager({
                gameKey,
                GameControllerClass: GamePuzzleController,
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
