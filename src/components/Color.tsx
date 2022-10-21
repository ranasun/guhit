import './Color.css';

interface Props {
	selected: string;
	color: string;
	onClick(): void;
}

const Color: React.FC<Props> = ({ selected, color, onClick }) => {
	return (
		<div
			className={
				selected === color
					? 'color-container selected'
					: 'color-container'
			}
			onClick={onClick}
		>
			<div className="color" style={{ backgroundColor: color }}></div>
		</div>
	);
};

export default Color;
