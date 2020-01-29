import React from 'react'
import loader from '../../images/ajax-loader-small.gif'

function UploadFile(props) {
    var fileUploadRef = React.createRef();

    const uploadFile = () => {
        props.uploadFile(props.accessToken, fileUploadRef.current.files[0]);
        fileUploadRef.current.value = null;
    }

    const selectFile = (e) => {
        e.preventDefault();
        fileUploadRef.current.click();
    }

    var img = props.sendingRequest
        ? <img src={loader}></img>
        : <img></img>;

    var errorMessage = props.sendingRequest
        ? ""
        : props.errorMessage;

    return (
        <form>
            <input type="file" accept=".pdf" name="uploadFileInput" hidden ref={fileUploadRef} onChange={() => uploadFile()}></input>
            <button className="btn btn-info upload" onClick={(e) => selectFile(e)}>Upload file</button>
            <div className="textAlignCenter">
                {img}
            </div>
            <p className="error">{errorMessage}</p>
        </form>
    );
}

export default UploadFile;