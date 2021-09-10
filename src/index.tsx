import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './Containers/Navigation';
import reportWebVitals from './reportWebVitals';
import 'bulma/css/bulma.min.css';
import { SocketProvider } from "./Context/SocketProvider";
import { SettingsProvider } from './Context/SettingsProvider';
import Loader from './Components/Commonds/Loader/Loader';
import AlertMsg from './Components/Commonds/Alert/AlertMsg';
import "./index.css";
import Header from './Components/Commonds/Header/Header';
import { UtilsProvider } from './Context/UtilsProvider';
import { LanguageProvider } from './Context/LanguageProvider';

ReactDOM.render(
  <React.StrictMode>
    <LanguageProvider>
      <SettingsProvider>
        <UtilsProvider>
          <SocketProvider>
            <Header />
            <AlertMsg />
            <Navigation />
            <Loader />
          </SocketProvider>
        </UtilsProvider>
      </SettingsProvider>
    </LanguageProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
