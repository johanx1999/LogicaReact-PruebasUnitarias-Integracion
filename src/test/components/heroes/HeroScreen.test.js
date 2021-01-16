import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroeScreen } from '../../../components/heroes/HeroeScreen';


describe('Pruebas en <HeroScreen />', () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }

    const wrapper = mount(
        
        <MemoryRouter initialEntries={['/hero']}>

            <HeroeScreen history={history} />
            
        </MemoryRouter>
    
    )


    test('debe de mostrarse correctamente', () => {
        // expect(wrapper).toMatchSnapshot()
        expect( wrapper.find('Redirect').exists() ).toBe(true)
    })


    test('debe de mostrar en heroe si el parametro existe y se encuentra', () => {

        const wrapper= mount(
            
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
    
                <Route path='/hero/:heroeId' component={HeroeScreen} />
                
            </MemoryRouter>
            
        ) 


        expect(wrapper.find('.row').exists()).toBe(true)
    })

    test('debe regresar a la pantalla anterior con PUSH', () => {
        const history ={
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-captain']}>
                <Route 
                    path={'/hero/:heroeId'}
                    component={()=><HeroeScreen history={history} />}
                /> 
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        // expect(wrapper.find('button').exists()).toBe(true)
        expect(history.push).toHaveBeenCalledWith('/')
        expect(history.goBack).not.toBeCalled()

    })

    test('debe de regresar con GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path={'/hero/:heroeId'}
                    component={()=><HeroeScreen history={history} />}
                /> 
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        expect(history.push).toBeCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();
    })
    
    test('debe de llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123']}>
                <Route 
                    path='/hero/:heroeId'
                    component={()=><HeroeScreen history={history} />}
                />
            </MemoryRouter>
        )

        expect(wrapper.text()).toBe('');
    })
    
    
    
    

})
