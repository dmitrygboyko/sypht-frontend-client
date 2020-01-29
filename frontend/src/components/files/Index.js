import React, { useState } from 'react';
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import './Files.css'
import FileList from './FileList'
import Authenticate from './Authenticate'
import UploadFile from './UploadFile'
import { authenticate, clearAccessToken, selectFile, uploadFile } from '../../actions'

function Main(props) {
    const calculateTotalAmount = (files) => {
        if (files && files.length == 0) {
            return 0;
        }

        var totalAmounts = files.map(item => {
            if (!item.data) {
                return 0;
            }

            const totalAmountField = item.data.results.fields.find(x => x.name.toLowerCase().indexOf("total") != -1);

            if (!totalAmountField) {
                return 0;
            }

            const total = !totalAmountField.value ? 0 : parseFloat(totalAmountField.value);
            return !total ? 0 : total;
        });

        var totalAmount = totalAmounts.reduce((a, b) => a + b);

        return totalAmount;
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

        var totalAmountDue = calculateTotalAmount(props.fileManagement.files);
        var totalAmountDueElement = props.fileManagement.files.length == 0
            ? <div></div>
            : <div>
                <h4>Total: {totalAmountDue}</h4>
                <p>Cleck View to view file processing results and update total amount</p>
            </div>

        return (
            <div className="component-main">
                <div className="authenticate">
                    <p>You are authenticated. Enjoy Sypht API</p>
                    <button className="btn btn-light" onClick={() => props.clearAccessToken()}>Clear Access Token</button>
                </div>
                {fileList}
                <br />
                {totalAmountDueElement}
                <UploadFile uploadFile={props.uploadFile} sendingRequest={props.fileManagement.sendingRequest} accessToken={props.auth.accessToken} errorMessage={props.fileManagement.errorMessage} />
            </div>
        )
    }
    else {
        return <Authenticate authenticate={props.authenticate} sendingRequest={props.auth.sendingRequest} errorMessage={props.auth.errorMessage}></Authenticate>
    }
}


//It is not the best practise, but our app is small 
// and we uilize almost whole state here
const mapStateToProps = state => state

export default connect(mapStateToProps,
    { authenticate, clearAccessToken, selectFile, uploadFile })(Main);