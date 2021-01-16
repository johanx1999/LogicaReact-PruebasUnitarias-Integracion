import { heroes } from '../data/heroes';
/* 
    Solo retorna aquellos que tengan el publisher correcto y que tengan el mismo publisher
    .filter = El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.

*/
export const getHeroesByPublisher = (publisher) => {

    const validPublisher = ["Marvel Comics", "DC Comics"];

    if(!validPublisher.includes(publisher)){
        throw new Error(`publisher ${publisher} no es correcto`)
    }

    return heroes.filter(hero => hero.publisher === publisher);
}
