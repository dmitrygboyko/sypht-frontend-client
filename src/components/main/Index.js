import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css'
import DocumentsGrid from './DocumentsGrid'

function Main(props) {
    return (
        <div className="component-main">
            Documents
            <DocumentsGrid documents={props.documents}/>
            <br/>
            <button type="button" className="btn btn-light upload">Upload</button>
        </div>
    );
}

export default Main;