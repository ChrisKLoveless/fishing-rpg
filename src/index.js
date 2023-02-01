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
}

window.onload = function () {
  $("#new-player").on("click", () => {
    addNewPlayer();
  });
};

function createPlayerElements(playerObject, thisState) {
  const thisPlayer = $(`
  <div id=${playerObject.id}>      
    <button id="fish-${playerObject.id}" class="btn btn-success">Cast</button>
    <div class="card">
      <h3>Your Player's Stats</h3>
      <h3><div id="fish-value-${playerObject.id}">Fishing Net: 0</div></h3>
      <h3><div id="fish-value-${playerObject.id}">Fishing Net: 0</div></h3>
    </div>
  </div>
  `);

  $("#players").append(thisPlayer);

  $(`#fish-${playerObject.id}`).on("click", () => {
    const incState = playerScript.changeState("net")(1);
    const newState = thisState(incState);
    $(`#fish-value-${playerObject.id}`).text(`Fishing Net: ${newState.net}`);
  });
}
