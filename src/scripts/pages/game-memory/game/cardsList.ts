import image1 from '/images/memory-game/1.png';
import image2 from '/images/memory-game/2.png';
import image3 from '/images/memory-game/3.png';
import image4 from '/images/memory-game/4.png';
import image5 from '/images/memory-game/5.png';
import image6 from '/images/memory-game/6.png';
import image7 from '/images/memory-game/7.png';
import image8 from '/images/memory-game/8.png';

export interface ICard {
    id: string;
    image: string;
}

export const cardsList: ICard[] = [
    {
        id: 'card-1',
        image: image1,
    },
    {
        id: 'card-2',
        image: image2,
    },
    {
        id: 'card-3',
        image: image3,
    },
    {
        id: 'card-4',
        image: image4,
    },
    {
        id: 'card-5',
        image: image5,
    },
    {
        id: 'card-6',
        image: image6,
    },
    {
        id: 'card-7',
        image: image7,
    },
    {
        id: 'card-8',
        image: image8,
    },
];
