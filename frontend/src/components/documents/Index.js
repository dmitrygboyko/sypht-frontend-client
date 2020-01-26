import React, { useState } from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import './Documents.css'
import DocumentsList from './DocumentsList'
import Authenticate from './Authenticate'
import UploadDocumentForm from './UploadDocumentForm'
import { authenticate } from '../../actions'

function Main(props) {
    // const addDocument = () => {
    //     var doc = { text: "Doc " + (documents.length + 1) }
    //     const newDocuments = [...documents, doc];
    //     setDocuments(newDocuments);
    // };

    const isAuthenticated = !!props.authToken;

    return (
        <div className="component-main">
            <Authenticate isAuthenticated={isAuthenticated} authenticate={props.authenticate}></Authenticate>
            Documents
            <DocumentsList files={props.files} />
            <br />
            {/* <UploadDocumentForm addDocument={addDocument}/> */}
        </div>
    );
}


const mapStateToProps = state => {
    return {
        authToken: state.sypht.authToken,
        files: state.sypht.files
    };
};

export default connect(mapStateToProps,
    { authenticate })(Main);