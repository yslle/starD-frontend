import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

const clientId = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID;

const script = document.createElement('script');
script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
script.async = true;

script.onload = () => {
    root.render(
            <App />
    );
};
document.head.appendChild(script);
