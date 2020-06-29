//Business Logic

export class Tamagotchi{
  constructor(name){
    this.name = name;
    this.food = 10;
    this.happiness = 10;
    this.energy = 10;
    this.health = 10;
  }

  foodDecay(){
    setInterval(() => {this.food -= 1}, 5000);
  }

  happyDecay(){
    
  }
}