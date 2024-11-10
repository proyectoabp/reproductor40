const tituloCancion = document.querySelector('.reproductor-musica h1');
const nombreArtista = document.querySelector('.reproductor-musica p');
const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');
const iconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');
const botonAtras = document.querySelector('.controles button.atras');
const botonAdelante = document.querySelector('.controles button.adelante');

const canciones = [
    {
        titulo: 'Aparentemente',
        nombre: 'Yaga & Mackie x Arcangel & De La Ghetto',
        fuente: 'songs/music-1.mp3',
        fondo: 'img/background1.jpg'
    },
    {
        titulo: "I'm Still In Love With You",
        nombre: 'Sean Paul',
        fuente: 'songs/music-2.mp3',
        fondo: 'img/background2.jpg'
    },
    {
        titulo: "SR. SMITH",
        nombre: "Peso Pluma, Luis R Conriquez",
        fuente: 'songs/music-3.mp3',
        fondo: 'img/background3.png'
    },
    {
        titulo: "Virgen",
        nombre: "Adolescent's Orquesta",
        fuente: 'songs/music-4.mp3',
        fondo: 'img/background4.jpg'
    },
    {
        titulo: "Dos días",
        nombre: "Tito Double P, Peso Pluma",
        fuente: 'songs/music-5.mp3',
        fondo: 'img/background5.png'
    },
];

let indiceCancionActual = 0;

function actualizarInfoCancion() {
    tituloCancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    actualizarFondo();
    cancion.addEventListener('loadeddata', function() {});
}

function actualizarFondo() {
    document.body.style.backgroundImage = `url(${canciones[indiceCancionActual].fondo})`;
}

cancion.addEventListener('loadedmetadata', function() {
    progreso.max = cancion.duration;
    progreso.value = cancion.currentTime;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar() {
    if (cancion.paused) {
        reproducirCancion();
    } else {
        pausarCancion();
    }
}

function reproducirCancion() {
    cancion.play();
    iconoControl.classList.add('bi-pause-fill');
    iconoControl.classList.remove('bi-play-fill');
}

function pausarCancion() {
    cancion.pause();
    iconoControl.classList.remove('bi-pause-fill');
    iconoControl.classList.add('bi-play-fill');
}

cancion.addEventListener('timeupdate', function() {
    if (!cancion.paused) {
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function() {
    cancion.currentTime = progreso.value;
});

botonAdelante.addEventListener('click', function() {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

botonAtras.addEventListener('click', function() {
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

actualizarInfoCancion();