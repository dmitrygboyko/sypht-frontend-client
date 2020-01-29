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
        if (!files || files.length == 0) {
            return 0;
        }

        var totalAmounts = files.map(item => {
            if (!item.data || !item.data.results) {
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


    var fileList = props.fileManagement.files.length === 0
        ? <h4>No files uploaded</h4>
        : (
            <div>
                <h4>Uploaded files</h4>
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

    var main = !isAuthenticated
        ? <div></div>
        : (
            <div className="component-main">
                {fileList}
                <br />
                {totalAmountDueElement}
                <UploadFile uploadFile={props.uploadFile} sendingRequest={props.fileManagement.sendingRequest} accessToken={props.auth.accessToken} errorMessage={props.fileManagement.errorMessage} />
            </div>
        );

    return (
        <div>
            <Authenticate authenticate={props.authenticate} isAuthenticated={isAuthenticated} clearAccessToken={props.clearAccessToken} auth={props.auth}></Authenticate>
            {main}
        </div>
    )
}


//It is not the best practise, but our app is small 
// and we uilize almost whole state here
const mapStateToProps = state => state

export default connect(mapStateToProps,
    { authenticate, clearAccessToken, selectFile, uploadFile })(Main);