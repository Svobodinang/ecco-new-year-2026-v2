import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useInview = (targetClass: string = '.inview', parentEl: HTMLElement | null = null) => {
    let scrollTriggers: ScrollTrigger[] = [];
    const activeClass = 'entered';

    const inviewEls: HTMLElement[] = Array.from(
        parentEl ? parentEl.querySelectorAll(targetClass) : document.querySelectorAll(targetClass)
    );

    const addInview = () => {
        const wordsBetweenMs = 100;
        const lettersBetweenMs = 50;

        inviewEls.forEach((trigger) => {
            let wordsDelay = 0;

            if (trigger.classList.contains('inview--title')) {
                const words: HTMLElement[] = Array.from(trigger.querySelectorAll('.inview-word'));

                words.forEach((word: HTMLElement, index) => {
                    if (word.classList.contains('inview-word--accent')) {
                        const letters: HTMLElement[] = Array.from(
                            word.querySelectorAll('.inview-letter')
                        );

                        letters.forEach((letter: HTMLElement, letterIndex) => {
                            letter.style.transitionDelay = `${wordsDelay + letterIndex * lettersBetweenMs}ms`;
                        });

                        wordsDelay += (letters.length - 1) * lettersBetweenMs;
                    } else {
                        word.style.transitionDelay = `${wordsDelay + (index > 0 ? wordsBetweenMs : 0)}ms`;

                        wordsDelay += wordsBetweenMs;
                    }
                });
            }

            if (trigger.classList.contains('inview--first-load')) {
                setTimeout(() => {
                    trigger.classList.add(activeClass);
                }, 500);
            } else {
                scrollTriggers.push(
                    ScrollTrigger.create({
                        trigger,
                        start: `top ${trigger.classList.contains('inview--nav') ? 'center' : '80%'}`,
                        end: 'bottom top',
                        onToggle: ({ isActive }) => {
                            if (isActive) trigger.classList.add(activeClass);
                        },
                    })
                );
            }
        });
    };

    addInview();

    return () => {
        scrollTriggers.forEach((t) => t.kill());

        scrollTriggers = [];
    };
};
