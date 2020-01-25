import React from 'react';
import{ BrowserRouter, Route, Link } from 'react-router-dom'
import Documents from './components/documents/Index';
import './App.css';
import DocumentDetails from './components/documents/DocumentDetails';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={Documents}></Route>
        <Route path="/documents/:documentId" exact component={DocumentDetails}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;