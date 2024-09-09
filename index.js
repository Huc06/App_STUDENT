// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import ứng dụng chính

const root = ReactDOM.createRoot(document.getElementById('root')); // Tìm phần tử DOM
root.render(
  <React.StrictMode>
    <App /> // Render ứng dụng App
  </React.StrictMode>
);