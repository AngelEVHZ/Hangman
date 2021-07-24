import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './container/Navigation';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocketProvider } from "./context/SocketProvider";
import { SettingsProvider } from './context/SettingsProvider';
import Loader from './components/Loader/Loader';


ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <SocketProvider>
        <Navigation />
        <Loader></Loader>
      </SocketProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
