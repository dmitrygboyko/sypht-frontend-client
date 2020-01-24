import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css'
import DocumentsGrid from './DocumentsGrid'

function Main() {
    const [documents, setDocuments] = useState([
        { text: "Doc 1" },
        { text: "Doc 2" },
        { text: "Doc 3" }
    ]);

    const handleClick = e => {
        addDocument({ text: "Doc " + (documents.length + 1) })
    }

    const addDocument = doc => {
        const newDocuments = [...documents, doc];
        setDocuments(newDocuments);
      };

    return (
        <div className="component-main">
            Documents
            <DocumentsGrid documents={documents} />
            <br />
            <button type="button" className="btn btn-light upload" onClick={() => handleClick()}>Upload</button>
        </div>
    );
}

export default Main;