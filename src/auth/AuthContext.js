import { createContext } from "react";

/* 
    El context es el que me va a ayudara a compartir el anterior reducer a lo largo de mi aplicacion
    ¿Donde la vamos a utilizar?: en el index lo vamos a tratar de tener lo mas limpio posible no poner mucha cosa alli
    porque es la configuracion principal de la aplicacion siempre se va a ejecutar 
    Lo vamos a importar nuestro componente en HeroesApp.js  
*/


export const AuthContext = createContext()
