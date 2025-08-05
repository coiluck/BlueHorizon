// gameState.js
const initialState = {
  storyFlag: {
    ignoreReturnCount: 0,
    isContinueSalvation: false,
    isGoMayor: false,
    isGoLab: false,
  },
  gameState: {
    hasWaterPurifier: false,
    hope: 70,
    memoryPiece: 0,
    hunger: 100,
    day: 1,
    CelestiaUpgrade: {
      engine: 0,
      sonar: 0,
      body: 0,
      arm: 0,
      fuel: 0,
      living: 0,
    },
    items: {},
  },
};

export const globalGameState = structuredClone(initialState); // 初期化

export function resetGlobalState() {
  const freshState = structuredClone(initialState);
  Object.keys(freshState).forEach((key) => {
    globalGameState[key] = freshState[key];
  });
}

export function setGlobalGameState(newState) {
  Object.keys(newState).forEach((key) => {
    globalGameState[key] = newState[key];
  });
}