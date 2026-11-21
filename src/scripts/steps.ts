/**
 * Keeps the sticky phone in step with the text beside it: whichever step
 * crosses the middle of the viewport decides which screen the phone shows.
 * The screen that just became active also gets .is-live, which starts its
 * one-off animation (the slide to buy, the notifications arriving).
 */
export function watchSteps() {
	const root = document.querySelector<HTMLElement>('[data-steps]');
	const stage = root?.querySelector<HTMLElement>('[data-stage]');
	if (!root || !stage) return;

	const steps = [...root.querySelectorAll<HTMLElement>('[data-step]')];
	const screens = [...stage.querySelectorAll<HTMLElement>('[data-screen]')];

	const activate = (i: number) => {
		stage.dataset.active = String(i);
		steps.forEach((s, n) => s.classList.toggle('is-active', n === i));
		screens.forEach((s, n) => s.classList.toggle('is-live', n === i));
	};
	activate(0);

	// The sticky stage is only shown on wide layouts; narrow ones need no observer.
	if (!matchMedia('(min-width: 60.01rem)').matches) return;

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.step));
			}
		},
		{ rootMargin: '-45% 0px -45% 0px' },
	);
	steps.forEach((s) => io.observe(s));
}
