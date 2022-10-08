import { MouseEvent, useEffect, useRef, useState } from 'react';
import './App.css';
const App = () => {
	const canvas = useRef<any>(null);
	const [ctx, setCtx] = useState<any>(null);
	const [isDrawing, setIsDrawing] = useState(false);

	useEffect(() => {
		canvas.current.width = window.innerWidth;
		canvas.current.height = window.innerHeight;
		setCtx(canvas.current.getContext('2d'));
	}, []);

	const getMousePos = (canvas: HTMLCanvasElement, e: MouseEvent) => {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
	};

	const onMouseDown = (e: MouseEvent): void => {
		const { x, y } = getMousePos(canvas.current, e);
		ctx.moveTo(x, y);
		ctx.beginPath();
		setIsDrawing(true);
	};

	const onMouseMove = (e: MouseEvent) => {
		if (!isDrawing) return;

		const { x, y } = getMousePos(canvas.current, e);
		ctx.lineTo(x, y);
		ctx.stroke();
	};

	const onMouseUp = (e: MouseEvent) => {
		ctx.closePath();
		setIsDrawing(false);
	};

	return (
		<canvas
			ref={canvas}
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
		></canvas>
	);
};

export default App;
