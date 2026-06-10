import gsap from 'gsap';

export interface MagneticConfig {
  strength: number;
  area: number;
  ease: string;
  releaseEase: string;
}

export const DEFAULT_MAGNETIC_CONFIG: MagneticConfig = {
  strength: 0.35,
  area: 150,
  ease: 'power2.out',
  releaseEase: 'elastic.out(1, 0.4)',
};

export const MAGNETIC_PRESETS = {
  subtle: { strength: 0.15, area: 80, ease: 'power2.out', releaseEase: 'elastic.out(1, 0.4)' },
  normal: { strength: 0.3, area: 120, ease: 'power2.out', releaseEase: 'elastic.out(1, 0.4)' },
  strong: { strength: 0.5, area: 200, ease: 'power2.out', releaseEase: 'elastic.out(1, 0.4)' },
  hero: { strength: 0.35, area: 150, ease: 'power2.out', releaseEase: 'elastic.out(1, 0.4)' },
  nav: { strength: 0.2, area: 100, ease: 'power2.out', releaseEase: 'elastic.out(1, 0.4)' },
  card: { strength: 0.15, area: 80, ease: 'power2.out', releaseEase: 'elastic.out(1, 0.4)' },
} as const;

export function calculateMagneticOffset(
  element: HTMLElement,
  clientX: number,
  clientY: number,
  config: MagneticConfig
): { x: number; y: number } | null {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distanceX = clientX - centerX;
  const distanceY = clientY - centerY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  if (distance > config.area) return null;

  return {
    x: distanceX * config.strength,
    y: distanceY * config.strength,
  };
}

export function applyMagneticTransform(
  element: HTMLElement,
  offset: { x: number; y: number },
  config: MagneticConfig
): void {
  gsap.to(element, {
    x: offset.x,
    y: offset.y,
    duration: 0.3,
    ease: config.ease,
    overwrite: true,
  });
}

export function releaseMagneticTransform(
  element: HTMLElement,
  config: MagneticConfig
): void {
  gsap.to(element, {
    x: 0,
    y: 0,
    duration: 0.5,
    ease: config.releaseEase,
    overwrite: true,
  });
}