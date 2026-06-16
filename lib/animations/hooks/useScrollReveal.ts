import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export interface RevealConfig {
  y?: number;
  opacity?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  start?: string;
  once?: boolean;
  selector?: string;
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement>,
  config: RevealConfig = {}
) {
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    ease = 'power3.out',
    stagger = 0,
    start = 'top 85%',
    once = true,
    selector = '.reveal',
  } = config;

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = gsap.utils.toArray(selector) as Element[];
    if (elements.length === 0) return;

    elements.forEach((el, i) => {
      gsap.from(el, {
        y,
        opacity,
        duration,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
        delay: stagger * i,
      });
    });
  }, { scope: containerRef });
}

export function useStaggeredReveal(
  containerRef: RefObject<HTMLElement>,
  selectors: string[],
  baseConfig: RevealConfig = {}
) {
  useGSAP(() => {
    if (!containerRef.current) return;

    selectors.forEach((selector, groupIndex) => {
      const elements = gsap.utils.toArray(selector) as Element[];
      elements.forEach((el, i) => {
        gsap.from(el, {
          y: baseConfig.y ?? 40,
          opacity: baseConfig.opacity ?? 0,
          duration: baseConfig.duration ?? 0.8,
          ease: baseConfig.ease ?? 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: baseConfig.start ?? 'top 85%',
            toggleActions: baseConfig.once !== false ? 'play none none none' : 'play reverse play reverse',
          },
          delay: (baseConfig.stagger ?? 0) * i + (baseConfig.stagger ?? 0) * groupIndex * 0.1,
        });
      });
    });
  }, { scope: containerRef });
}