import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Documents.css'
import DocumentsGrid from './DocumentsGrid'
import UploadDocumentForm from './UploadDocumentForm'

function Main() {
    const [documents, setDocuments] = useState([
        { id:"d5941e37-976b-4b91-a1de-4c62ece5ae17", name: "receipt.pdf" },
        { id:"2e8e64ce-63d0-4650-8f19-c17a67296523", name: "agl_bill.pdf" },
        { id:"76a9a736-19ec-4c16-aabb-4a08c7a6a1a3", name: "Sample_Invoice.pdf" }
    ]);

    const addDocument = () => {
        var doc = { text: "Doc " + (documents.length + 1) }
        const newDocuments = [...documents, doc];
        setDocuments(newDocuments);
    };

    return (
        <div className="component-main">
            Documents
            <DocumentsGrid documents={documents} />
            <br />
            {/* <UploadDocumentForm addDocument={addDocument}/> */}
        </div>
    );
}

export default Main;