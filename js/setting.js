// setting.js
import { changeModal } from './module/changeModal.js';

document.getElementById('setting-close-button').addEventListener('click', () => {
  changeModal('top');
});

import { setVolume } from './module/audio.js';

document.getElementById('font-size').addEventListener('input', function() {
  // output要素の更新
  document.querySelector('output[for="font-size"]').textContent = this.value;
  // 文字サイズの変更
  document.documentElement.style.fontSize = `${16 + (this.value - 3) * 2}px`;
  // 文字の拡大による表示のずれを修正
  document.querySelector('.setting-container').style.gap = `${20 - (this.value - 3) * 4.5}px`;
  // ボタンのテキストを変更
  document.getElementById('setting-close-button').textContent = '設定する';
});

document.getElementById('bgm-volume').addEventListener('input', function() {
  // output要素の更新
  document.querySelector('output[for="bgm-volume"]').textContent = this.value;
  // bgmの音量の変更
  setVolume('music', this.value);
  // ボタンのテキストを変更
  document.getElementById('setting-close-button').textContent = '設定する';
});

document.getElementById('sfx-volume').addEventListener('input', function() {
  // output要素の更新
  document.querySelector('output[for="sfx-volume"]').textContent = this.value;
  // sfxの音量の変更
  setVolume('sound', this.value);
  // ボタンのテキストを変更
  document.getElementById('setting-close-button').textContent = '設定する';
});

document.getElementById('voice-volume').addEventListener('input', function() {
  // output要素の更新
  document.querySelector('output[for="voice-volume"]').textContent = this.value;
  // voiceの音量の変更
  setVolume('voice', this.value);
  // ボタンのテキストを変更
  document.getElementById('setting-close-button').textContent = '設定する';
});

// デフォルトにもどす
document.getElementById('setting-reset-button').addEventListener('click', () => {
  document.getElementById('font-size').value = 3;
  document.getElementById('bgm-volume').value = 5;
  document.getElementById('sfx-volume').value = 6;
  document.getElementById('voice-volume').value = 6;
  document.querySelector('output[for="font-size"]').textContent = 3;
  document.querySelector('output[for="bgm-volume"]').textContent = 5;
  document.querySelector('output[for="sfx-volume"]').textContent = 6;
  document.querySelector('output[for="voice-volume"]').textContent = 6;
  document.documentElement.style.fontSize = `${16 + (3 - 3) * 2}px`;
  setVolume('music', 5);
  setVolume('sound', 6);
  setVolume('voice', 6);
});