import React from 'react';
import ReactDOM from 'react-dom';
import { HeroesApp } from './HeroesApp';
import "./styles.css";

ReactDOM.render(
    <HeroesApp />, 
  document.getElementById('root')
);


// const saludo = <h1> hola mundo</h1>
// const divRoot = document.getElementById('root')
// ReactDOM.render(saludo , divRoot);

/* 
Arrancar app desde cero

import React from 'react';
import ReactDOM from 'react-dom';

const saludo = <h1> hola mundo</h1>
const divRoot = document.getElementById('root')
ReactDOM.render(saludo, divRoot);

 */