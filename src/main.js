import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";
import {Tamagotchi} from './tamagotchi.js';

$(document).ready(function() {
  //User Interface
  addGiphy();
  let tamagotchi;
  $("#newGame").submit(function(event){
    event.preventDefault();
    tamagotchi = new Tamagotchi($("#nameEntry").val());
    $("#intro").hide();
    $("#gameBoard").show();
    updateTamaStats(tamagotchi);
    setInterval(() => {
      updateTamaStats(tamagotchi);
    }, 500);
  });
  
  $(".feed").click(function(){
    tamagotchi.feed();
  });

  $(".play").click(function(){
    tamagotchi.play();
  });

  $(".sleep").click(function(){
    tamagotchi.sleep();
  });
});



function addGiphy() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=kitten&rating=g`;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      $(".showRandomKitten").first().append(`<img src="${response.data.images.downsized_large.url}">`);
    }
  };

  request.open("GET", url, true);
  request.send();
}

function updateTamaStats(tamagotchi){
  $(".name").html(`${tamagotchi.name}`);
  $(".food").html(`Food: ${tamagotchi.food}`);
  $(".happiness").html(`happiness: ${tamagotchi.happiness}`);
  $(".energy").html(`energy: ${tamagotchi.energy}`);
  $(".health").html(`health: ${tamagotchi.health}`);
}

