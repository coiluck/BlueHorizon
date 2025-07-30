// audio.js
let musicVolume = 5;
let soundVolume = 6;
let voiceVolume = 6;

export function setVolume(audioType, volume) {
  if (audioType === 'music') {
    musicVolume = volume;
  } else if (audioType === 'sound') {
    soundVolume = volume;
  } else if (audioType === 'voice') {
    voiceVolume = volume;
  }
}

class BGMController {
  constructor() {
    this.audio = null;
    this.fadeInterval = null;
    this.isPlaying = false;
  }
  // 背景音楽を再生
  play(audioSrc, loop = true) {
    // 既存の音楽が再生中 -> 停止
    if (this.audio) {
      this.fadeOut();
    }
    // 新しいAudio
    this.audio = new Audio(audioSrc);
    this.audio.volume = musicVolume / 10;
    this.audio.loop = loop;
    // 再生開始
    this.audio.play();
    this.isPlaying = true;
  }

  // フェードアウトで停止
  fadeOut(duration = 2000) {
    if (!this.audio || !this.isPlaying) {
      console.warn('再生中の音楽がありません');
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      const startVolume = this.audio.volume;
      const fadeStep = startVolume / (duration / 50);
      this.fadeInterval = setInterval(() => {
        if (this.audio.volume > fadeStep) {
          this.audio.volume = Math.max(0, this.audio.volume - fadeStep);
        } else {
          // フェードアウト完了
          this.audio.volume = 0;
          this.audio.pause();
          this.audio.currentTime = 0;
          this.isPlaying = false;
          
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
          
          resolve();
        }
      }, 50);
    });
  }
}

const bgm = new BGMController();
export { bgm };

// 効果音
export function playSoundEffect(sound) {
  // wavファイルのリスト
  const wavFile = ["click1", "click2", "back", "clear"];
  // 音楽を新規再生
  let se;
  if (wavFile.includes(sound)) {
    se = new Audio(`./assets/audio/${sound}.wav`);
  } else {
    se = new Audio(`./assets/audio/${sound}.mp3`);
  }
  se.volume = soundVolume / 10;
  se.play();
}