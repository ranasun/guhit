import { MouseEvent, useEffect, useRef, useState } from 'react';
import './App.css';
const App = () => {
	const canvas = useRef<any>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [px, setPx] = useState(0);
	const [py, setPy] = useState(0);

	useEffect(() => {
		canvas.current.width = window.innerWidth;
		canvas.current.height = window.innerHeight;
	}, []);

	const getMousePos = (canvas: HTMLCanvasElement, e: MouseEvent) => {
		var rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
	};

	const onMouseDown = (e: MouseEvent): void => {
		const ctx = canvas.current.getContext('2d');
		const { x, y } = getMousePos(canvas.current, e);

		ctx.moveTo(x, y);
		setPx(x);
		setPy(y);
		ctx.beginPath();
		setIsDrawing(true);
	};

	const onMouseMove = (e: MouseEvent) => {
		if (!isDrawing) return;

		const ctx = canvas.current.getContext('2d');
		const { x, y } = getMousePos(canvas.current, e);
		ctx.lineTo(x, y);
		ctx.stroke();
		setPx(py);
		setPy(px);
	};

	const onMouseUp = (e: MouseEvent) => {
		const ctx = canvas.current.getContext('2d');
		ctx.closePath();
		setIsDrawing(false);
	};

	return (
		<canvas
			ref={canvas}
			id="canvas"
			width="500"
			height="500"
			onMouseDown={onMouseDown}
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
		></canvas>
	);
};

export default App;
