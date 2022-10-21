import { ReactNode } from 'react';
import './Toolbar.css';

interface Props {
	children: ReactNode;
}

const Toolbar: React.FC<Props> = ({ children }) => {
	return <div id="toolbar">{children}</div>;
};

export default Toolbar;
