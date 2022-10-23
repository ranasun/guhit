export const getXY = (canvas: HTMLCanvasElement | null, e: any) => {
	let pos = { x: 0, y: 0 };

	if (!canvas) return pos;

	const { left, top } = canvas.getBoundingClientRect();

	let ev = e;

	if (e.type.includes('touch')) {
		ev = e.touches[0];
	}

	pos.x = ev.clientX - left;
	pos.y = ev.clientY - top;

	return pos;
};
