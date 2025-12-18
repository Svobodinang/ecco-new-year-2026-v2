import '@/styles/main.scss';
import '@/utils/initViewportUnits';
import { useBurgerMenu } from '../../useBurgerMenu';
import { useInview } from '../../useInview';

const init = () => {
    const cleanupList: (() => void)[] = [];

    window.addEventListener('DOMContentLoaded', () => {
        cleanupList.push(useBurgerMenu());
        cleanupList.push(useInview());
    });

    window.addEventListener('beforeunload', () => {
        cleanupList.forEach((cleanup) => cleanup());
    });
};

init();
