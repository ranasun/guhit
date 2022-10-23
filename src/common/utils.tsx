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

export const canvasToPng = (
	canvas: HTMLCanvasElement | null,
	filename: string
) => {
	if (!canvas) return;

	const link = document.createElement('a');
	link.download = filename;
	link.href = canvas.toDataURL('image/png;base64');

	const evt = new MouseEvent('click', {
		view: window,
		bubbles: true,
		cancelable: true,
	});

	link.dispatchEvent(evt);
	link.remove();
};
