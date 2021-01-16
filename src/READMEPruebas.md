# Pruebas Unitarias y de Integracion

## authReducer
    Probamos que devuelva un estado por defecto y que autentique el nombre del usuario y borrar el nombre del usuario 

## Puebas frecuentes
    -Simulamos el history, creamos el wrapper con el mount y como estamos trabajando con rutas debemos importar el MemoryRouter y le asignamos un initialEntries
    -debe de mostrarse correctamente
    ```
        expect( wrapper).toMatchSnapshot()

    ```
    
    -Para verificar que un elemento exista en mi componente
    ```
        expect(wrapper.find('.row').exists()).toBe(true)

    ```

    -Simular una accion click y verificamos que no se hallan llamado unos elementos o path del use history
    ```
        wrapper.find('button').prop('onClick')();
        expect(history.push).toBeCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();
    ```

    -Para verificar el texto del wrapper
    ```
        expect(wrapper.text()).toBe('');
    ```

### Para hacer pruebas con el useContext y el history
    -Debemos hacer el mock del history y el contextValue e importar el contextValue
    ```
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

    ```

    PRUEBA: debe de realizar el dispatch y la navegacion
    
    Esperamos que se llame con unos valores especificos
    Y que el history.replace se llame 
    ```
        wrapper.find('button').prop('onClick')();

            expect(contexValue.dispatch).toHaveBeenCalledWith({
                type: types.login,
                payload:{
                    name: 'johan'
                }
            });
            expect(history.replace).toHaveBeenCalled()
    ```


    SIMULACION DEL LOCALSTORAGE
    ```
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

    ```
