/**
 * The line is laid as you scroll: every section's solid rail grows from its top
 * edge to its bottom as the section passes through the viewport, so the page is
 * one route being drawn. Without JS (or with reduced motion) the rails ship
 * fully laid.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const rails = [...document.querySelectorAll<HTMLElement>('[data-rail]')];

if (rails.length && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
	gsap.registerPlugin(ScrollTrigger);
	rails.forEach((rail) => {
		gsap.fromTo(
			rail,
			{ scaleY: 0 },
			{
				scaleY: 1,
				ease: 'none',
				scrollTrigger: {
					trigger: rail.parentElement,
					start: 'top 75%',
					// Not lower than the page can scroll: the last section sits above the footer, so
					// its bottom edge never gets to the middle of the viewport.
					end: 'bottom 85%',
					scrub: 0.4,
				},
			},
		);
	});
}
