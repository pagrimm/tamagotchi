import {Tamagotchi} from '../src/tamagotchi.js';

describe('tamagotchi', () => {
  let reusableTam;
  jest.useFakeTimers();

  beforeEach(() => {
    reusableTam = new Tamagotchi("TestName");
  })

  test("Should have a user inputted name and [food, happiness, energy, health] all equal to 10 when object is created", () => {
    expect(reusableTam.name).toEqual("TestName");
    expect(reusableTam.food).toEqual(10);
    expect(reusableTam.happiness).toEqual(10);
    expect(reusableTam.energy).toEqual(10);
    expect(reusableTam.health).toEqual(10);
  });


});