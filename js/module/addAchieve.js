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

export function checkEndingAchievement() {
  // エンディングで達成できるもの -> 20日以内、「希望」を常に80以上、「希望」が10以下、セレスティア号そのまま
  if (globalGameState.gameState.day <= 20) {
    addAchievement(14);
  }
  if (!globalGameState.forAchievement.isUnder80) {
    addAchievement(15);
  }
  if (globalGameState.forAchievement.isUnder10) {
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