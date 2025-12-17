export const useBurgerMenu = (): (() => void) => {
    const burgerButton = document.getElementById('burgerButton');
    const closeBurgerButton = document.getElementById('closeBurgerButton');
    const burgerContainer = document.getElementById('burger-container');
    const burgerActivitiesLink = document.getElementById('burgerActivities');

    const showBurgerMenu = () => {
        if (burgerContainer) {
            burgerContainer.classList.add('show');
        }
    };

    const closeBurgerMenu = () => {
        if (burgerContainer) {
            burgerContainer.classList.remove('show');
        }
    };

    burgerButton?.addEventListener('click', showBurgerMenu);
    closeBurgerButton?.addEventListener('click', closeBurgerMenu);
    burgerActivitiesLink?.addEventListener('click', closeBurgerMenu);

    return () => {
        if (burgerButton) {
            burgerButton.removeEventListener('click', showBurgerMenu);
        }
    };
};
