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