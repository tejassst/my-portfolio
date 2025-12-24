'use client';

export function useTransitionSound() {
  const play = () => {
    const audio = new Audio('/sounds/transition.mp3');
    audio.volume = 0.15;
    audio.play().catch(() => {});
  };

  return play;
}
