import React from 'react';

import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

/* 
    Hacemos pruebas de que este el texto esperado en las tarjetas deseadas
    -Verificamos de que tenga el input el mismo valor del queryString
    -Prueba de que los valores coincidan en la url 
    -Hacemos la simulacion del onChange del formulario y hacemos el expect de todos los valores recibidos
*/


describe('Pruebas en <SearchScreen />', () => {
    test('debe de mostrarse correctamente con los valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>

                <Route path='/search'
                       component={SearchScreen}
                />

            </MemoryRouter>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search A Hero')
    })

    test('debe mostrar a batman y el input con el input del queryString', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>

                <Route path='/search' component={SearchScreen} />

            </MemoryRouter>
        )
        expect(wrapper.find('input').prop('value')).toBe('batman');
    })
    
    test('debe mostrar un error si el heroe no se encuentra ', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman123']}>

                <Route path='/search' component={SearchScreen} />

            </MemoryRouter>
        )
        expect(wrapper.find('.alert-danger').text().trim()).toBe('There is no a hero with "batman123"');
    })
    

    // Simular el change de un formulario
    test('debe de llamar el push del history', () => {
        const history = { push: jest.fn() }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>

                <Route 
                    path='/search'
                    component={()=><SearchScreen history={history} />}
                />

            </MemoryRouter>


        )

        wrapper.find('input').simulate('change',{
            target: {
                name: 'searchText',
                value: 'batman'
            }
        })

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        })

        expect(history.push).toHaveBeenCalledWith('?q=batman')
    })
    
    
})
