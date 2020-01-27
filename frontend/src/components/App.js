import React from 'react';
import{ BrowserRouter, Route } from 'react-router-dom'

import Main from './files/Index';
import FileDetails from './fileDetails/Index';

import './App.css';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Route path="/" exact component={Main}></Route>
        <Route path="/documents/:fileId" exact component={FileDetails}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;