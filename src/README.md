# ¿Para que me sirve esta aplicacion?

## NOTA
    *useForm = En su archivo se encuentra la explicacion de como funciona mi formulario

    *Creamos las carpetas dependiendo de lo que llevara adentro ejemplo:
            +types: Para poner dentro los tipos de acciones para mi useReducer
            +test: Para incluir dentro las pruebas de mis componentes y archivos simulando la misma direccion de origen
            +selectors: En esta carpeta vamos a introducir todas las funciones que se encargan de obtener los heroes por su id, nombre, etc.
            +routes: En esta carpeta vamos a incertar todas las rutas de reacRouterDom sean AppRoutes, privadas o publicas 
            +data: Nos sirve para introducir toda la informacion necesaria en mi app ejemplo= heroes, usuarios, productos, etc
            +hooks: En esta carpeta debemos introducir todos los hooks que nosotros creemos 
    
    *Los estilos 'styles.css' los creamos en src= En el mismo nivel que esta mi index.js

    ***IMPORTANTE: El archivo ('setupTests.js') es el encargado de tener la configuracion de las pruebas de enzyme y enzyme-to-json, es indispensable tenerlo con el nombre escrito correctamente e insatalarlo con npm desde sus paginas oficiales



### Para trabajar con el ReactRouterDom 
    1- Instalamos el reactrouterdom co npm
    2- copiamos el codigo de react router dom 

    ```
        import React, { useContext } from 'react'
        import {
        BrowserRouter as Router,
        Switch,
        //   Route,
        } from "react-router-dom";

    ```
    Y el Router debe de ir en el return de mi componente de rutas principal, en el router debe de ir todo en este orden:
    ```
    return (
        <Router>
            <div>
    
                <Switch>
                    <Route
                        exact path="/login" 
                        component={LoginScreen}
                    />

                    <Redirect to='/login' />
                </Switch>
            </div>
        </Router>
    )
    ```
    ***Si tenemos otro componente hijo de rutas que debe redireccionar a oto componente por su path solo debemos de poner en el return de mi componente un <Route/> e importarlo igualmente con el <Redirect />
    ```return(
        <Route exact path='/marvel' component={MarvelScreen} />
        <Redirect to='/login' />
    )
    ```



### Trabajar con el useContext 

Para trabajar con el use context necesitamos: 
    1- Crear un archivo con el nombre en UpperCamelCase, este es el que vamos a llamar cada que necesitemos proveer un dato a nuestros componentes hijos
    
 <!--Asi es como se crea el context  -->
    ```
        export const AuthContext = createContext()

    ```
 <!--Asi es como se utiliza el context en mi componente con esto mi componente dispone de todo lo que tiene mi context y todos los componentes hijos tambien dispondran de esta informacion.  -->
    


<!--  NOTA
    ***el user y el dispatch que le enviamos a mi context es el extraido de mi reducer 

        const init = () =>{
            return JSON.parse(localStorage.getItem('user')) || {logged:false}
        }
    
    
        const [user, dispatch] = useReducer(authReducer, {}, init)

 -->
    ```
    
    
        <AuthContext.Provider value={{
            user, dispatch
        }}>

            <AppRoutes />

        </AuthContext.Provider>
    ```
<!-- Asi extraemos la informacion que necesitamos de mi useContext  -->

    ```
        const {user, dispatch} = useContext(AuthContext)
    ```


## Para trabajar con useReducer

    El authReducer es el archivo encargado de evaluar una accion y devolver un nuevo estado dependiendo de lo que devuelva de dicha accion
    1- Creamos el archivo con camelCase y recibimos como Propiedades un estado que por defecto va a ser un objeto vacio y una accion que dispararemos con el dispatch 
    2- vamos a evaluar con el condicional 'switch' en caso de que la accion sea de un tipo hacer algo y devuelve un nuevo estado 
    3- Por defecto va a devolver el estado que tiene almacenado
    4- En el componente principal importamos el useReducer y le enviamos como argumentos mi authReducer, estado inicial y init; tambien extraemos del useReducer en forma de array el user y el dispatch para luego proveerlas en mi useContext 
    
    ```
        const [user, dispatch] = useReducer(authReducer, {}, init)
    ```
    5- En mis componentes hijos extraemos del context el dispatch para poder disparar acciones que son las que van a llegar a el authReducer 

<!-- Luego en una funcion que se dispare al oprimir un boton o etc, se llamara nuestro dispatch y enviara mi accion que modificara todo el estado de mi app -->
    ```
        const {dispatch} = useContext(AuthContext)

        dispatch({
            type: types.login,
            payload: {
                name: 'johan'
            }
        })
    ```
    6- Tenemos acciones encargadas de hacer el login y el logout con solo hacer un click 

    NOTA: En appRoutes extraemos el user de mi AuthContext para asi saber si esta autenticado o no el usuario

## Uso del hook useParams()

    El useParams me sirve para extraer los parametros que yo he enviado a mi url
    y me ayuda a extraer de donde o cual es el id que necesito buscar por medio de la url 
    ```
        const {heroeId} = useParams();
    ```


