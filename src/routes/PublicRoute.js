import React from 'react';
import PropTypes from 'prop-types';

import {
    Route,
    Redirect
} from "react-router-dom";

/* 
    Si no esta autenticado redirigir a el login y si esta autenticado redirigir a el '/' que es donde estan ubicados todos
    las rutas privadas

*/


export const PublicRoute = ({
    isAutenticated,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest}
        component={(props)=>(
            (!isAutenticated)
            ?(<Component {...props}/>)
            :(<Redirect to='/' />)
        )}
            
        />
    )
}

PublicRoute.protoTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
