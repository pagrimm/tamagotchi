//Business Logic

export class TamaGame{
  constructor(){
    this.Tamagotchis = [];
    this.id = 0;
  }

  addTamagotchi(name){
    this.Tamagotchis.push(new Tamagotchi(name));
    this.Tamagotchis[this.id].id = this.id;
    this.id += 1;
  }

}

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
    this.healthModifierTimer;
    this.healthRecoverTimer;
    this.timerToggle(true);
  }

  timerToggle(flag) {
    this.resourceDecay(flag, "food", 5000);
    this.resourceDecay(flag, "happiness", 10000);
    this.resourceDecay(flag, "energy", 7000);
    this.healthCheck(flag);
  }

  resourceDecay (flag, type, time) {
    if (flag) {
      this[type + "Timer"] = setInterval(() => {
        if (this[type] > 0) {
          this[type] -= 1;
        } 
      }, time);
    } else {
      clearInterval(this[type + "Timer"]);
    }
  }

  healthCheck (flag) {
    if (flag) {
      this.healthCheckTimer = setInterval(() => {
        if (this.health === 0) {
          this.alive = false;
          this.timerToggle(false);
          clearInterval(this.healthModifierTimer);
        } else if ((this.food === 0 || this.happiness === 0 || this.energy === 0)){
          if (!this.healthModifierTimer) {
            this.healthModifierTimer = setInterval(() => {this.health -= 1;}, 3000);
          }
        } else if (this.food >= 5 && this.happiness >= 5 && this.energy >= 5 && this.health < 10) {
          if (!this.healthModifierTimer){
            this.health += 1;
            this.healthModifierTimer = setInterval(() => {this.health += 1;}, 3000);
          }
        } else {
          clearInterval(this.healthModifierTimer);
          this.healthModifierTimer = undefined;
        }
      }, 1000);
    } else {
      clearInterval(this.healthCheckTimer);
      clearInterval(this.healthModifierTimer);
      this.healthModifierTimer = undefined;
    }
  }

  feed(){
    if (this.food < 7){
      this.food += 3;
    } else {
      this.food = 10;
    }
  }

  play(){
    if (this.happiness < 8){
      this.happiness += 2;
    } else {
      this.happiness = 10;
    }
  }

  sleep(){
    this.timerToggle(false);
    let energyRecovery = setInterval(() =>{
      if (this.energy < 10){
        this.energy += 1;
      } else {
        clearInterval(energyRecovery);
        this.timerToggle(true);
      }
    }, 500);
  }
}