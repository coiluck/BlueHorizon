import { message, deleteMessage } from './module/message.js';

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