import getRandomImage from './nasa-api';
import { el } from './helpers';
import { save, load } from './storage';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {

    image = await getRandomImage();

    img.setAttribute('src', image.imageUrl);
    text.innerText = image.text;
    title.innerText = image.title;
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
    save(image.type, image.imageUrl, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {

    document.getElementById("new-image-button").onclick = getNewImage;
    document.getElementById("save-image-button").onclick = saveCurrentImage;
    
    img = document.querySelector('.apod__image');
    title = document.querySelector('.apod__title');
    text = document.querySelector('.apod__text');

    getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
    const main = document.querySelector('main');
    const images = load();

    images.forEach((item) => {
        const titleElement = el('h1');
        titleElement.innerText = item.title;

        const imageElement = el('img');
        imageElement.setAttribute('src', item.imageUrl);
        imageElement.classList.add('apod__image');

        const favorite = el('div', titleElement, imageElement);
        main.appendChild(favorite);
        
        console.log(item.title);
    });

}
