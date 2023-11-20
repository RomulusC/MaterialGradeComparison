import { createRoot } from 'react-dom/client';
import App from './App.tsx'



const root = createRoot(document.getElementById('root') as Element);   // notice the '!'
root.render(<App />);