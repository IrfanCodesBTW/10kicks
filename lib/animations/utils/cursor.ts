export const CURSOR_SELECTORS = [
  'a',
  'button',
  '.product-card',
  '.brand-logo-card',
  '.universe-panel',
  '.gallery-thumbnail',
  '.magnetic-btn',
  '[onclick]',
  '.card-action-btn',
  '.detail-size-btn',
  '.qty-ctrl-btn',
  '.overlay-close',
  '.nav-links a',
  '.icon-btn',
  '.mob-nav-item',
  '.pagination button',
  '.btn-luxury-cta',
  '.btn-luxury-outline',
].join(', ');

export const CURSOR_CONFIG = {
  cursorScale: 1.5,
  ringScale: 1.2,
  ringLag: 0.15,
  moveTimeout: 1500,
  ringColor: 'var(--color-accent)',
  ringBackgroundHover: 'rgba(255, 90, 31, 0.05)',
  ringBackgroundDefault: 'transparent',
} as const;

export function isInteractiveElement(element: HTMLElement): boolean {
  return element.matches(CURSOR_SELECTORS) || element.closest(CURSOR_SELECTORS) !== null;
}

export function expandCursor(
  cursor: HTMLElement,
  ring: HTMLElement,
  config: typeof CURSOR_CONFIG = CURSOR_CONFIG
): void {
  cursor.style.transform = `translate(-50%, -50%) scale(${config.cursorScale})`;
  ring.style.transform = `translate(-50%, -50%) scale(${config.ringScale})`;
  ring.style.borderColor = config.ringColor;
  ring.style.backgroundColor = config.ringBackgroundHover;
}

export function resetCursor(
  cursor: HTMLElement,
  ring: HTMLElement,
  config: typeof CURSOR_CONFIG = CURSOR_CONFIG
): void {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  ring.style.transform = 'translate(-50%, -50%) scale(1)';
  ring.style.borderColor = config.ringColor;
  ring.style.backgroundColor = config.ringBackgroundDefault;
}

export function setCursorPosition(
  cursor: HTMLElement,
  ring: HTMLElement,
  x: number,
  y: number,
  ringLag: number = CURSOR_CONFIG.ringLag
): { ringX: number; ringY: number } {
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
  return { ringX: x, ringY: y };
}