import React from 'react'
import PropTypes from 'prop-types';

import {
    Route,
    Redirect
} from "react-router-dom";

/* 
    Solo los usuarios autenticados deberian ver las rutas de la url, si las rutas no son privadas
    el usuario puede poner en la ruta la direccion deseada y puede saltar el login

    Vamos a proteger el psth='/' ya que cualquier ruta pasa por el '/' y lo que nececitamos hacer es renderizar ese 
    componente de manera condiccional
    1- Importamos solo Route y Redirect
    2- Creamos el componente con las propiedades extraidas en llaves {objeto} isAutenticated y component el cual renombramos
    con C mayuscula para que React sepa que es un componente y con el (...rest) extraemos todos los otros valores como 
    el path o el exact
    3- Retornamos un Route con todo lo que llega mediante del operador {...rest}
    4- Retornamos mediante el operador ternario un componente u otro, el componente solicitado o lo redirigimos hacia el
    '/login'
    5- {...rest} son las propiedades exact path='/', etc; props son las anteriores propiedades pero con todas las props
    o lo que sobra del rest lo asignamos a el componente, estas son recinidas por la funcion  de flecha y pasan a el componente
    6- Si esta autenticado muestra el componente deseado por el usuario sino lo envia hacia el login
    NOTA: diferencia entre el operador 'spreed y rest ' es que cuando estamos en los argumentos es el{...rest} y por fuera
    es el spreed 
    7- Si no esta autenticado lo redirigimos hacia el login 
    8- Debemos de obligarnos a poner los argumentos isAutenticated y component

    PARA RECORDAR LA ULTIMA PAGINA VISITADA
    guardamos la ultima pagina con el ultimo path visitado, en el local storage y luego lo extraemos
    desde el loginScreen y lo ponemos en history.replace(lastPath)

*/

export const PrivateRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {

    localStorage.setItem('lastPath', rest.location.pathname)

    // console.log(rest.location.pathname);
    
    return (
        <Route {...rest}
        component={(props)=>(
            (isAutenticated)
            ?(<Component {...props}/>)
            :(<Redirect to='/login' />)
        )}
            
        />
    )
}

PrivateRoute.protoTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
