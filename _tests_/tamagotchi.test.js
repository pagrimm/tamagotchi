import {Tamagotchi} from '../src/tamagotchi.js';

describe('tamagotchi', () => {
  let reusableTam;
  jest.useFakeTimers();

  beforeEach(() => {
    reusableTam = new Tamagotchi("TestName");
    reusableTam.foodDecay();
    reusableTam.happyDecay();
    reusableTam.energyDecay();
    reusableTam.healthDecay();
  })

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("Should have a user inputted name and [food, happiness, energy, health] all equal to 10 when object is created", () => {
    expect(reusableTam.name).toEqual("TestName");
    expect(reusableTam.food).toEqual(10);
    expect(reusableTam.happiness).toEqual(10);
    expect(reusableTam.energy).toEqual(10);
    expect(reusableTam.health).toEqual(10);
  });


  test("food decreases over time", () => {
    jest.advanceTimersByTime(15001);
    expect(reusableTam.food).toEqual(7);
  });

  test("happiness decreases over time", () => {
    jest.advanceTimersByTime(30001);
    expect(reusableTam.happiness).toEqual(7);
  });

  test("energy decreases over time", () => {
    jest.advanceTimersByTime(21001);
    expect(reusableTam.energy).toEqual(7);
  });

  test("health decreases over time if food, happiness, OR energy = 0", () => {
    jest.advanceTimersByTime(59001);
    expect(reusableTam.health).toEqual(7);
  });

  test("health increases over time if food, happiness, AND energy > 5, up to 10", () => {
    let damagedTam = new Tamagotchi("hurt");
    damagedTam.health = 5;
    damagedTam.healthRecovery();
    jest.advanceTimersByTime(4001);
    expect(damagedTam.health).toEqual(7);
  });


});