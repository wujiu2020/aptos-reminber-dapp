import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// 与 API 集成的第一步window.aptos是延迟呈现应用程序，直到window.onload事件触发。
window.addEventListener('load', () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

declare global {
  interface Window { aptos: any; }
}

reportWebVitals();
