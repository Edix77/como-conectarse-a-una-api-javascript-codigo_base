let pagina = 1;
const bntAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

//lo que queremos es que cuando demos click en siguiente  se ejecute el foreach del array results y nos muestre la siguiente lista de peliculas y eso lo hacemos con una funcion de eventListener en el btn que trajimos desde el html y que cuando se le de click ejecute una funcion que seria a la variable pagina se le sume 1 y se ejecute la funcion cargarPeliculas que es la funcion donde llamamos a la api y ejecutamos el forEach que recorre el arreglo resultados,  le damos ua condicional que se le sume 1 siempre y cuando pagina sea menor a 1000
btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina = pagina + 1
        cargarPeliculas();
    }
});

bntAnterior.addEventListener('click', () => {

    if (pagina > 1) {
        pagina = pagina - 1
        cargarPeliculas();
    }
});


const cargarPeliculas = async () => {

    //siempre que usemos una funcion asyncronica debemos ocupar try and catch para manejar los errores
    try {
        //cuando usamos fetch para traer la url de una api lo que vamos a recibir es una promesa y si queremos finalmente recibirla tenemos que utilizar await, tambien para poder ocupar fetch debemos usar una funcion asyncronica para que se ejecute bien el llamado a la url de la api

        //en esta misma respuesta agregamos la paginacion que por instruccion del proveedor de la api indica que  que se pueden tener maximo 1000 paginas y minimo 1 pagina y que por defecto las paginas comienzan en el numero 1, entonces al final de nuestra url de la api agregamos &(ampersan) para indicar que queremos agregar otro parametro y le decimos que la page inicie en la variable pagina que tenemos al inicio del codigo con el numero 1, es decir le decimos al query selecctor page que inicie en 1, es importante poner backtick para que reconosca nuestra variable
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=fb16c5d08ed2cd0626ac841104170a37&laguague=es-MX&page=${pagina}`);

        console.log(respuesta);

        //si la respuesta es correcta 
        if (respuesta.status === 200) {
            //este metodo .json es para acceder a los datos de tipo .json de la peticion y tambien es asyncrono asi que tambien tenemos que esperar a que termine la peticion y por eso usamos await, esta respuesta que recibimos en formato .json la vamos a guardar en una constante que en este caso se llama datos
            const datos = await respuesta.json();
            //creamos una variable vacia llamada peliculas
            let peliculas = '';
            datos.results.forEach(peliculaDelArray => {
                //con este for each con cada peliculaDelArray vamos a llenar la variable peliculas y adicional a estas peliculas (declarada mas arriba) y le vamos a sumar un h1 con peliculaDelArray.title (estamos solo extrayendo el titulo de las peliculasDelArray), basicamente lo que estamos haciendo es recorriendo los datos  el array results(este array results viene de la pagina proveedora de la api en su seccion Get Pupular en los Responses)  y con la funcion flecha y el for each estamos reccoiendo ese array results y guardando sus datos dentro de la variable peliculas

                //para cargar las imagenes el proveedor de la api nos da la instruccion de el link que debemos llamar en src pero al final de este link tenemos el archivo .jpg entoces cambiamos esa informacion del archivo ..jpg por el dato que queremos extraer del array results que en este caso es la imagen y el proveedor de la api en su parte de utilizacion de imagenes nos indica que que en poster_path donde se encuentran las imagenes 
                peliculas = peliculas += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${peliculaDelArray.poster_path}">
                    <h3 class="titulo">${peliculaDelArray.title}</h3>
                </div>
            `;
            });
                //en esta parte del codigo estamos accediendo al contenedor que tenemos en el html y lo igualamos a peliculas para que esta variable que se va llenando con el forEach
            document.getElementById('contenedor').innerHTML = peliculas;


        } else if (respuesta.status === 401) {
            console.log('pusiste la llave mal')
        } else if (respuesta.status === 404) {
            console.log('la pelicula no existe')
        } else {
            console.log('hubo un error y no sabemos lo que paso')
        }
    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();