import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../routes/PrivateRoute';


// SOLUCION A EL SIGUIENTE ERROR
// import Adapter from 'enzyme-adapter-react-16';
// import { configure } from 'enzyme';

// configure({adapter: new Adapter()});
/* 
        Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none.
        To configure an adapter, you should call `Enzyme.configure({ adapter: new Adapter() })`
        before using any of Enzyme's top level APIs, where `Adapter` is the adapter
        corresponding to the library currently being tested. For example:
*/



/* 
    EXPLICACION: Le enviamos todos los argumentos requeridos por mi privateRoute, Con las props simulamos la direccion de 
    la url
    -Enviamos el isAutenticated y el componente: Este lo simulamos con una funcion de flecha y una etiqueta HTML para 
    luego verificar si existe en el wrapper
    -El <MemoryRouter/> es otro High Order Component, hecho para hacer pruebas del router con ciertas rutas, No olvidar Importarlo
    que nos sirve para hacer las pruebas con Route
    -Con las props simulamos las propertys cuando estamos autenticados
    si no esta autenticado nuestro <Redirect/> sera un Strin vacio

    ***Con el Storage.prototype.setItem=  simulamos una funcion jest.fn() para simular mi funcion
    -En el expect del localStorage esperamos que se llame con los valores esperados, el lastPath lo toma de mi componente
    PrivateRoute y '/marvel' lo toma de las props que hemos simulado
*/

describe('Pruebas en <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn();

    const props = {
        location:{
            pathname: '/marvel'
        }
    }

    test('debe de mostrar el componente si esta autenticado y guardar en el localStorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAutenticated={true}
                    component={()=><span>listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        )
        // console.log(wrapper.html());

        expect(wrapper.find('span').exists()).toBe(true)
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')
        
    })




    test('debe de bloquear el componente si no esta autenticado', () => {
        const wrapper= mount(
            <MemoryRouter>
            
                <PrivateRoute 
                    isAutenticated={false}
                    component={()=><span>Listo!</span>}
                    {...props}
                />
                
            </MemoryRouter>
        )
        expect(wrapper.find('span').exists()).toBe(false)
        expect(localStorage.setItem).toBeCalledWith('lastPath', '/marvel')

    })
    
    
    
})
