import './DownloadButton.css';

interface Props {
	canvas: HTMLCanvasElement | null;
}

const DownloadButton: React.FC<Props> = ({ canvas }) => {
	const downloadHandler = () => {
		if (!canvas) return;

		const link = document.createElement('a');
		link.download = 'guhit.png';
		link.href = canvas.toDataURL('image/png;base64');

		const evt = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
		});

		link.dispatchEvent(evt);
		link.remove();
	};

	return (
		<div className="download-button" onClick={downloadHandler}>
			Download
		</div>
	);
};

export default DownloadButton;
