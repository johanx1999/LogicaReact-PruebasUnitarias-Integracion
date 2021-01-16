import React from 'react';
import { AuthContext } from '../../../auth/AuthContext';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

/* 
    Pruebas utilizando el context verificamos que se llamen las respectivas direcciones del useHistory
    -Pruebas en el localStorage y en funciones que disparan acciones

*/


describe('Pruebas en <LoginScreen />', () => {
    const history = {
        replace: jest.fn()
    }

    const contexValue = {
        dispatch: jest.fn(),
        user:{
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={contexValue}>
            <LoginScreen history={history} />
        </AuthContext.Provider>
    )

        test('debe de mostrarse correctamente', () => {
            expect(wrapper).toMatchSnapshot();
        })

        test('debe de realizar el dispatch y la navegacion', () => {
            wrapper.find('button').prop('onClick')();

            expect(contexValue.dispatch).toHaveBeenCalledWith({
                type: types.login,
                payload:{
                    name: 'johan'
                }
            });
            expect(history.replace).toHaveBeenCalled()
        })

        
        // Simulacion del localStorage
        test('debe de realizar el dispatch y navegacion', () => {
            const handleClick = wrapper.find('button').prop('onClick');
            handleClick();

            expect(contexValue.dispatch).toHaveBeenCalledWith({
                type: types.login,
                payload:{
                    name: 'johan'
                }
            })
            expect(history.replace).toHaveBeenCalledWith('/');
            localStorage.setItem('lastPath', '/dc');
            handleClick();
            expect(history.replace).toHaveBeenCalledWith('/dc')
        })
        

})
