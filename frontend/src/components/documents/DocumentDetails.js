import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import loader from '../../images/ajax-loader.gif'

function DocumentDetails(props) {
    console.log(props.selectedFile)
    var results = null;

    const fetchDocument = async fileId => {
        const authResult = await axios.post('http://localhost:3001/authenticate');
        axios.defaults.headers.common = { 'Authorization': `Bearer ${authResult.data.access_token}` }
        const result = await axios.get(`http://localhost:3001/results/${fileId}`);
    };

    if (!results) {
        return (
            <div>
                <img src={loader} alt="loading..." />
            </div>
        )
    }
    else {
        var fields = results.results.fields.map((item, index) => {
            const value = item.value ? item.value.toString() : "";

            return (
                <li key={item.name} className="list-group-item">
                    <div>
                        <span>{item.name}:</span>
                        <span>{value}</span>
                    </div>
                </li>
            )
        })

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span>File Id:</span>
                                <span>{results.fileId}</span>
                            </li>
                            <li className="list-group-item">
                                <span>Status:</span>
                                <span>{results.status}</span>
                            </li>
                            <li className="list-group-item">
                                <span>Timestamp:</span>
                                <span>{results.results.timestamp}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <ul className="list-group">
                            {fields}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const selectedFile = state.sypht.files.find(x=> x.id == props.match.params.fileId)
    return { selectedFile: selectedFile };
};

export default connect(mapStateToProps)(DocumentDetails);