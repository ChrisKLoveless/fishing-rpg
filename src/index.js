import * as playerScript from "./js/player.js";
import * as $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


const playerBuilder = playerScript.createPlayer();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function endGame(playerObject) {
  $(`#dead-${playerObject.id}`).removeAttr("class");
  $(`#hook-${playerObject.id}`).addClass("invisible");
  $(`#energy-value-${playerObject.id}`).addClass("invisible");
  $(`#fish-value-${playerObject.id}`).addClass("invisible");
  $(`#level-value-${playerObject.id}`).html(`You reached level: ${playerObject.level}`);
}

function addNewPlayer() {
  const thisPlayer = playerBuilder();
  const thisState = playerScript.storeState();
  createPlayerElements(thisPlayer, thisState);

  setInterval(function () {
    thisPlayer.energy -= 1;
    $(`#energy-value-${thisPlayer.id}`).text(`Energy: ${thisPlayer.energy}`);
  }, 1500);

  setInterval(function () {
    thisPlayer.level += 1;
    $(`#level-value-${thisPlayer.id}`).text(`Level: ${thisPlayer.level}`);
  }, 30000);
}

window.onload = function () {
  $("#new-player").on("click", () => {
    addNewPlayer();
    $("#animation").html("<marquee><img src='../assets/images/fishing-img.jpg' id='fishing-img'></marquee>");
  });
};

function createPlayerElements(playerObject) {
  const thisPlayer = $(`
  <div id=${playerObject.id} class="mb-5">      
  <div class="card" style="width: 20rem; height: 18rem;">
  <div class="card-body">
  <h4 class="card-title">Your Player's Stats</h4>
  <h4><div id="dead-${playerObject.id}" class="invisible" style="color: red;">Game Over:<br> <em>Out of energy</em></div></h4>
  <h5><div id="level-value-${playerObject.id}">Level: 1</div></h5>
  <h5><div id="energy-value-${playerObject.id}">Energy: ${playerObject.energy}</div></h5>
  <h5><div id="fish-value-${playerObject.id}">Fishing Net: ${playerObject.net}</div></h5>
  <h4><div id="hook-${playerObject.id}" class="invisible" style="color: blue;">Hook:<br> <em>Nice Cast!</em></div></h4>
  <button id="cast-${playerObject.id}" class="btn btn-warning" style="float:right;">Cast</button>
  <button id="eat-${playerObject.id}" class="btn btn-success">Eat</button>
  </div>  
  </div>
  </div>
  `);

  $("#players").append(thisPlayer);

  $(`#cast-${playerObject.id}`).on("click", () => {
    if (playerObject.energy <= 0) {
      endGame(playerObject);
    }
    else {
      $(`#hook-${playerObject.id}`).removeAttr("class");
      setTimeout(() => {
        const hook = getRandomInt(3);
        if (hook === 0 || hook === 1) {
          $(`#hook-${playerObject.id}`).html(`Hook:<br><em>It got away!</em>`);
        }
        else {
          $(`#hook-${playerObject.id}`).html(`Hook:<br><em> Caught one!</em>`);
          playerObject.net += 1;
          $(`#fish-value-${playerObject.id}`).text(`Fishing Net: ${playerObject.net}`);
        }
      }, 1500);
    }
  });

  $(`#eat-${playerObject.id}`).on("click", () => {
    if (playerObject.energy <= 0) {
      endGame(playerObject);
    }
    else {
      playerObject.energy += 1;
      $(`#energy-value-${playerObject.id}`).text(`Energy: ${playerObject.energy}`);
      playerObject.net -= 1;
      $(`#fish-value-${playerObject.id}`).text(`Fishing Net: ${playerObject.net}`);
    }
  });

}


