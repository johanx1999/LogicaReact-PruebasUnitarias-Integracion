import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routes/DashboardRoutes';



// import Adapter from 'enzyme-adapter-react-16';
// import { configure } from 'enzyme';

// configure({adapter: new Adapter()});



/* 
    Si esta autenticado debera tener en esta clase '.text-informacion' el nombre de mi usuario
    -Con el contextValue simulamos el contexto de mi aplicacion 'el dispatch y el usuario'
        
*/


describe('Pruebas en <DashboardRoutes />', () => {

    test('debe de mostrarse correctamente', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'juanito'
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )
        

        console.log(wrapper.html());
        
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-informacion').text().trim()).toBe('juanito')
    })
    

})
