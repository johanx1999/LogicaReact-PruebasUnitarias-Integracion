import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../selectors/getHeroesByPublisher'
import { HeroCard } from './heroes/HeroCard';

/* 
    Este componente se encarga de mostrar los heroes en una etiqueta <li></li> de acuerdo a su publisher    
    ***Cambiamos la etiqueta <li></li>  por mi componente <HeroCard /> ya que este traera toda la informacion

    Hacemos que recorra todo los heroes y le asignamos la key el id y con el operador spread(...)
    enviamos las demas propiedades del heroe que extraeremos luego en el componente <HeroCard />
    -Extrae cada una de las propiedades del heroe y son las nuevas propiedades que le envio al heroe

    useMemo = Solo se genera heroes llamando mi funcion unicamente si el publisher cambia 
*/
 

export const HeroList = ({publisher}) => {
    
    const heroes = useMemo(()=>getHeroesByPublisher(publisher), [publisher]) 
    
    return (
        <ul>
            {
                heroes.map(hero=> (
                    <HeroCard 
                        key={hero.id}
                        {...hero}
                    />
                ))
            } 
        </ul>
    )
}
