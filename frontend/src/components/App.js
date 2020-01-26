import React from 'react';
import{ BrowserRouter, Route } from 'react-router-dom'

import Documents from './documents/Index';
import DocumentDetails from './documents/DocumentDetails';

import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={Documents}></Route>
        <Route path="/documents/:fileId" exact component={DocumentDetails}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;