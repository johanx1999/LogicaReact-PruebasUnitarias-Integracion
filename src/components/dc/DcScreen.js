import React from 'react'
import { HeroList } from '../HeroList'

/* 
    Componente encargado de mostrar el listado de los heroes de "DcComics"
    llamando el componente HeroList.js 
*/

export const DcScreen = () => {



    return (
        <div>
            <h1>DcScreen</h1>
            <hr/>
            <HeroList publisher={'DC Comics'} />
        </div>
    )
}
