import { heroes } from "../data/heroes";

/* 
    Funcion encargada de devolver un array vacio si el name es un string vacio
    -toLocaleLowerCase: Se encarga de convertir el texto recibido, a minusculas
    -filter:  crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    -Esta funcion retorna solo los heroes que incluyan los caracteres indicados 
    -Barremos el array heroes y lo evaluamos si el superhero incluye el name recibido lo muestra  
*/

export const getHeroesByName = (name='') => {
    if(name === '') {
        return [];

    }

    name.toLocaleLowerCase()
    
    return heroes.filter(hero=> hero.superhero.toLocaleLowerCase().includes(name))
}
