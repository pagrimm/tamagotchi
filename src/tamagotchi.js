//Business Logic

export class Tamagotchi{
  constructor(name){
    this.name = name;
    this.food = 10;
    this.happiness = 10;
    this.energy = 10;
    this.health = 10;
    this.alive = true;
    this.foodTimer;
    this.happinessTimer;
    this.energyTimer;
    this.healthCheckTimer;
    this.timerToggle(true);
  }

  timerToggle(flag) {
    this.resourceDecay(flag, "food", 5000);
    this.resourceDecay(flag, "happiness", 10000);
    this.resourceDecay(flag, "energy", 7000);
    //this.healthCheckTimer(flag);
  }

  resourceDecay (flag, type, time) {
    if (flag) {
      this[type + "Timer"] = setInterval(() => {
        if (this[type] > 0) {
          this[type] -= 1
        } 
      }, time);
    } else {
      clearInterval(this[type + "Timer"]);
    }
  }
  
  healthDecay(){
    let healthDrain;
    setInterval(() => {
      if (this.food === 0 || this.happiness === 0 || this.energy === 0){
        if (!healthDrain){
          healthDrain = setInterval(() => {this.health -= 1}, 3000)
        } else if (this.health === 0){
          this.alive = false
          clearInterval(healthDrain)
          clearInterval()
        } 
      } else {
        clearInterval(healthDrain)
        healthDrain = undefined;
      }
    }, 1000)
  }

  healthRecovery(){
    let healthRecover;
    setInterval(() => {
      if ((this.food >= 5 || this.happiness >= 5 || this.energy >= 5) && this.health < 10){
          if (!healthRecover){
            this.health += 1
            healthRecover = setInterval(() => {this.health += 1}, 3000)
          }
      } else {
        clearInterval(healthRecover)
        healthRecover = undefined;
      }
    }, 1000)
  }

  feed(){
    this.food += 3;
  }

  play(){
    this.happiness += 2;
  }

  sleep(){
    this.energy += (10 - this.energy)
  }
}