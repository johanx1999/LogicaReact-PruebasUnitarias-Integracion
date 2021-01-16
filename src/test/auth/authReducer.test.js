const { authReducer } = require("../../auth/authReducer");
const { types } = require("../../types/types");

describe('Pruebas en authReducer', () => {
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer({logged: false}, {});

        expect(state).toEqual({logged: false})
    })

    test('debe autenticar y colocar el name al usuario', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'johan'
            }
        }

        const state = authReducer({logged: false}, action)
        expect(state).toEqual({
            logged: true,
            name: 'johan'
        })

        
    })
    test('debe de borrar el nombre del usuario y el logged en false', () => {
        const action = {
            type: types.logout,
            
        }

        const state = authReducer({logged: true, name: 'johan'}, action)
        expect(state).toEqual({
            logged: false
        })
    })
    
    
})
