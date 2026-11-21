/**
 * The hero's one orchestrated moment: items fly out of the scenery into the
 * phone's list and a toast announces who added them, the way the real app
 * does. The HTML ships the finished list, so with no JS (or reduced motion)
 * the page simply shows the end state. Here we rewind it and play it forward.
 */

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export async function playHero(hero: HTMLElement) {
	const list = hero.querySelector<HTMLElement>('[data-list]');
	const toast = hero.querySelector<HTMLElement>('[data-toast]');
	const toastText = hero.querySelector<HTMLElement>('[data-toast-text]');
	const toastIcon = toast?.querySelector<HTMLImageElement>('img');
	if (!list || !toast || !toastText || !toastIcon) return;

	// Rewind: take the late rows out, oldest first so they can be re-added in order.
	const late = [...list.querySelectorAll<HTMLElement>('[data-late]')].reverse();
	late.forEach((row) => row.remove());

	const tiles = new Map(
		[...hero.querySelectorAll<HTMLElement>('[data-tile]')]
			.filter((t) => t.dataset.tile)
			.map((t) => [t.dataset.tile as string, t]),
	);

	await wait(900);

	for (const row of late) {
		const name = row.dataset.name ?? '';
		const tile = tiles.get(name);
		if (tile) await fly(tile, list);

		row.classList.add('is-new');
		list.prepend(row);

		toastIcon.src = row.querySelector('img')?.getAttribute('src') ?? toastIcon.src;
		toastText.textContent = `Radu added ${name}`;
		toast.classList.add('is-shown');
		await wait(1500);
		toast.classList.remove('is-shown');
		await wait(350);
	}

	// Last beat: someone in the shop ticks off the eggs.
	list.querySelector<HTMLElement>('[data-name="Eggs"]')?.classList.add('is-done');
}

/** Move a scenery tile onto the list's top edge, shrinking as it goes. */
async function fly(tile: HTMLElement, list: HTMLElement) {
	const from = tile.getBoundingClientRect();
	const to = list.getBoundingClientRect();
	const dx = to.left + to.width / 2 - (from.left + from.width / 2);
	const dy = to.top + 24 - (from.top + from.height / 2);

	const anim = tile.animate(
		[
			{ transform: 'translate(0, 0) scale(1)', opacity: 1 },
			{ transform: `translate(${dx * 0.55}px, ${dy * 0.35 - 40}px) scale(1.12)`, opacity: 1, offset: 0.45 },
			{ transform: `translate(${dx}px, ${dy}px) scale(0.5)`, opacity: 0 },
		],
		{ duration: 900, easing: 'cubic-bezier(0.5, 0, 0.3, 1)', fill: 'forwards' },
	);
	await anim.finished;
}
