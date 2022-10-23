import { ReactNode } from 'react';
import './Button.css';

interface Props {
	onClick(): void;
	children: ReactNode;
}

const Button: React.FC<Props> = ({ children, onClick }) => {
	return (
		<div className="download-button" onClick={onClick}>
			{children}
		</div>
	);
};

export default Button;
