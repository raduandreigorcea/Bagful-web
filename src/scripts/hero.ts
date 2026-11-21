/**
 * The hero's one orchestrated moment. The routes draw themselves onto the map,
 * the stations take their places, then three products ride their lines to the
 * phone, each one landing as a new row and a toast, and the other stations light
 * up to say they got it. The HTML ships the finished state, so with no JS (or
 * reduced motion) the page simply shows that end state; here it is rewound and
 * played forward.
 */
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

/** GSAP tweens are thenables; an explicit promise is safer to await in a loop. */
const run = (targets: gsap.TweenTarget, vars: gsap.TweenVars) =>
	new Promise<void>((resolve) => {
		gsap.to(targets, { ...vars, onComplete: () => resolve() });
	});

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export async function playHero(hero: HTMLElement) {
	try {
		await play(hero);
	} catch (err) {
		console.error("[hero]", err);
	}
}

async function play(hero: HTMLElement) {
	const list = hero.querySelector<HTMLElement>('[data-list]');
	const toast = hero.querySelector<HTMLElement>('[data-toast]');
	const toastText = hero.querySelector<HTMLElement>('[data-toast-text]');
	const toastIcon = toast?.querySelector<HTMLImageElement>('img');
	const svg = hero.querySelector<SVGSVGElement>('svg.map');
	if (!list || !toast || !toastText || !toastIcon || !svg) return;

	const routes = [...svg.querySelectorAll<SVGPathElement>('path.route')];
	const stations = [...svg.querySelectorAll<SVGGElement>('.station')];
	const rings = stations.map((s) => s.querySelector('.ring'));
	const labels = svg.querySelectorAll('.label');
	const pulses = [...svg.querySelectorAll<SVGGElement>('.pulse')];

	const label = hero.querySelector<HTMLElement>('.ui-progress-label');
	const fill = hero.querySelector<HTMLElement>('.ui-progress-fill');
	const sync = () => {
		const rows = [...list.querySelectorAll<HTMLElement>('.ui-row')];
		const done = rows.filter((r) => r.classList.contains('is-done')).length;
		const left = rows.length - done;
		if (label) label.textContent = `${left} ${left === 1 ? 'item' : 'items'}`;
		if (fill) fill.style.width = `${rows.length ? (done / rows.length) * 100 : 0}%`;
	};

	// Rewind: take the late rows out, oldest first so they can be re-added in order.
	const late = [...list.querySelectorAll<HTMLElement>('[data-late]')].reverse();
	late.forEach((row) => row.remove());
	sync();

	// Rewind the map: nothing drawn, no station placed.
	routes.forEach((r) => {
		const len = r.getTotalLength();
		gsap.set(r, { strokeDasharray: len, strokeDashoffset: len });
	});
	gsap.set(rings, { scale: 0, transformOrigin: '50% 50%' });
	gsap.set(labels, { opacity: 0 });

	await gsap
		.timeline({ defaults: { ease: 'power3.out' } })
		.to(routes, { strokeDashoffset: 0, duration: 1.1, stagger: 0.14 })
		.to(rings, { scale: 1, duration: 0.5, ease: 'back.out(2.4)', stagger: 0.08 }, 0.7)
		.to(labels, { opacity: 1, duration: 0.4, stagger: 0.08 }, 0.9)
		.then();

	await wait(250);

	for (const row of late) {
		const name = row.dataset.name ?? '';
		const pulse = pulses.find((p) => p.dataset.item === name);
		const route = pulse ? svg.querySelector<SVGPathElement>(`#route-${pulse.dataset.route}`) : null;
		const who = pulse?.dataset.who ?? 'Sam';

		if (pulse && route) {
			// The product rides its line, from the person's station to the phone.
			gsap.set(pulse, { opacity: 1, scale: 1 });
			await run(pulse, {
				duration: 1.25,
				ease: 'power2.inOut',
				motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], start: 0.04, end: 1 },
			});
			await run(pulse, { opacity: 0, scale: 0.4, duration: 0.25, transformOrigin: '50% 50%' });
		}

		row.classList.add('is-new');
		list.prepend(row);
		sync();

		toastIcon.src = row.querySelector('img')?.getAttribute('src') ?? toastIcon.src;
		toastText.textContent = `${who} added ${name}`;
		toast.classList.add('is-shown');

		// Everyone else on the map hears about it in the same second.
		stations.forEach((s) => {
			if (s.dataset.route === pulse?.dataset.route) return;
			gsap.fromTo(
				s.querySelector('.halo'),
				{ attr: { r: 26 }, opacity: 0.55 },
				{ attr: { r: 78 }, opacity: 0, duration: 1.1, ease: 'power2.out' },
			);
		});

		await wait(1500);
		toast.classList.remove('is-shown');
		await wait(300);
	}

	// Last beat: someone in the shop ticks off the eggs.
	list.querySelector<HTMLElement>('[data-name="Eggs"]')?.classList.add('is-done');
	sync();

	// Presence is the only thing that moves on its own: now and then a station says hello.
	let visible = true;
	new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);
	let n = 0;
	setInterval(() => {
		if (!visible || document.hidden) return;
		const s = stations[n++ % stations.length];
		gsap.fromTo(
			s.querySelector('.halo'),
			{ attr: { r: 26 }, opacity: 0.4 },
			{ attr: { r: 64 }, opacity: 0, duration: 1.6, ease: 'power2.out' },
		);
	}, 3800);
}
