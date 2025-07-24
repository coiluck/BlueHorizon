// achievement.js
import { changeModal } from './module/changeModal.js';

document.getElementById('achievement-close-button').addEventListener('click', () => {
  changeModal('top');
});
document.getElementById('top-icon-achievement').addEventListener('click', () => {
  setUpAchievement();
  setUpEnding();
});

const achievementList = [
  {
    id: 1,
    title: "記憶の欠片",
    description: "記憶の欠片を一つ以上集める",
  },
  {
    id: 2,
    title: "記憶の探究者",
    description: "記憶の欠片を十個すべて集める",
  },
  {
    id: 3,
    title: "小さな発明家",
    description: "初めてアイテムを合成する",
  },
  {
    id: 4,
    title: "街の希望",
    description: "浄水装置をクラフトする",
  },
  {
    id: 5,
    title: "過去の遺産",
    description: "水没遺跡で浄水装置を発見する",
  },
  {
    id: 6,
    title: "セレスティア号、改装",
    description: "セレスティア号の性能を引き上げる",
  },
  {
    id: 7,
    title: "蒼海の翼",
    description: "セレスティア号の性能を最大まで引き上げる",
  },
  {
    id: 8,
    title: "一流のサルベージャー",
    description: "一度のゲームのサルベージで100個以上のアイテムを手に入れる",
  },
  {
    id: 9,
    title: "海のコレクター",
    description: "一度のゲームで全種類のサルベージ品を収集する",
  },
  {
    id: 10,
    title: "蒼の世界の冒険家",
    description: "一度のゲームでマップ上の全ての探索ポイントを発見する",
  },
  {
    id: 11,
    title: "父の面影",
    description: "一度のゲームでミナの父に関連する「記憶の欠片」を全て集める",
  },
  {
    id: 12,
    title: "光速の救世主",
    description: "20日以内に街を救う",
  },
  {
    id: 13,
    title: "揺るぎない希望",
    description: "パラメータ「希望」を一度も下げずにクリアする",
  },
  {
    id: 14,
    title: "絶望の淵から",
    description: "「希望」が10以下になった後、グッドエンディングに到達する",
  },
  {
    id: 15,
    title: "オンボロ潜水艇の奇跡",
    description: "セレスティア号を一度もアップグレードせずにクリアする",
  },
  {
    id: 16,
    title: "深海からの生還",
    description: "最も危険度の高い海域での探索を完了する",
  },
  {
    id: 17,
    title: "真実よりも大切なもの",
    description: "世界の真実を知った上で、エンディング「続く日常」に到達する",
  },
  {
    id: 18,
    title: "応答なし",
    description: "街からの通信を一定回数以上無視する",
  },
];

function setUpAchievement() {
  const achievementItemContainer = document.querySelector('.achievement-item-container');
  achievementItemContainer.innerHTML = '';
  // ローカルストレージから取得
  const userAchievement = JSON.parse(localStorage.getItem('achievement')) || [1, 2, 6]; // 例だから後で消す
  achievementList.forEach(achievement => {
    const achievementItem = document.createElement('div');
    achievementItem.classList.add('achievement-item');
    // 達成済みか未達成か判定
    if (userAchievement.includes(achievement.id)) {
      achievementItem.classList.add('achieved');
    } else {
      achievementItem.classList.add('unachieved');
    }
    // 生成
    achievementItem.innerHTML = `
      <p class="achievement-item-title">${achievement.title}</p>
      <p class="achievement-item-description">${achievement.description}</p>
    `;
    achievementItemContainer.appendChild(achievementItem);
  });
}

const endingList = [
  {
    id: 1,
    title: "浮島へ",
    description: "説明です",
    image: "./assets/images/title_watercolor.avif",
  },
  {
    id: 2,
    title: "浮島へ",
    description: "説明です",
    image: "./assets/images/title_watercolor.avif",
  },
  {
    id: 3,
    title: "浮島へ",
    description: "説明です",
    image: "./assets/images/title_watercolor.avif",
  },
  {
    id: 4,
    title: "浮島へ",
    description: "説明です",
    image: "./assets/images/title_watercolor.avif",
  },
  {
    id: 5,
    title: "浮島へ",
    description: "説明です",
    image: "./assets/images/ending/5.png",
  },
  {
    id: 6,
    title: "浮島へ",
    description: "説明です",
    image: "./assets/images/title_watercolor.avif",
  }
];
function setUpEnding() {
  const achievementItemEndContainer = document.querySelector('.achievement-item-end-container');
  achievementItemEndContainer.innerHTML = '';
  // ローカルストレージから取得
  const userEnding = JSON.parse(localStorage.getItem('ending')) || [1, 2, 6]; // 例だから後で消す
  // 生成
  endingList.forEach(ending => {
    const achievementItemEnd = document.createElement('div');
    achievementItemEnd.classList.add('achievement-item-end');
    if (userEnding.includes(ending.id)) {
      achievementItemEnd.classList.add('achieved-end');
      achievementItemEnd.innerHTML = `
      <img src="${ending.image}" alt="${ending.title}">
      <div class="ending-info">
        <p class="ending-info-title">${ending.title}</p>
        <p class="ending-info-description">${ending.description}</p>
      </div>
    `;
    } else {
      achievementItemEnd.classList.add('unachieved-end');
      achievementItemEnd.innerHTML = `<img src="./assets/images/black.avif" alt="未達成用の黒い画像">`;
    }
    achievementItemEndContainer.appendChild(achievementItemEnd);
  });
}