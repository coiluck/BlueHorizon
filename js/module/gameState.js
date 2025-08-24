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
    hasUnlockedWaterPurifier: false,
    hope: 70,
    memoryPiece: 0,
    memoryPieceArray: [],
    hunger: 100,
    day: 1,
    CelestiaUpgrade: {
      engine: 2,
      sonar: 0,
      arm: 0,
      fuel: 0,
      living: 0,
    },
    items: {
      "scrap_iron": 0,
      "wood": 0,
      "fiber_rope": 0,
      "copper_wire_cable": 0,
      "titanium_alloy_plate": 0,
      "activated_carbon": 0,
      "crystal_ore": 0,
      "circuit_board": 0,
      "fishing_gear": 0,
      "fish_1": 0,
      "fish_2": 0,
      "squid": 0,
      "bonfire": 0,
      "shichirin": 0,
      "cooked_food": 0,
      "paper_and_pen": 0,
      "explosive": 0,
      "simple_communicator": 0,
      "emergency_repair_kit": 0,
      "decryption_tool": 0,
      "cutting_tool": 0,
      "flashlight": 0,
      "pipe_parts": 0,
      "control_board": 0,
      "water_purifier": 0,
    },
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