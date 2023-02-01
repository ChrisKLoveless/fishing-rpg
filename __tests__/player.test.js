/* eslint-disable no-undef */
import * as playerScript from "../src/js/player.js";

describe("createPlayer", () => {
  test("it should build a player object", () => {
    const newPlayer = playerScript.createPlayer();
    expect(typeof(playerScript.createPlayer())).toEqual(typeof(newPlayer));
  });
});