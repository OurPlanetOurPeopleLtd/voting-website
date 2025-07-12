import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { HelmetProvider } from "react-helmet-async";

import "../src/fonts/rns-sans/RNSSanz-Normal.woff";
import "../src/fonts/rns-sans/RNSSanz-Light.woff";
import "../src/fonts/rns-sans/RNSSanz-Bold.woff";
import "../src/fonts/rns-sans/RNSSanz-Normal.woff2";
import "../src/fonts/rns-sans/RNSSanz-Light.woff2";
import "../src/fonts/rns-sans/RNSSanz-Bold.woff2";


import "./index.scss";

import App from "./App";
import PasswordGate from "./PasswordGate";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <HelmetProvider> 
            <PasswordGate>
                <App></App>
            </PasswordGate>
        </HelmetProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
