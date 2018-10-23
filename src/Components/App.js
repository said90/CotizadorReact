import React, { Component } from 'react';
import Header from './Header'
import Form from './Form';
import Resumen from './Resumen';

import { obtenerDiferenciaYear, calcularPorMarca, obtenerPlan } from '../helper.js'

class App extends Component {

  state = {
    resultado: '',
    datos: {}
  }
  cotizarSeguro = (datos) => {




    const { marca, plan, year } = datos;

    //La base de cada seguro es 2000
    let resultado = 2000;

    //verficar diferencias de el ano del vehiculo con respecto a la fecha actual
    const diferencia = obtenerDiferenciaYear(year);

    //Por cada year restar el 3%
    resultado -= ((diferencia * 3) * resultado) / 100;
    //Americano 15% Asiatico 5% Europeo 30% incremento al valor
    resultado = calcularPorMarca(marca) * resultado;


    // plan basico incrementa 20% al valor y completo el 50% al valor

    resultado = parseFloat(obtenerPlan(plan) * resultado).toFixed(2);

    //creo objeto para el resumen

    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }


    this.setState({
      resultado: resultado,
      datos: datosAuto
    })
  }

  render() {
    return (
      <div className="container">
        <Header title='Cotizador de Seguros de Auto'
        />

        <div className="form-container">
          <Form
            cotizarSeguro={this.cotizarSeguro}
          />

          <Resumen
            datos={this.state.datos}
            resultado={this.state.resultado}
          />
        </div>
      </div>



    );
  }
}

export default App;
