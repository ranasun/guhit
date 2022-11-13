import { useState, useRef, useEffect, KeyboardEventHandler, SyntheticEvent, KeyboardEvent } from 'react';
import Toolbar from './components/Toolbar';
import Color from './components/Color';
import Canvas from './Canvas';
import Button from './components/Button';
import { canvasToPng } from './common/utils';
import './App.css';

const colors = [
	'#000000',
	'#f14922',
	'#ffa629',
	'#ffcd2a',
	'#13ae5c',
	'#0499ff',
	'#9747ff',
	'#ffffff',
];

type path = {
	x: number,
	y: number,
	color: string,
	lineWidth: number
};

const App = () => {
	const ref = useRef<HTMLCanvasElement>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [color, setColor] = useState(colors[0]);
	const [filename, setFilename] = useState('Untitled');
	const [memory, setMemory] = useState<[path[]] | []>([]);

	useEffect(() => {
		setCanvas(ref.current);
	}, [ref]);

	const downloadHandler = () => {
		canvasToPng(canvas, filename);
	};

	const onDrawEnd = (result: path[]) => {
		setMemory((m) => [...m, result] as [path[]]);
	}

	const handleUndo = () => {
		const canvas = ref.current;
		const ctx = canvas?.getContext('2d');

		if (!canvas || !ctx) return;

		memory.pop();

		setMemory((n: any) => [...memory]);

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		memory.forEach((path) => {
			ctx.beginPath();

			path.forEach((point, i: number) => {
				ctx.strokeStyle = point.color
				ctx.lineWidth = point.lineWidth;

				if (i === 0) {
					ctx.moveTo(point.x, point.y);
				} else {
					ctx.lineTo(point.x, point.y);
				}

				ctx.stroke();
			})

			ctx.closePath();
		});

		ctx.strokeStyle = color;
	}

	const handleKeypress = (e: KeyboardEvent<HTMLElement>) => {
		if (e.code === 'KeyZ' && e.metaKey) {
			handleUndo();
		}
	}

	return (
		<main onKeyDown={handleKeypress} tabIndex={0}>
			<div id="filename">
				<input
					type="text"
					value={filename}
					onChange={(e) => setFilename(e.target.value)}
					onFocus={(e) => e.target.select()}
				/>
			</div>
			<Button onClick={downloadHandler}>Download</Button>

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
			<Canvas ref={ref} color={color} onDrawEnd={onDrawEnd} />
		</main>
	);
};

export default App;
