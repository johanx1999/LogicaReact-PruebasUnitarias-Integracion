import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { getHeroesById } from '../../selectors/getHeroesById';

/* 
    Componente encargado de mostrar la informacion del heroeen la pagina individual con la imagen y descripcion

    Para extraer la informacion del heroe por los parametros 
    Si el heroe no existe redirigir hacia la pagina inicial

    Para movernos por las paginas anteriores desestructuramos el history que viene por defecto en el componente 

    ¿COMO RECIBIR PARAMETROS DE LA URL?= importar use params de react-router-dom; este Hook extrae los parametros que vallan
    por la url

    Solo re vuelve a llamar la funcion getHeroesById si el heroeId cambia

    ANIMACIONES: 'animate__animated animate__fadeInLeft' de la pagina web "https://animate.style/"

*/
export const HeroeScreen = ({history}) => {

    const {heroeId} = useParams();
    const hero = useMemo(()=> getHeroesById(heroeId), [heroeId]);
    // console.log(heroeId);
    // console.log(hero);
    
    if(!hero){
        return <Redirect to='/' />
    }

    const handleReturn = () =>{


        if( history.length <=2 ) {
            history.push('/');
        } else {
            history.goBack();
        }
    
    }

    const {
        superhero, 
        publisher, 
        alter_ego, 
        first_appearance, 
        characters
    } = hero;


    

    return (
        <div className='row mt-5'>
            <div className='col-4'>
                <img 
                    src={`../assets/heroes/${heroeId}.jpg`}
                    alt={superhero}
                    className='img-thumbnail animate__animated animate__fadeInLeft'
                />

            </div>

            <div className='col-8 animate__animated animate__fadeIn'>
                <h3> {superhero} </h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'> <b> Alter_ego: </b> {alter_ego} </li>
                    <li className='list-group-item'> <b> Publisher: </b> {publisher} </li>
                    <li className='list-group-item'> <b> First_appearance </b> {first_appearance} </li>
                </ul>

                <h5>Characters</h5>
                <p> {characters} </p>

                <button
                    className='btn btn-outline-info'
                    onClick={handleReturn}
                >
                    Return
                </button>

            </div>


        </div>
    )
}
