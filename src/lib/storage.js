/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);
  return JSON.parse(data);
}

/**
 * Vistaðar myndir með texta.
 *
 * @param {string} type annað hvort image eða video
 * @param {string} mediaUrl URL á myndinni/myndbandinu.
 * @param {string} text texti fyrir myndina/myndbandið.
 * @param {string} title titill fyrir myndina/myndbandið.
 */
export function save(type, imageUrl, text, title) {

  let favorites = load();

  if(favorites == null){
    favorites = [];
  }
    
  favorites.push({type, imageUrl, text, title});

  const data = JSON.stringify(favorites);

  console.log(data);
  localStorage.setItem(LOCALSTORAGE_KEY, data);
}

/**
 * Hreinsar allar myndir úr localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
}
