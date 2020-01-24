import React from 'react';
import Main from './pages/main/Index';
import './App.css';

function App() {
  var state = {
    documents: ["doc1", "doc2", "doc3", "doc4"]
  }

  return (
    <div className="app">
      <Main documents={state.documents}/>
    </div>
  );
}

export default App;