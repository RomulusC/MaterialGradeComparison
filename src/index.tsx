//import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App.tsx'
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = createRoot(document.getElementById('root') as Element);
root.render(
    <App/>
);