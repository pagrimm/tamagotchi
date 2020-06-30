import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import {TamaGame} from './tamagotchi.js';

$(document).ready(function() {
  //User Interface
  let newGame = new TamaGame();
  $("#newGame").submit(function(event){
    event.preventDefault();
    newGame.addTamagotchi($("#nameEntry").val());
    $("#gameBoard").show();
    newTamaHTML(newGame.tamagotchis[newGame.id-1]);
    updateTamaStats(newGame);
    setInterval(() => {
      updateTamaStats(newGame);
    }, 500);
  });
});

function addEventListeners(object){
  $(`div.${object.id} .feed`).click(function(){
    object.feed();
  });
  $(`div.${object.id} .play`).click(function(){
    object.play();
  });
  $(`div.${object.id} .sleep`).click(function(){
    object.sleep();
  });
}

function addGiphy(id) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=kitten&rating=g`;
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      $(`div.${id} .showRandomKitten`).first().html(`<img src="${response.data.images.fixed_height.url}">`);
    }
  };
  request.open("GET", url, true);
  request.send();
}

function updateTamaStats(gameObject){
  gameObject.tamagotchis.forEach((tamagotchi) => {
    $(`div.${tamagotchi.id} .name`).html(`${tamagotchi.name}`);
    $(`div.${tamagotchi.id} .food`).html(`Food: ${tamagotchi.food}`);
    $(`div.${tamagotchi.id} .happiness`).html(`happiness: ${tamagotchi.happiness}`);
    $(`div.${tamagotchi.id} .energy`).html(`energy: ${tamagotchi.energy}`);
    $(`div.${tamagotchi.id} .health`).html(`health: ${tamagotchi.health}`);
    if (!tamagotchi.alive) {
      removeTamagotchi(tamagotchi.id)
    }
  });
}

function removeTamagotchi (id) {
  $(`div.${id}`).remove();
}

function newTamaHTML(tamaObject){
  $(".tamagotchi").last().clone().prependTo("#gameBoard");
  $(".tamagotchi").first().removeClass("hideTemplate");
  $(".tamagotchi").first().addClass(`${tamaObject.id}`);
  $(".tamagotchi").first().addClass(`card`);
  addGiphy(tamaObject.id);
  addEventListeners(tamaObject);
}