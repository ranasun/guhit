import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Color from './components/Color';

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

	const colors = ['#000000', '#f97315', '#ebb305', '#22c55d', '#3c82f6'];

	return (
		<div>
			<Toolbar>
				{colors.map((item) => (
					<Color
						key={item}
						selected={color}
						color={item}
						onClick={() => setColor(item)}
				/>
				))}
			</Toolbar>

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
