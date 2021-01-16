import React, { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import queryString from 'query-string'
import { getHeroesByName } from '../../selectors/getHeroesByName';
/* 
    IMPORTANTE: Para utilizar correctamente el useForm y que nuestro input funcione correctamente
    debemos hacer lo siguiente
    1- importar nuestro useForm, y extraemos los valores que necesitamos  [value, handleInputChange, reset]
    2- Le asignamos el initialForm con los campos que yo desee como un objeto y le asignamos el valor
    3- Extraemos del value el valor del campo de mi formulario desestructurandolo 
    4- Creamos una funcion que se encargue de capturar la informacion del input al hacerle Submit a el formulario y la 
    asignamos a el submit del formulario
    ***Es importante ponerle el preventDefault a la funcion para que se envie solo cuando le de enter o click en el boton
    5- Nuestro input debe de tener los siguiente valores para que pueda funcionar; IMPORTANTE: el valor del value, 
    el name debe ser el mismo que extraemos del formValues y en el input; el handleInputChange extraido del formValues
    y tambien lo asignamos en el input

    name='searchText'
    value={searchText}
    onChange={handleInputChange}

    QUERYSTRING: En resumen, las Query String permiten acceder a páginas web dinámicas con distintas variables
    consiguiendo así que las páginas web no estén compuestas de decenas de directorios y permitiendo que su
    estructura esté basada en URLs amigables para el posicionamiento web SEO.
    -Es la url y lo que buscamos
    -Para trabajar con los queryString debemos de hacer la instalacion 'npm install query-string' y debemos de importarlo
    en nuestro componente ' import queryString from 'query-string' '
    -useLocation: devuelve un objeto con la ubicacion actual de la url 
    
    ***En el handleSearch le añadimos a el history con el push el '?q=${searchText}' que es lo que vamos a parcear con 
    queryString.parse(location.search);  nosotros al darle enter o submit al formulario vamos a recibir lo que hemos escrito

    -history.push(`?q=${searchText}`):  con esto lo que hacemos es añadir la palabra clave o que deseo buscar la ponemos 
    en la url
    -const location = useLocation(): con esto lo que hacemos es extraer el valor de la url en un objeto
    -queryString.parse(location.search): con esto lo que hacemos es parcear en un objeto json y le extraemos la propiedad
    .search que es la que tiene el valor escrito en mi campo del input
    -const {q=''} = queryString.parse(location.search): Le asignamos un string vacio por defecto para que no nos salga un 
    undefined si no le enviamos nada en la url.
    -Le asignamos la (q) como valor inicial de mi searchText para cuando refresquemos el navegador siga en nuestra pagina

    -Creamos una funcion que se encargue de buscar los he   roes que incluyan las palabras indicadas
    y la asignamos en  'const heroesFiltered = getHeroesByName(searchText);' para que nos muestre
    con el map un array con todos los que coincidan
    -Le enviamos a nuestra funcion getHeroesByName(searchText) el searchText que es el que utilizara
    para filtrar los heroes

    -IMPORTANTE: Utilizamos el useMemo para que no me busque los heroes cada vez que pulse una tecla

    -Mensajes condicionales
*/


export const SearchScreen = ({history}) => {
    
    const location = useLocation();
    const {q=''} = queryString.parse(location.search);
    
    const [value, handleInputChange] = useForm({
        searchText: q
    })
    const { searchText } = value;
    
    const heroesFiltered = useMemo(() =>  getHeroesByName(q) , [q])

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`)
        // console.log(searchText);

    }

    

    return (
        <div>
            <div className='row'>
                <div className='col-5'>
                    <h4>SearchForm</h4>
                    <hr />
                    <form onSubmit={handleSearch}>
                        <input
                            type='text'
                            placeholder='Find your hero'
                            className='form-control'
                            name='searchText'
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete='off'
                        />

                        <button
                            type='submit'
                            className='btn m-1 ntn-block btn-outline-primary'
                        >
                            Search...
                        </button>
                    </form>
                </div>

                <div className='col-7'>
                    <h4>Results</h4>
                    <hr />
                    
                    {
                        ( q==='' )
                        &&
                        <div className='alert alert-info'>
                            Search A Hero
                        </div>
                    }
                    {
                        ( q!=='' && heroesFiltered.length === 0 )
                        &&
                        <div className='alert alert-danger'>
                            There is no a hero with "{q}"
                        </div>
                    }
                    
                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
