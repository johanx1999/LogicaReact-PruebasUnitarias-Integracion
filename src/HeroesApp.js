import React, { useEffect, useReducer } from 'react'
import { AuthContext } from './auth/AuthContext'
import { authReducer } from './auth/authReducer'
import { AppRoutes } from './routes/AppRoutes'

/* 
    IMPORTANTE: 
    1- con el init le vamos a crear una funcion que va a extraer del localStorage el estado de autenticacion
    del usuario, si no esta guardado en el localStorage va a tener el 'logged:false'

    2- Importamos el useReducer y creamos el 'snipet' le ponemos como primer argumento el authReducer como reducer y 
    lo debemos de importar respectivamente initialState como un objeto vacio y el init como la 
    funcion creada anterior mente 
    3- Importamos el <AuthContext.Provider> con el value que es un objeto y tendra que ser enviado con doble llaves
    el user y el dispatch con esto estara esta informacion disponible por toda mi aplicacion 
    ***const [state, dispatch] = useReducer(reducer, initialState, init)
    -siempre voy a crear el init porque voy a leer el localStarage
    ***NOTA: Voy a tener acceso a nuestro usuario en cualquier parte de mi aplicacion 
    -el init es lo que se va a pasar siempre a mi initialState

    -NOTA: Grabamos en el localStorage con el useEffect cada vez que cambie el user


    ***Ahora ya tengo la habilidad de hacer el dispatch y obtener el usuario a lo largo de toda mi aplicacion no importa
    donde este ubicado porque el AppRouter es el nivel mas alto de mi aplicacion
*/


export const HeroesApp = () => {
    
    const init = () =>{
        return JSON.parse(localStorage.getItem('user')) || {logged:false}
    }
    
    
    const [user, dispatch] = useReducer(authReducer, {}, init)
    
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
        
    }, [user])
    return (
       <AuthContext.Provider value={{
           user, dispatch
       }}>

           <AppRoutes />

       </AuthContext.Provider>

    )
}
