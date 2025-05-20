class Guerrero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, armas) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.armas = armas;
  }

  atacarConArma(personaje) {
    let arma = this.armas[Math.floor(Math.random() * this.armas.length)];
    let dano = arma.dano;
    personaje.vida -= dano;
    console.log(`${this.nombre} ataca a ${personaje.nombre} con la arma ${arma.nombre} con un daño de ${dano}`);
  }
}

class Arquero extends Personaje {
  constructor(nombre, vida, ataque, defensa, velocidad, flechas) {
    super(nombre, vida, ataque, defensa, velocidad);
    this.flechas = flechas;
  }

  dispararFlecha(personaje) {
    let flecha = this.flechas[Math.floor(Math.random() * this.flechas.length)];
    let dano = flecha.dano;
    personaje.vida -= dano;
    console.log(`${this.nombre} dispara una flecha a ${personaje.nombre} con un daño de ${dano}`);
  }
}