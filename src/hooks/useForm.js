import { useState } from "react"

/* 
    ¿Como crear un formulario con useState?
    
    -Creamos una funcion llamada useForm y recibimos como argumento el initialState que 
    por defecto sera un objeto vacio
    -Importamos el useState y le asignamos el initial state que recibimos en la 
    funcion useForm
    -El setValues es el encargado de modificar el estado de mi values asi que si queremos modificar
    el valor del formulario debemos de llamar el setValues
    -En la funcion 'handleInputChange' recibimos y desestructuramos el target que recibimos del input 
    al hacer el 'onChange', enviamos un objeto con el anterior valor del values y le asignamos
    -El [ target.name ]: target.value = IMPORTANTE: El target esta apuntando a este
    objeto osea a el <input />
    *Si imprimo el target.name: apunta a el elemento el cual cambio y voy a tener el 
    valor del mismo input; pero no se ven en mi input en el HTML
    **Para establecer en el setState y se vea en el input; en el 
    // establecemos el objeto con las llaves, con el operador spread desestructuramos 
    // todo el values por si hay propiedades que no estan cambiando  
    // El [target.name]: Significa que el nombre de esta propiedad sea lo que venga
    de mi objeto (email, name, etc)
    // El target.value es lo que le vamos a asignar de valor a [target.name]
    
    setValues({
        ...values,
        [ target.name ]: target.value
    })

    - En el return: retornamos como un array los valores de mi formulario
    
*/


export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }

    return [ values, handleInputChange, reset ];

}