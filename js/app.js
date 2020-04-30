const cotizador = new API('1ed23066cc9c1e0b9edcab86a9aac5e2196de5dfa21d540050185c2f0623286f');
const ui = new Interfaz();

cotizador.obtenerMonedasAPI();

//leer formulario
const formulatrio = document.querySelector('#formulario');
//listener

formulatrio.addEventListener('submit', (e) =>{
    e.preventDefault();
    

    // leer la moneda seleccionado

    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;
    console.log(monedaSeleccionada);

    // leer la criptomoneda seleccionada
    const criptomoneda = document.querySelector('#criptomoneda');
    const criptomonedaSeleccionada = criptomoneda.options[criptomoneda.selectedIndex].value;
    
    // comprobar que amboos campos esten seleccionados
    if(monedaSeleccionada === '' || criptomonedaSeleccionada === ''){
        // alerta de error
        ui.mostrarMensaje('Ambos campos son Obligatorios', 'alert bg-danger text-center');
    } else {
        // Todo bien
        cotizador.obtenerValores(monedaSeleccionada, criptomonedaSeleccionada)
            .then(data => {
               ui.mostarResultado(data.resultado.RAW, monedaSeleccionada, criptomonedaSeleccionada);
            })  
        }
})