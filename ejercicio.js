class Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad) {
    this.nombre = nombre;
    this.vida = vida;
    this.ataque = ataque;
    this.defensa = defensa;
    this.velocidad = velocidad;
  }

  atacar(personaje) {
    let dano = Math.floor((Math.random() * this.ataque) - (Math.random() * personaje.defensa));
    if (dano < 0) dano = 0;
    personaje.vida -= dano;
    console.log(`${this.nombre} ataca a ${personaje.nombre} con un daño de ${dano}`);
  }

  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

class Mago extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.hechizos = [
      {
        nombre: 'Llamarada',
        dano: Math.floor(Math.random() * 100)
      },
      {
        nombre: 'Maldicion',
        dano: Math.floor(Math.random() * 250)
      },
      {
        nombre: 'Fuego infernal',
        dano: Math.floor(Math.random() * 380)
      }
    ];

    this.ataques = [
      {
        ataque: this.atacar.bind(this)
      },
      {
        ataque: this.lanzarHechizo.bind(this)
      }
    ];
  }

  ataqueAleatorio(personaje) {
    const indice = Math.floor(Math.random() * this.ataques.length);
    let ataque = this.ataques[indice].ataque;
    ataque(personaje)
  }
  
  lanzarHechizo(personaje) {
    let hechizo = this.hechizos[Math.floor(Math.random() * this.hechizos.length)];
    let dano = hechizo.dano;
    personaje.vida -= dano;
    console.log(`${this.nombre} lanza el hechizo ${hechizo.nombre} a ${personaje.nombre} con un daño de ${dano}`);
  }
}

class Guerrero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.armas = [
      {
        nombre: 'Espada templada',
        dano: Math.floor(Math.random() * 100)
      },
      {
        nombre: 'Daga de Damasco',
        dano: Math.floor(Math.random() * 250)
      },
      {
        nombre: 'Mazo pesado',
        dano: Math.floor(Math.random() * 300)
      }
    ];
      this.ataques = [
      {
        ataque: this.atacar.bind(this)
      },
      {
        ataque: this.atacarConArma.bind(this)
      }
    ];
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
  constructor(nombre, vida, ataque, defensa, velocidad) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.flechas = [
      {
        nombre: 'Flecha de acero',
        dano: Math.floor(Math.random() * 150)
      },
      {
        nombre: 'Flecha envenenada',
        dano: Math.floor(Math.random() * 200)
      },
      {
        nombre: 'Flecha incendiaria',
        dano: Math.floor(Math.random() * 350)
      }
    ];
    this.ataques = [
      {
        ataque: this.atacar.bind(this)
      },
      {
        ataque: this.atacarConFlechas.bind(this)
      }
    ];
  }
  ataqueAleatorio(personaje) {
    const indice = Math.floor(Math.random() * this.ataques.length);
    let ataque = this.ataques[indice].ataque;
    ataque(personaje)
  }
  atacarConFlechas(personaje) {
    let flecha = this.flechas[Math.floor(Math.random() * this.flechas.length)];
    let dano = flecha.dano;
    personaje.vida -= dano;
    console.log(`${this.nombre} ataca a ${personaje.nombre} con su ${flecha.nombre} con un daño de ${dano}`);
  }
}

function luchar(personajes) {
  let ronda = 0;

  while (personajes.length > 1) {
    ronda++;
    console.log(`\n🔁 Ronda ${ronda}`);

    for (let i = 0; i < personajes.length; i++) {
      const atacante = personajes[i];

      let posiblesAtacados = personajes.filter(p => p !== atacante);

      const atacado = posiblesAtacados[Math.floor(Math.random() * posiblesAtacados.length)];

      atacante.ataqueAleatorio(atacado);

      if (atacado.vida <= 0) {
        atacado.vida = 0
        console.log(`(Vida restante de ${atacado.nombre}: ${atacado.vida})`)
        console.log(`💀 ${atacado.nombre} ha muerto a manos de ${atacante.nombre}`);
        personajes.splice(personajes.indexOf(atacado), 1);

        // Como quitamos un personaje, ajusto el índice
        if (personajes.indexOf(atacante) < i) {
          i--;
        }
        
      } else {
        console.log(`(Vida restante de ${atacado.nombre}: ${atacado.vida})`)

        atacado.ataqueAleatorio(atacante);
  
        if (atacante.vida <= 0) {
          atacante.vida = 0
          console.log(`(Vida restante de ${atacante.nombre}: ${atacante.vida})`)
          console.log(`💀 ${atacante.nombre} ha muerto a manos de ${atacado.nombre}`);
          personajes.splice(personajes.indexOf(atacante), 1);
  
          // Como quitamos un personaje, ajusto el índice
          if (personajes.indexOf(atacado) < i) {
            i--;
          }
        } else {
          console.log(`(Vida restante de ${atacante.nombre}: ${atacante.vida})`)
        }

      }
    }
  }

  console.log(`\n⚔️ ${personajes[0].nombre} ha ganado el juego`);
}

let Lev = new Mago('Lev', 800, 280, 50, 150)
let Varus = new Mago('Varus', 650, 300, 60, 150)
let Bvar = new Guerrero('Bvar', 1200, 150, 100, 100)
let Goro = new Guerrero('Goro', 1000, 200, 80, 80)
let Kass = new Arquero('Kass', 750, 350, 70, 200)

let arr = [Lev, Bvar, Kass, Varus, Goro]

luchar(arr)


