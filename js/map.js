// 場所の名前を配列で定義
const locationNames = {
  path1: "最果ての島",
  path2: "これは見えないはず",
  path3: "海底渓谷",
  path4: "静寂の浅瀬",
  path5: "霧の湿地帯",
  path6: "忘れられた遺跡",
  path7: "大陸周辺部",
  path8: "海の孤島",
  path9: "遥かなる大洋",
  path10: "「汐凪の街」周辺",
  path11: "青の諸島",
  path12: "「天を突く山」周辺",
  path13: "水晶の洞窟"
};

// 各パスのアップグレード条件
const pathUpgradeRequirements = {
  path1: 4,
  path2: 0,
  path3: 3,
  path4: 1,
  path5: 2,
  path6: 4,
  path7: 3,
  path8: 1,
  path9: 3,
  path10: 0,
  path11: 4,
  path12: 2,
  path13: 2,
};

import { globalGameState } from './module/gameState.js';
import { addTooltipEvents } from './module/addToolTip.js';
import { explore } from './explore.js';
import { playSoundEffect } from './module/audio.js';

// <object>要素が読み込まれたら処理を開始
document.getElementById('map-object').addEventListener('load', () => {
  // SVGドキュメントとそのルート要素を取得
  const svgDoc = document.getElementById('map-object').contentDocument;
  if (!svgDoc) {
    console.error('SVG document not loaded yet.');
    return;
  }
  const svgElement = svgDoc.documentElement;
  if (!svgElement) {
    console.error('No root element in SVG.');
    return;
  }

  // g要素を取得
  const gElement = svgDoc.querySelector('#g1');

  // 各パスに対して処理を実行
  for (let i = 1; i <= 13; i++) {
    const pathId = `path${i}`;
    const path = svgDoc.getElementById(pathId);

    if (path) {
      // クリックイベントの設定
      path.addEventListener('click', () => {

        const playerLevel = globalGameState.gameState.CelestiaUpgrade.engine + globalGameState.gameState.CelestiaUpgrade.fuel;
        const requiredLevel = pathUpgradeRequirements[pathId];
        if (playerLevel >= requiredLevel) {
          // 解禁されている場合
          playSoundEffect('dive');
          console.log(`Clicked on path: ${pathId} (${locationNames[pathId]})`);
          // 背景を設定してmodalを表示
          explore(pathId);
        } else {
          playSoundEffect('disable');
        }
      });

      // 地名テキストの表示
      const bbox = path.getBBox(); // パスの境界ボックスを取得
      const x = bbox.x + bbox.width / 2; // 中心点のX座標
      const y = bbox.y + bbox.height / 2; // 中心点のY座標

      // SVG用の<text>要素を作成
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.setAttribute('id', `text-${pathId}`);
      text.setAttribute('text-anchor', 'middle'); // 水平方向の中央揃え
      text.setAttribute('dominant-baseline', 'central'); // 垂直方向の中央揃え
      text.setAttribute('class', 'location-name'); // CSSでスタイルを適用
      text.textContent = locationNames[pathId] || '不明な場所'; // 配列から名前を取得
      text.setAttribute('font-size', '40'); // フォントサイズを35に設定

      // テキスト要素をg要素またはSVG要素に追加
      if (gElement) {
        gElement.appendChild(text);
      } else {
        svgElement.appendChild(text);
      }
    }
  }
  updateMapPathsState(); // これは1回目の読み込みで実行
});

// ゲーム状態を更新した後
export function updateMapPathsState() {
  const svgDoc = document.getElementById('map-object').contentDocument;
  if (!svgDoc) {
    console.error('SVG document not loaded yet.');
    return;
  }

  const playerLevel = globalGameState.gameState.CelestiaUpgrade.engine + globalGameState.gameState.CelestiaUpgrade.fuel;

  for (const pathId in locationNames) {
    const path = svgDoc.getElementById(pathId);
    const text = svgDoc.getElementById(`text-${pathId}`);
    if (!path || !text) continue;

    const requiredLevel = pathUpgradeRequirements[pathId];
    const isLocked = playerLevel < requiredLevel;

    // ロックアイコンの処理
    let lockIcon = svgDoc.getElementById(`lock-${pathId}`);
    if (isLocked) {
      path.classList.add('locked-path');
      text.classList.add('locked-text');

      addTooltipEvents(path, document.getElementById('map-object'), `セレスティア号の「推進エンジン」と「燃料タンク」のアップグレード（合計 ${requiredLevel}以上）が必要です`);
      
      // アイコンがなければ作成
      if (!lockIcon) {
        lockIcon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        lockIcon.setAttribute('id', `lock-${pathId}`);
        lockIcon.setAttribute('x', text.getAttribute('x'));
        lockIcon.setAttribute('y', text.getAttribute('y'));
        lockIcon.setAttribute('text-anchor', 'middle');
        lockIcon.setAttribute('dominant-baseline', 'central');
        lockIcon.setAttribute('class', 'lock-icon');
        lockIcon.textContent = '🔒';
        svgDoc.documentElement.appendChild(lockIcon);
      }
    } else {
      path.classList.remove('locked-path');
      text.classList.remove('locked-text');
      // アイコンがあれば削除する
      if (lockIcon) {
        lockIcon.remove();
      }
    }
  }
}