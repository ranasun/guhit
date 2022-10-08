import { createRoot } from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl as HTMLElement);
root.render(<App />);
