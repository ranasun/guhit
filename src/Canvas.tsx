import {
	forwardRef,
	MouseEvent,
	useImperativeHandle,
	TouchEvent,
	useEffect,
	useRef,
	useState,
} from 'react';
import { getXY } from './common/utils';

interface Props {
	color: string;
}

const Canvas = forwardRef<HTMLCanvasElement, Props>(
	({ color }, forwardedRef) => {
		const ref = useRef<HTMLCanvasElement>(null);
		const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
		const [isDrawing, setIsDrawing] = useState(false);
		const [lineWidth, setLineWidth] = useState(3);
		const [x, setX] = useState(0);
		const [y, setY] = useState(0);

		useImperativeHandle<HTMLCanvasElement | null, HTMLCanvasElement | null>(
			forwardedRef,
			() => ref.current,
			[]
		);

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
		}, [ctx, color]);

		const onMove = (e: MouseEvent | TouchEvent) => {
			const { x, y } = getXY(ref.current, e);
			setX(x);
			setY(y);

			if (isDrawing) {
				if (!ctx) return;
				ctx.lineTo(x, y);
				ctx.stroke();
			}
		};

		const onStart = (): void => {
			if (!ctx) return;
			ctx.moveTo(x, y);
			ctx.beginPath();
			setIsDrawing(true);
		};

		const onEnd = () => {
			if (!ctx) return;
			ctx.closePath();
			setIsDrawing(false);
		};

		return (
			<canvas
				ref={ref}
				onMouseDown={onStart}
				onMouseMove={onMove}
				onMouseUp={onEnd}
				onTouchStart={onStart}
				onTouchMove={onMove}
				onTouchEnd={onEnd}
			></canvas>
		);
	}
);

export default Canvas;
