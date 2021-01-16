import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';

import { AuthContext } from '../../auth/AuthContext';
import { mount } from 'enzyme';
import { Navbar } from '../../components/ui/NavBar';
import { types } from '../../types/types';

/* 
    Importante: Para hacer pruebas en el hook 'useHistory()', hacer lo indicado en este componente de pruebas, hacer el 
    mock del history, y debemos importar el Router y proveerle el mock
*/


describe('Pruebas en <Navbar />', () => {
    const historyMock ={
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }
    
    
    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged:true,
            name: 'Pedro'
        }
    }


    
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />

                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    )
    
    afterEach(()=>{
        jest.clearAllMocks();
    })

    // Nos sirve para que se limpie despues de cada una de las pruebas

    test('debe de mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-informacion').text().trim()).toBe('Pedro')

    })

    test('debe de llamar el logout y usar history', () => {
        wrapper.find('button').prop('onClick')()

        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type: types.logout
        })
        console.log(historyMock.replace);
        
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    })
    


    
})
