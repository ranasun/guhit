import { MouseEvent, TouchEvent, useEffect, useRef, useState } from 'react';
import { getXY } from './common/utils';
import Toolbar from './components/Toolbar';
import Color from './components/Color';
import DownloadButton from './components/DownloadButton';
import './App.css';

const App = () => {
	const ref = useRef<HTMLCanvasElement>(null);
	const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [color, setColor] = useState('#000000');
	const [lineWidth, setLineWidth] = useState(1);

	useEffect(() => {
		const canvas = ref.current;

		if (canvas) {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			setCtx(canvas.getContext('2d'));
		}
	}, [ref]);

	useEffect(() => {
		if (!ctx) return;

		ctx.strokeStyle = color;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = 'round';
	}, [ctx]);

	const onStart = (e: MouseEvent | TouchEvent): void => {
		if (!ctx) return;

		const { x, y } = getXY(ref.current, e);
		ctx.moveTo(x, y);
		ctx.beginPath();
		setIsDrawing(true);
	};

	const onMove = (e: MouseEvent | TouchEvent) => {
		if (!ctx || !isDrawing) return;

		const { x, y } = getXY(ref.current, e);
		ctx.lineTo(x, y);

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
		<>
			<DownloadButton canvas={ref.current} />
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
				ref={ref}
				onMouseDown={onStart}
				onMouseMove={onMove}
				onMouseUp={onEnd}
				onTouchStart={onStart}
				onTouchMove={onMove}
				onTouchEnd={onEnd}
			></canvas>
		</>
	);
};

export default App;
