import { heroes } from '../data/heroes'


/* 
    El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada.
    Ya que solo necesitamos el primero del id ya que el id es unico
*/


export const getHeroesById = (id) => {
    
    return heroes.find(hero=> hero.id === id);
    
}
