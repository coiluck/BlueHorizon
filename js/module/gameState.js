// gameState.js
export const initialState = {
  storyFlag: {
    ignoreReturnCount: 0,
    isContinueSalvation: false,
    isGoMayor: false,
    isGoLab: false,
  },
  gameState: {
    day: 1,
    hasWaterPurifier: false,
    items: {},
    memoryPiece: 0,
    hope: 0,
    CelestiaUpgrade: {
      level: 0,
    },
  },
};

const globalGameState = structuredClone(initialState); // 初期化

export function resetGlobalState() {
  const freshState = structuredClone(initialState);
  Object.keys(freshState).forEach((key) => {
    globalGameState[key] = freshState[key];
  });
}