## Cuando usar el localStorage
    Cuando queramos guardar informacion que no sea sensible como por ejemplo path de url, datos del carrito de compras, lista de tareas, etc.
    -Guargamos en nuestra app en el componente de loginScreen la ultima ruta visitada para luego cuando vuelva a ingresar a mi app regrese a la ultima pagina visitada
    
    -Vamos a guardar la ultima ruta visitada en el componente PrivateRoute y que es el encargado de sacarme si no estoy autenticado
    ```
        localStorage.setItem('lastPath', rest.location.pathname)
    ```

## History
    El history lo extraemos del componente en los argumentos con llaves {} porque siempre vienen alli, el history me ayuda a extraer el path de la url lo utilizamos en el hero screen  

## useLocation
    Devuelve un objeto con la ubicacion actual de la url y nos sirve para trabajar con el queryString y crear un buscador mediante de palabras clave

    ```
        const location = useLocation();
        const {q=''} = queryString.parse(location.search);
    ```
    -La 'q' es la que le asignamos el valor del location en la pagina en que estamos


## queryString
    Es util para hacer que las consultas se pasen por la url
    Query string o, en español, cadena de consulta es un término informático que se utiliza para hacer referencia a una interacción con una base de datos.

## Logica para crear los archivos de react
    LA CARPETA [COMPONENTS] ME SIRVE PARA:
    Almacenar todos los componentes 
    ¿CUANDO DEBO HACER UN NUEVO COMPONENTE?
    -Debemos hacer otro componente nuevo para tercerizar funcionalidades y no hacer todo en una sola pagina 
    -Podemos crear un componente y lo utilizamos solo para renderizar o hacer el llamado a un componente o varios componentes 
    
    -El archivo 'index.js' lo vamos a utilizar unica y exclusivamente para hacer el renderizado de mi componente 'App.js', y mis estilos css generales tambien son llamados en este archivo; dicho archivo lo debemos de mantener lo mas limpio posible.

    -El componente 'HeroesApp.js' lo utilizamos para ser mi componente principal de toda mi aplicacion, importamos useReducer, AuthContext, AppRoutes que son los que encargados de proveer toda la informacion a los componentes hijos, tambien guardamos en el localStorage el usuario que es el que enviamos a mi AuthContext.

    -El componente 'AppRoutes.js' es el router principal que contiene todas mis rutas que en caso de que el path='/' muestra el componente que es publico osea el LoginScreen.js que es el que todo usuario sea registrado o no puede ver.
    
    -El componente 'PublicRoute.js' se encarga de recibir la informacion del usuario para saber si esta autenticado, recibe el componente y el 'rest', que son las propiedades exact path='/'; y apartir de ahi si esta autenticado o no retornamos mediante del operador condicional ternario un componente u otro.

    -El componente 'PrivateRoute.js' tambien recibe los mismos argumentos que el 'PublicRoute.js'; este es el encargado de guardar el ultimo path visitado con el localStorage, tambien dependiendo de si esta autenticado muestra el componente solicitado y si no esta autenticado lo redigira hacia el componente 'LoginScreen.js'

    -El componente 'DashboardRoutes.js' es el encargado de almacenar todas las rutas y dependiendo de si es exacta la direccion va a tener va a mostrar el componente correspondiente y si no coincide va a redirigir a el componente 'MarvelScreen.js'
    *Este componente es llamado por el PrivateRoute.js ya que si esta autenticado muestra estos componentes

### Orden de archivos o componentes

    NOTA: Las funciones complejas deben de ir en un archivo individual y luego las importamos donde las queramos utilizar

    -Creamos el archivo dc/DcScreen.js = Es un componente sencillo que se encarga de renderizar el componente... 
    
    -<HeroList /> que es el que nos muestra el listado de heroes que es un array con todos los heroes que coinciden con la busqueda de mi funcion 'getHeroesByPublisher' y barremos ese array con el .map, le asignamos la 'key' y le envimos los demas elementos del heroe a el componente...
    
    -<HeroCard /> Este componente es el encargado de recibir todas las propiedades del heroe enviadas desde el componente <HeroList /> por medio del operador spread {...hero} y en este componente vamos a imprimir la informacion de los heroes en tarjetas con el <Link to={`./hero/${id}`}> ...mas </Link>; con el Link que debemos de importar, nos Va a redirigir hacia el componente  <HeroeScreen /> que por cuestiones de que en nuestro DashboardRoutes le especificamos que al tener la siguiente url va a ser llamdo 'path="/hero/:heroeId"'

    -<HeroScreen /> Es el componente encargado de mostrar el componente en pantalla grande con la imagen la informacion correspondiente 

    -<SearchScreen /> En este componente creamos el buscador de heroes mediante el nombre; debemos utilizar el queryString, el useLocation, useForm y el getHeroesByName que son los que debemos de configurar para su debido funcionamiento
