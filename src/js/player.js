export function createPlayer() {
  let playerId = 0;
  return function newPlayer(thisLevel = 1, thisEnergy = 100, thisNet = 0) {
    const newId = playerId + 1;
    playerId = newId;
    return { level: thisLevel, energy: thisEnergy, net: thisNet, id: newId };
  };
}

export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

export const stateControl = storeState();

export const changeState = (prop) => {
  return (value) => {
    return(state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value
    });
  };
};

export const decreaseState = (prop) => {
  return (value) => {
    return(state) => ({
      ...state,
      [prop]: (state[prop] || 0) - value
    });
  };
};

