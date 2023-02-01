import * as playerScript from "./js/player.js";
import * as $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


const playerBuilder = playerScript.createPlayer();

function addNewPlayer() {
  const thisPlayer = playerBuilder();
  const thisState = playerScript.storeState();
  createPlayerElements(thisPlayer, thisState);
  setInterval(function () {
    thisPlayer.energy -= 1;
    $(`#energy-value-${thisPlayer.id}`).text(`Energy: ${thisPlayer.energy}`);
  }, 2000);
}

window.onload = function () {
  $("#new-player").on("click", () => {
    addNewPlayer();
  });
};

function createPlayerElements(playerObject) {
  const thisPlayer = $(`
  <div id=${playerObject.id}>      
  <div class="card" style="width: 18rem; height: 18rem;">
  <div class="card-body">
  <h4 class="card-title">Your Player's Stats</h4>
  <h4><div id="level-value-${playerObject.id}">Level: 1</div></h4>
  <h4><div id="energy-value-${playerObject.id}">Energy: ${playerObject.energy}</div></h4>
  <h4><div id="fish-value-${playerObject.id}">Fishing Net: ${playerObject.net}</div></h4>
  <button id="cast-${playerObject.id}" class="btn btn-warning">Cast</button>
  <button id="eat-${playerObject.id}" class="btn btn-success">Eat</button>
  </div>  
  </div>
  </div>
  `);
  
  $("#players").append(thisPlayer);
  
  $(`#cast-${playerObject.id}`).on("click", () => {

    playerObject.net += 1 ;
    $(`#fish-value-${playerObject.id}`).text(`Fishing Net: ${playerObject.net}`);

    // const incState = playerScript.changeState("net")(1);
    // const newState = thisState(incState);
  });
  
  $(`#eat-${playerObject.id}`).on("click", () => {
    playerObject.energy += 1;
    $(`#energy-value-${playerObject.id}`).text(`Energy: ${playerObject.energy}`);
    playerObject.net -= 1 ;
    $(`#fish-value-${playerObject.id}`).text(`Fishing Net: ${playerObject.net}`);

    // const incState = playerScript.changeState("energy")(1);
    // const newState = thisState(incState);
    // $(`#energy-value-${playerObject.id}`).text(`Energy: ${newState.energy}`);
  });
  
  // $(`#energy-${playerObject.id}`).on("click", () => {
  //   const incState = decreaseEnergy();
  //   const newState = thisState(incState);
  //   $(`#energy-value-${playerObject.id}`).text(`Energy: ${newState.energy}`);
  // });
}
