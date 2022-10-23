import { useState, useRef, useEffect } from 'react';
import Toolbar from './components/Toolbar';
import Color from './components/Color';
import Canvas from './Canvas';
import DownloadButton from './components/DownloadButton';
import './App.css';

const App = () => {
	const ref = useRef<HTMLCanvasElement>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
	const [color, setColor] = useState('#000000');

	useEffect(() => {
		setCanvas(ref.current);
	}, [ref]);

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
			<DownloadButton canvas={canvas} />
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
			<Canvas ref={ref} color={color} />
		</>
	);
};

export default App;
