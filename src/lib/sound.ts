const hoverSound = new Audio('/hover.mp3');

export const playHover = () => {
  hoverSound.currentTime = 0;
  hoverSound.volume = 0.15; // subtle premium sound
  hoverSound.play().catch(() => {});
};