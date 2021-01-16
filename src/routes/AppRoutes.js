import React, { useContext } from 'react'
    import {
      BrowserRouter as Router,
      Switch,
    //   Route,
    } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../components/login/LoginScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

/* 
    El router Principal nos pociciona en el login o nos redirige hacia las demas rutas

    History push/Replace

    RUTAS PRIVADAS
    1- Importamos el useContext con el AuthContext y extraemos el user para saber si si o no esta autenticado de nuestro
    componente
    2- Con el isAutenticated={user.logged} enviamos a nuestro componente el logged para saber si esta registrado y apartir de ahi
    mostrar un componente u otro
    IMPORTANTE: Es recomendable siempre poner el history.replace('/') despues del dispatch
    3- Cambiamos el Route y ponemos nuestro componente <PrivateRoute /> con sus propiedades requeridas

*/


export const AppRoutes = () => {

    const {user} = useContext(AuthContext)

    return (
        <Router>
            <div>
    

                <Switch>
                    <PublicRoute
                        exact path="/login" 
                        component={LoginScreen}
                        isAutenticated={user.logged}
                    />
                    {/* <Route  path="/" component={DashboardRoutes} /> */}

                    <PrivateRoute 
                        path='/'
                        component={DashboardRoutes}
                        isAutenticated={user.logged}
                    />
                    
                </Switch>
            </div>
        </Router>
    )
}



