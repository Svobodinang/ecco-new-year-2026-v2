const initViewportUnits = () => {
    const clientH = document.documentElement.clientHeight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty('--client-h-unit', `${clientH / 100}px`);
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};

window.addEventListener('resize', initViewportUnits);

initViewportUnits();
