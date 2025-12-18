import { createScreenManager } from '@/scripts/core/screen-manager';
import {
    buildTitleScreen,
    buildRulesScreen,
    buildHelpTitle,
    buildGameScreen,
    buildLoseScreen,
    buildWinScreen,
    buildWinAuthScreen,
    buildTitleStopPhotoScreen,
    IContent,
} from './screens';
import { TScreensMap } from '@/scripts/core/screen-manager';
import { gameStatuses } from './gameStatuses';
import { Form, screenNames as formScreenNames } from '@/scripts/form';
import { setCookie } from '@/scripts/core/cookie';
import { Game5lettersController } from '../game-5-letters/game/controller';
import { GameControllerAbstract } from './gameControllerAbstract';
import { GameMemoryController } from '../game-memory/game/controller';
import { PhotoWidget } from '../game-photo/photoWidget';
import { LetterWidget } from '../game-letter/letterWidget';
import { GamePuzzleController } from '../game-puzzle/game/controller';
import { useInview } from '@/scripts/useInview';
import { useResults } from '../../useResults';
import { currentProjectStatus, gameIds, IGame, projectStatuses } from '@/scripts/games';

export const useScreenManager = ({
    gameKey,
    GameControllerClass,
    content,
    game,
}: {
    gameKey: string;
    GameControllerClass:
        | typeof Game5lettersController
        | typeof GameMemoryController
        | typeof PhotoWidget
        | typeof LetterWidget
        | typeof GamePuzzleController;
    content: IContent;
    game: IGame;
}) => {
    const container: HTMLElement | null = document.getElementById('screen-container');
    const helpTitleContainer: HTMLElement | null = document.getElementById('title-wrapper');
    const cleanupList: (() => void)[] = [];

    const openDate = new Date(game.date);
    openDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!container || !helpTitleContainer || today < openDate) return () => {};

    let form: Form | null = null;
    if (currentProjectStatus === projectStatuses.IN_PROGRESS) {
        form = new Form();
        cleanupList.push(() => form?.cleanup());
    }
    if (currentProjectStatus === projectStatuses.ENDED) {
        useResults();
    }

    const helpTitleScreens: TScreensMap = {
        helpTitle: () => {
            return {
                newNode: buildHelpTitle(content),
            };
        },
    };
    const helpTitleManager = createScreenManager(helpTitleContainer, helpTitleScreens);

    const gameController = new GameControllerClass({
        onEndGame: (status: string, noChangeScreen?: boolean): void => {
            setTimeout(() => {
                if (status === gameStatuses.WIN) {
                    if (
                        currentProjectStatus === projectStatuses.IN_PROGRESS &&
                        form &&
                        !form.isAuth
                    ) {
                        if (!noChangeScreen) manager.showScreen('winNotAuth');
                    } else {
                        setCookie(gameKey, 'win');
                        if (!noChangeScreen) manager.showScreen('winAuth');
                    }
                } else if (!noChangeScreen) manager.showScreen('lose');
            }, 300);
        },
    }) as GameControllerAbstract;

    const screens: TScreensMap = {
        title: () => {
            return {
                newNode:
                    currentProjectStatus === projectStatuses.ENDED && game.id === gameIds.PHOTO
                        ? buildTitleStopPhotoScreen(content)
                        : buildTitleScreen(content, () => manager.showScreen('rules')),
                onMount: () => {
                    cleanupList.push(useInview());
                },
            };
        },
        rules: () => {
            return {
                newNode: buildRulesScreen(content, () => {
                    if (
                        currentProjectStatus === projectStatuses.IN_PROGRESS &&
                        form &&
                        !form.isAuth
                    ) {
                        form.showScreen({
                            screenName: formScreenNames.CALL,
                            onClose: () => {
                                manager.showScreen('game');
                            },
                        });
                    } else {
                        manager.showScreen('game');
                    }
                }),
                onMount: () => {
                    helpTitleManager.showScreen('helpTitle');
                },
            };
        },
        game: () => {
            return {
                newNode: buildGameScreen(content),
                onMount: () => {
                    try {
                        gameController.startGame();
                    } catch (e) {
                        console.error(e);
                        manager.showScreen('lose');
                    }
                },
            };
        },
        lose: () => {
            return {
                newNode: buildLoseScreen(content, () => manager.showScreen('game')),
            };
        },
        winNotAuth: () => {
            return {
                newNode: buildWinScreen(
                    content,
                    () =>
                        form?.showScreen({
                            screenName: formScreenNames.FORM,
                            onAuth: () => {
                                setCookie(gameKey, 'win');
                                manager.showScreen('winAuth');
                            },
                        }),
                    () => manager.showScreen('game')
                ),
            };
        },
        winAuth: () => {
            return {
                newNode: buildWinAuthScreen(
                    content,
                    () => manager.showScreen('game'),
                    !!(currentProjectStatus === projectStatuses.ENDED)
                ),
            };
        },
    };

    const manager = createScreenManager(container, screens);

    manager.showScreen('title');

    return () => {
        gameController.endGame();

        cleanupList.forEach((cleanup) => cleanup());
    };
};
