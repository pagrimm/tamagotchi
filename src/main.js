import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from "jquery";

$(document).ready(function() {
  //User Interface
  addGiphy();
});



function addGiphy() {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=kitten&rating=g`

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      $(".showRandomKitten").first().append(`<img src="${response.data.images.downsized_large.url}">`);
    }
  }

  request.open("GET", url, true);
  request.send();
}