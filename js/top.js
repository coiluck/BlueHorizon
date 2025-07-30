// top.js
import { message, deleteMessage } from './module/message.js';
import { playSoundEffect } from './module/audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // PC以外は警告
  if (window.innerWidth < 768) {
    message('error', 'このゲームはPCのみでプレイできます', 'infinity');
  }
});
// リサイズ時も警告
window.addEventListener('resize', () => {
  const box = document.getElementById('message-box');
  const messages = box.querySelectorAll('.messageBox-message');
  messages.forEach(msgEl => {
    msgEl.remove();
  });
  if (window.innerWidth < 768) {
    message('error', 'このゲームはPCのみでプレイできます', 'infinity');
  }
});

import { changeModal } from './module/changeModal.js';

document.getElementById('top-icon-achievement').addEventListener('click', () => {
  if (window.innerWidth < 768) {
    deleteMessage();
    message('error', 'このゲームはPCのみでプレイできます', 'infinity');
    return;
  }
  changeModal('achievement', '.achievement-container');
});

document.getElementById('top-icon-setting').addEventListener('click', () => {
  if (window.innerWidth < 768) {
    deleteMessage();
    message('error', 'このゲームはPCのみでプレイできます', 'infinity');
    return;
  }
  changeModal('setting', '.setting-container');
});

document.getElementById('top-button-start').addEventListener('click', () => {
  if (window.innerWidth < 768) {
    deleteMessage();
    message('error', 'このゲームはPCのみでプレイできます', 'infinity');
    return;
  }
  document.getElementById('top-button-start').style.pointerEvents = 'none';
  changeModal('opening', undefined, 2000);
  playSoundEffect('start');
  setTimeout(() => {
    document.getElementById('top-button-start').style.pointerEvents = 'auto';
  }, 2000);
});

document.getElementById('top-button-continue').addEventListener('click', () => {
  if (window.innerWidth < 768) {
    deleteMessage();
    message('error', 'このゲームはPCのみでプレイできます', 'infinity');
    return;
  }
    // 既存のボタンをスライドアウト
  document.querySelector('.top-button-container').classList.add('show-save-data');
});

document.getElementById('top-back').addEventListener('click', () => {
  if (window.innerWidth < 768) {
    deleteMessage();
    message('error', 'このゲームはPCのみでプレイできます', 'infinity');
    return;
  }
    // 既存のボタンをスライドアウト
  document.querySelector('.top-button-container').classList.remove('show-save-data');
});