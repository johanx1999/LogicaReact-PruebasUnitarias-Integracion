import React from 'react';

const { mount } = require("enzyme")
const { AuthContext } = require("../../auth/AuthContext")
const { AppRoutes } = require("../../routes/AppRoutes")



// import Adapter from 'enzyme-adapter-react-16';
// import { configure } from 'enzyme';

// configure({adapter: new Adapter()});

describe('Pruebas en <AppRoutes />', () => {



    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged:false
        }
    }
    
    test('debe de mostrar el login si no esta autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRoutes />
            </AuthContext.Provider>
        )
        
        console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot()
        
    })
    
    
    test('debe mostrar el componente marvel si esta autenticado', () => {
        
        const contextValue = {
            dispatch: jest.fn(),
            user:{
                logged: true,
                name: 'johan'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRoutes />
            </AuthContext.Provider>

        )

        expect(wrapper.find('.navbar').exists()).toBe(true);


    })
    



    

})
