import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import About from './components/About';
import App from './app/App';
import { store } from './app/store';

const container = document.getElementById('index');
const root = createRoot(container);
// root.render(<App />);
root.render(
  <Provider store={store}>
    <About />
  </Provider>
);
