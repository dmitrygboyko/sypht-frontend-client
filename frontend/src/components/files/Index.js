import React, { useState } from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import './Files.css'
import FileList from './FileList'
import Authenticate from './Authenticate'
import UploadDocumentForm from './UploadDocumentForm'
import { authenticate, clearAuthToken, selectFile } from '../../actions'

function Main(props) {
    // const addDocument = () => {
    //     var doc = { text: "Doc " + (documents.length + 1) }
    //     const newDocuments = [...documents, doc];
    //     setDocuments(newDocuments);
    // };

    const isAuthenticated = Boolean(props.authToken);

    if (isAuthenticated) {
        return (
            <div className="component-main">
                <div>
                    <button onClick={() => props.clearAuthToken()}>Clear Access Token</button>
                </div>
                <p>Uploaded flies</p>
                <FileList files={props.files} selectFile={props.selectFile}/>
                <br />
                {/* <UploadDocumentForm addDocument={addDocument}/> */}
            </div>
        )
    }
    else {
        return <Authenticate authenticate={props.authenticate}></Authenticate>
    }
}


const mapStateToProps = state => {
    return {
        authToken: state.authToken,
        files: state.fileManagement.files
    };
};

export default connect(mapStateToProps,
    { authenticate, clearAuthToken, selectFile })(Main);