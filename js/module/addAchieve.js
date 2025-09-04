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