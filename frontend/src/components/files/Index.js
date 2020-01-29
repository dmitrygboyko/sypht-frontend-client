import React, { useState } from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import './Files.css'
import FileList from './FileList'
import Authenticate from './Authenticate'
import UploadFile from './UploadFile'
import { authenticate, clearAccessToken, selectFile, uploadFile } from '../../actions'

function Main(props) {
    const calculateTotalAmountDue = (files) => {
        if (files && files.length == 0) {
            return 0;
        }

        var totalAmountDues = files.map(item => {
            if (!item.data) {
                return 0;
            }

            const amountDueField = item.data.results.fields.find(x => x.name.toLowerCase().indexOf("amountdue") != -1);

            if (!amountDueField) {
                return 0;
            }

            const amountDue = !amountDueField.value ? 0 : parseFloat(amountDueField.value);
            return !amountDue ? 0 : amountDue;
        });

        var totalAmountDue = totalAmountDues.reduce((a, b) => a + b);

        return totalAmountDue;
    }

    const isAuthenticated = !!props.auth.accessToken;

    if (isAuthenticated) {
        var fileList = props.fileManagement.files.length === 0
            ? <h4>No files uploaded</h4>
            : (
                <div>
                    <h4>Uploaded flies</h4>
                    <FileList files={props.fileManagement.files} selectFile={props.selectFile} />
                </div>
            );

        var totalAmountDue = calculateTotalAmountDue(props.fileManagement.files);

        return (
            <div className="component-main">
                <div className="authenticate">
                    <p>You are authenticated. Enjoy Sypht API</p>
                    <button className="btn btn-light" onClick={() => props.clearAccessToken()}>Clear Access Token</button>
                </div>
                {fileList}
                <br />
                <div>
                    <h4>Total amount due: {totalAmountDue}</h4>
                </div>
                <UploadFile uploadFile={props.uploadFile} accessToken={props.auth.accessToken} errorMessage={props.fileManagement.errorMessage} />
            </div>
        )
    }
    else {
        return <Authenticate authenticate={props.authenticate} errorMessage={props.auth.errorMessage}></Authenticate>
    }
}


//It is not the best practise, but our app is small 
// and we uilize almost whole state here
const mapStateToProps = state => state

export default connect(mapStateToProps,
    { authenticate, clearAccessToken, selectFile, uploadFile })(Main);