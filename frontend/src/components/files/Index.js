import React, { useState } from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import './Files.css'
import FileList from './FileList'
import Authenticate from './Authenticate'
import UploadFile from './UploadFile'
import { authenticate, clearAccessToken, selectFile, uploadFile } from '../../actions'

function Main(props) {
    const isAuthenticated = !!props.auth.accessToken;

    if (isAuthenticated) {
        var fileList = props.files.length == 0
            ? <h4>No files uploaded</h4>
            : (
                <div>
                    <h4>Uploaded flies</h4>
                    <FileList files={props.files} selectFile={props.selectFile} />
                </div>
            );

        return (
            <div className="component-main">
                <div className="authenticate">
                    <p>You are authenticated. Enjoy Sypht API</p>
                    <button className="btn btn-light" onClick={() => props.clearAccessToken()}>Clear Access Token</button>
                </div>
                {fileList}
                <br />
                <UploadFile uploadFile={props.uploadFile} accessToken={props.auth.accessToken} />
            </div>
        )
    }
    else {
        return <Authenticate authenticate={props.authenticate} errorMessage={props.auth.errorMessage}></Authenticate>
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
        files: state.fileManagement.files
    };
};

export default connect(mapStateToProps,
    { authenticate, clearAccessToken, selectFile, uploadFile })(Main);