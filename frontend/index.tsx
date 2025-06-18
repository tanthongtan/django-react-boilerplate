import React from 'react';
import ReactDOM from "react-dom/client";

import "./index.css";

const rootElement = document.getElementById("root")
if (!rootElement) throw new Error('Root element not found');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <h1>Hello, react!</h1>
  </React.StrictMode>
);