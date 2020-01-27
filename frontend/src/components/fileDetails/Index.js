import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import loader from '../../images/ajax-loader.gif'
import { getFileResults } from '../../actions'

function FileDetails(props) {
    const requireLoading = !props.selectedFile || !props.selectedFile.isLoaded

    useEffect(() => {
        if (requireLoading) {
            props.getFileResults(props.match.params.fileId, props.authToken);
        }
    });

    if (requireLoading) {
        return (
            <div>
                <img src={loader} alt="loading..." />
            </div>
        )
    }
    else {
        var data = props.selectedFile.data;
        var fields = data.results.fields.map((item, index) => {
            const value = item.value ? item.value.toString() : "empty";
            const nameParts = item.name.split('.');
            var name = nameParts.length == 2 ? nameParts[1] : item.name;
            name = name.charAt(0).toUpperCase() + name.substring(1)

            return (
                <li key={item.name} className="list-group-item">
                    <div>
                        <span>{name}:</span>
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
                                <span>{data.fileId}</span>
                            </li>
                            <li className="list-group-item">
                                <span>Status:</span>
                                <span>{data.status}</span>
                            </li>
                            <li className="list-group-item">
                                <span>Timestamp:</span>
                                <span>{data.results.timestamp}</span>
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
    const authToken = state.authToken;
    const selectedFile = state.fileManagement.selectedFile
    return {
        authToken: authToken,
        selectedFile: selectedFile
    };
};

export default connect(mapStateToProps,
    { getFileResults })(FileDetails);