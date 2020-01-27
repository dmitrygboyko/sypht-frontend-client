import React, { useState } from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import './Files.css'
import FileList from './FileList'
import Authenticate from './Authenticate'
import UploadFile from './UploadFile'
import { authenticate, clearAuthToken, selectFile, uploadFile } from '../../actions'

function Main(props) {
    const isAuthenticated = !!props.authToken;

    if (isAuthenticated) {
        if (props.files.length == 0) {
            return <div>No files uploaded</div>
        }
        else {
            return (
                <div className="component-main">
                    <div className="authenticate">
                        <p>You are authenticated. Enjoy Sypht API</p>
                        <button className="btn btn-light" onClick={() => props.clearAuthToken()}>Clear Access Token</button>
                    </div>
                    <h4>Uploaded flies</h4>
                    <FileList files={props.files} selectFile={props.selectFile} />
                    <br />
                    <UploadFile uploadFile={props.uploadFile} authToken={props.authToken} />
                </div>
            )
        }
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
    { authenticate, clearAuthToken, selectFile, uploadFile })(Main);