import {Tamagotchi} from '../src/tamagotchi.js';

describe('tamagotchi', () => {
  let reusableTam;
  jest.useFakeTimers();

  beforeEach(() => {
    reusableTam = new Tamagotchi("TestName");
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

  test("feeding increases food by 3, up to 10", () => {
    jest.advanceTimersByTime(30001);
    expect(reusableTam.food).toEqual(4);
    reusableTam.feed();
    expect(reusableTam.food).toEqual(7);
  });

  test("playing increases happiness by 2, up to 10", () => {
    jest.advanceTimersByTime(30001);
    expect(reusableTam.happiness).toEqual(7);
    reusableTam.play();
    expect(reusableTam.happiness).toEqual(9);
  });

  test("sleeping increases energy to 10", () => {
    jest.advanceTimersByTime(30001);
    expect(reusableTam.energy).toEqual(6);
    reusableTam.sleep();
    expect(reusableTam.energy).toEqual(10);
  });

  test("created object should have an 'alive' property set to true", () => {
    expect(reusableTam.alive).toEqual(true);
  });

  test("if health reaches 0, the tamagotchi dies", () => {
    jest.advanceTimersByTime(81001);
    expect(reusableTam.health).toEqual(0);
    expect(reusableTam.alive).toEqual(false);
  });
});