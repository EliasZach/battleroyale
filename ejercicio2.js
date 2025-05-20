class Personaje {
    constructor(nombre, vida, ataque, defensa, velocidad) {
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.velocidad = velocidad;
    }

    atacar(personaje) {
        let daño = (Math.random() * this.ataque) - (Math.random() * personaje.defensa);
        if (daño < 0) daño = 0;
        personaje.vida -= daño;
        console.log(`${this.nombre} ataca a ${personaje.nombre} con un daño de ${daño}`);
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre}`);
    }
}

class Guerrero extends Personaje {
    constructor(nombre, vida, ataque, defensa, velocidad) {
        super(nombre, vida, ataque, defensa, velocidad);
        this.armas = [
            {
                nombre: 'Espada templada',
                dano: Math.floor(Math.random() * 250)
            },
            {
                nombre: 'Daga de Damasco',
                dano: Math.floor(Math.random() * 450)
            },
            {
                nombre: 'Mazo pesado',
                dano: Math.floor(Math.random() * 750)
            }
            ]

            this.ataques = [
            {
                ataque: this.atacar.bind(this)
            },
            {
                ataque: this.atacarConArma.bind(this)
            }
            ]
    }

    ataqueAleatorio(personaje) {
        const indice = Math.floor(Math.random() * this.ataques.length);
        let ataque = this.ataques[indice].ataque;
        ataque(personaje)
    }

    atacarConArma(personaje) {
        let arma = this.armas[Math.floor(Math.random() * this.armas.length)];
        let dano = arma.dano;
        personaje.vida -= dano;
        console.log(`${this.nombre} ataca a ${personaje.nombre} con su arma ${arma.nombre} con un daño de ${dano}`);
    }
}

class Arquero extends Personaje {
    constructor(nombre, vida, ataque, defensa, velocidad, flechas) {
        super(nombre, vida, ataque, defensa, velocidad);
        this.flechas = flechas;
    }

    dispararFlecha(personaje) {
        let flecha = this.flechas[Math.floor(Math.random() * this.flechas.length)];
        let daño = flecha.daño;
        personaje.vida -= daño;
        console.log(`${this.nombre} dispara una flecha a ${personaje.nombre} con un daño de ${daño}`);
    }
}

function luchar(personajes) {
    let ronda = 0;
    while (personajes.length > 1) {
        ronda++;
        console.log(`Ronda ${ronda}`);
        for (let i = 0; i < personajes.length; i++) {
            let atacante = personajes[i];
            let atacado = personajes[(i + 1) % personajes.length];
            atacante.atacar(atacado);
            if (atacado.vida <= 0) {
                console.log(`${atacado.nombre} ha muerto`);
                personajes.splice(personajes.indexOf(atacado), 1);
            }
        }
        console.log('');
}

    console.log(`${personajes[0].nombre} ha ganado el juego`);
}