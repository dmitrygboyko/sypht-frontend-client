import React from 'react';
import DocumentsGrid from './DocumentsGrid'

function Main(props) {
    return (
        <div>
            Documents
            <button>Upload</button>
            <DocumentsGrid documents={props.documents}/>
        </div>
    );
}

export default Main;