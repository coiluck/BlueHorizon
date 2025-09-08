// addAchieve.js
import { globalGameState } from './gameState.js';
import { message } from './message.js';
import { achievementList } from '../achievement.js';

export function addAchievement(achievementId) {
  // 現在の実績を取得
  const userAchievements = JSON.parse(localStorage.getItem('achievement')) || [];
  // 実績情報を検索
  const achievement = achievementList.find(ach => ach.id === achievementId);
  const isAlreadyAchieved = userAchievements.includes(achievementId);
  if (!achievement) {
    console.error(`ID: ${achievementId} の実績は存在しません。`);
    return;
  }
  if (isAlreadyAchieved) {
    return;
  }
  // 新しい実績を保存
  userAchievements.push(achievementId);
  localStorage.setItem('achievement', JSON.stringify(userAchievements));
  // 通知
  message('achievement', `実績「${achievement.title}」を達成しました！`, 3000);
}

export function checkEndingAchievement(EndingType) {
  // エンディングで達成できるもの -> 20日以内、「希望」を常に80以上、「希望」が10以下、セレスティア号そのまま
  let isGoodEnding = false;
  if (EndingType === 'loadToTruth' || EndingType === 'lastingDays' || EndingType === 'hometown') {
    isGoodEnding = true;
  }
  if (globalGameState.gameState.day <= 20 && isGoodEnding) {
    addAchievement(14);
  }
  if (!globalGameState.forAchievement.isUnder80 && isGoodEnding) {
    addAchievement(15);
  }
  if (globalGameState.forAchievement.isUnder10 && isGoodEnding) {
    addAchievement(16);
  }
  if (globalGameState.gameState.CelestiaUpgrade.engine === 0 &&
    globalGameState.gameState.CelestiaUpgrade.sonar === 0 &&
    globalGameState.gameState.CelestiaUpgrade.arm === 0 &&
    globalGameState.gameState.CelestiaUpgrade.fuel === 0 &&
    globalGameState.gameState.CelestiaUpgrade.living === 0) {
    addAchievement(17);
  }
}

// 6、9、10、12、13はexplore.jsでチェック

export function checkMemoryPieceAchievement() {
  // 探索時にチェック
  addAchievement(1);
  if (globalGameState.forAchievement.memoryPiece >= 10) {
    // 10個以上の記憶の欠片
    addAchievement(2);
  }
  if (globalGameState.gameState.memoryPieceArray.includes(5, 6, 7)) {
    // これはあとで記憶のかけらのストーリーを追加したらチェックする
    // 父に関する記憶の欠片
    addAchievement(3);
  }
}

export function checkCraftAchievement(itemName) {
  // クラフト時にチェック
  addAchievement(4);
  if (itemName === 'water_purifier') {
    addAchievement(5);
  }
}

export function checkUpgradeAchievement() {
  // アップグレード時にチェック
  addAchievement(7);
  if (globalGameState.gameState.CelestiaUpgrade.engine === 2 &&
    globalGameState.gameState.CelestiaUpgrade.sonar === 2 &&
    globalGameState.gameState.CelestiaUpgrade.arm === 2 &&
    globalGameState.gameState.CelestiaUpgrade.fuel === 2 &&
    globalGameState.gameState.CelestiaUpgrade.living === 2) {
    addAchievement(8);
  }
}