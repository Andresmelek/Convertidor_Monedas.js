class Interfaz {

    constructor(){
        this.init();
    }
    init(){
        this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                const select = document.querySelector('#criptomoneda');
                for ( const [key, value] of Object.entries(monedas.monedas.Data)){
                        // añadir el symbol y el nombre como opciones
                        const opcion = document.createElement('option');
                        opcion.value = value.Symbol;
                        opcion.appendChild(document.createTextNode(value.CoinName));
                        select.appendChild(opcion);
                }
            })
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        // seleccionar mensaje
        const divMensaje = document.querySelector('.mensajes')
        divMensaje.appendChild(div); 
        // mostrar contenido
        setTimeout(() =>{
                document.querySelector('.mensajes div').remove()
        }, 3000);
    }
    //imprime el resultado

    mostarResultado(resultado, moneda, crypto){


        //en caso de un resultado anterior, ocultarlo

        const resultadoAnterior = document.querySelector('#resultado > div');

        if (resultadoAnterior){
            resultadoAnterior.remove();

        }
        const datosMoneda = (resultado[crypto][moneda]);
        console.log(datosMoneda);
        //recortar precio
        let precio = datosMoneda.PRICE.toFixed(2);
        let porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2);
        let actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('Colombia');

        //construir el template

        let templateHTML = `
        
            <div class='card bg-warning'> 
            <div class="card-body text-light">
            <h2 class=card-title>Resultado:</h2>
            <p> El precio de ${datosMoneda.FROMSYMBOL} a moneda de ${datosMoneda.TOSYMBOL} es : $${precio}</p>
            <p> Variación último día: %${porcentaje}</p>
            <p> Ultima actualización ${actualizado}</p>
        </div>
    </div>
        `;

        this.mostrarSpinner('block');
        //insertar resultado

        setTimeout(() => {
        
            document.querySelector('#resultado').innerHTML =  templateHTML;

            // ocultar el spiner
            this.mostrarSpinner('none');
        }, 3000);
       
    }
    //mostrar spinner
    mostrarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }
}