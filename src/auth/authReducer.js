import { types } from "../types/types";

export const authReducer = (state= {}, action) => {


/* 
    -action.type: la propiedad de la accion, en caso de que sea types.login de types.js muestra o retorna todo lo que venga
    en el action.payload y la autenticacion logged: true
    -en caso de que sea types.logout, no me interesa lo que tenga en el payload solamente voy a retornar un nuevo estado
    de logged:false
    -Es importante manejar el default aunque no haga nada voy a hacer un return de state
*/

    



    switch (action.type) {
        case types.login:
            
            return{
                ...action.payload,
                logged: true
            }
        case types.logout:
            
            return{
                logged: false 
            }
    
        default:
            return state;
    }

}
