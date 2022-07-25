import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import Layout from './components/layout/Layout'
import './index.css';
import { AuthContextProvider } from './components/context/AuthContext';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
     <Layout />
     </AuthContextProvider>
  </React.StrictMode>
);

