import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

    /* 
        History.push = Propiedades de las rutas
        .push= para redirigir a otra pagina al hacer click
        .replace= para que cuando le de click no devuelva a la anterior
    */

    /* 
        Debemos de extraer solo el dispatch de mi AuthContext, utilizando el useContext e importandolo
        1- Creamos el nuevo usuario que es el que vamos a enviar por el payload de mi accion
        2- Creamos la accion de tipo login y con el payload de usuario 
        3- Con el dispatch le enviamos la accion a nuestro authReducer para que lo evalue
    
        const newUser = {
            name: 'johan'
        }

        const action = {
            type: types.login,
            payload: newUser
        }

        dispatch(action)
        console.log('registro exitoso');
        history.replace('/')

    
    */

export const LoginScreen = ({history}) => {

    const {dispatch} = useContext(AuthContext)

    const handleLogin = () =>{
 
        const lastPath = localStorage.getItem('lastPath') || '/';
        // Forma simplificada de hacer el dispatch
        dispatch({
            type: types.login,
            payload: {
                name: 'johan'
            }
        })
        
        console.log('registro exitoso');
        history.replace(lastPath);
        
    }

    return (
        <div className='container mt-5'>
            <h1>Login</h1>
            <hr/>

            <button
                className='btn btn-primary'
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
