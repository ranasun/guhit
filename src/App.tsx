import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import './App.css';

const App = () => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState('black');
	const [lineWidth, setLineWidth] = useState(1);

	useEffect(() => {
		const ctx = canvas.current;

		if (ctx) {
			ctx.width = window.innerWidth;
			ctx.height = window.innerHeight;
			setCtx(ctx.getContext('2d'));
		}
	}, []);

	const getMousePos = (canvas: HTMLCanvasElement | null, e: any) => {
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

	const onStart = (e: MouseEvent | TouchEvent): void => {
		if (!ctx) return;

		const { x, y } = getMousePos(canvas.current, e);
		ctx.moveTo(x, y);
		ctx.beginPath();
		setIsDrawing(true);
	};

	const onMove = (e: MouseEvent | TouchEvent) => {
		if (!ctx || !isDrawing) return;

		const { x, y } = getMousePos(canvas.current, e);
		ctx.lineTo(x, y);
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	};

	const onEnd = (e: MouseEvent | TouchEvent) => {
		if (!ctx) return;

		ctx.closePath();
		setIsDrawing(false);
	};

	return (
		<div>
			<nav>
				<input
					type="color"
					onChange={(e) => setColor(e.target.value)}
				/>
				<input
					type="number"
					min={1}
					max={50}
					value={lineWidth}
					onChange={(e) => setLineWidth(parseInt(e.target.value))}
				/>
			</nav>
			<canvas
				ref={canvas}
				onMouseDown={onStart}
				onMouseMove={onMove}
				onMouseUp={onEnd}
				onTouchStart={onStart}
				onTouchMove={onMove}
				onTouchEnd={onEnd}
			></canvas>
		</div>
	);
};

export default App;
