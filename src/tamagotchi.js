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
    setInterval(() => {
      if (this.food > 0) {
        this.food -= 1
      }
    }, 5000);
  }

  happyDecay(){
    setInterval(() => {
      if (this.happiness > 0) {
        this.happiness -= 1
      }
    }, 10000);
  }

  energyDecay(){
    setInterval(() => {
      if (this.energy > 0) {
        this.energy -= 1
      }
    }, 7000);
  }

  healthDecay(){
    let healthDrain;
    setInterval(() => {
      if (this.food === 0 || this.happiness === 0 || this.energy === 0){
        if (!healthDrain){
          healthDrain = setInterval(() => {this.health -= 1}, 3000)
        } 
      } else {
        clearInterval(healthDrain)
        healthDrain = undefined;
      }
    }, 1000)
  }

  healthRecovery(){
    
  }
}