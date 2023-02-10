import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './store';
import { createDriver, Neo4jProvider } from 'use-neo4j';
import db from './config.json';

// driver to connect our database neo4j to the neo4jprovider
const driver = createDriver(
  'neo4j',
  'localhost',
  7687,
  db.NEO4J_CLIENT_ID,
  db.NEO4J_CLIENT_PWD
  );
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Neo4jProvider driver={driver}>
        <App />
      </Neo4jProvider>
    </Provider>
  </React.StrictMode>
);
