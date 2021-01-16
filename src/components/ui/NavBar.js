import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'

/* 
    creamos la funcion que se encargue de enviar la accion respectiva del logout y que se borre el nombre del usuario

    -Con el handleLogout enviamos la accion de tipo logout para que nos ponga el logged en falso 
*/


export const Navbar = () => {
    
    const {user, dispatch} = useContext(AuthContext)

    const history = useHistory();
    // console.log(history);
    
    
    const handleLogout = () =>{

        history.replace('/login')
        dispatch({
            type: types.logout
        })

    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar ml-auto navBar">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-informacion" >
                        {user.name}
                    </span>

                    <button 
                        className='nav-item nav-link btn'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    
                    
                </ul>
            </div>
        </nav>
    )
}