import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { getXY } from './common/utils';
import Toolbar from './components/Toolbar';
import Color from './components/Color';
import DownloadButton from './components/DownloadButton';
import './App.css';

const App = () => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState('#000000');
	const [lineWidth, setLineWidth] = useState(1);

	useEffect(() => {
		const ctx = canvas.current;

		if (ctx) {
			ctx.width = window.innerWidth;
			ctx.height = window.innerHeight;
			setCtx(ctx.getContext('2d'));
		}
	}, []);

	const onStart = (e: MouseEvent | TouchEvent): void => {
		if (!ctx) return;

		const { x, y } = getXY(canvas.current, e);
		ctx.moveTo(x, y);
		ctx.beginPath();
		setIsDrawing(true);
	};

	const onMove = (e: MouseEvent | TouchEvent) => {
		if (!ctx || !isDrawing) return;

		const { x, y } = getXY(canvas.current, e);
		ctx.lineTo(x, y);
		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.stroke();
	};

	const onEnd = () => {
		if (!ctx) return;

		ctx.closePath();
		setIsDrawing(false);
	};

	const colors = [
		'#000000',
		'#f14922',
		'#ffa629',
		'#ffcd2a',
		'#13ae5c',
		'#0499ff',
		'#9747ff',
	];

	return (
		<div>
			<DownloadButton canvas={canvas.current} />
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
