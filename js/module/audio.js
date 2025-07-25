// audio.js
let musicVolume = 5;
let soundVolume = 6;

export function setVolume(audioType, volume) {
  if (audioType === 'music') {
    musicVolume = volume;
  } else if (audioType === 'sound') {
    soundVolume = volume;
  }
}