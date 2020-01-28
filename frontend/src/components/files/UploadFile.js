import React from 'react'

function UploadFile(props) {
    var fileUploadRef = React.createRef();

    const uploadFile = () => {
        props.uploadFile(props.accessToken, fileUploadRef.current.files[0]);
    }

    const selectFile = (e) => {
        e.preventDefault();
        fileUploadRef.current.click();
    }

    return (
        <form>
            <input type="file" name="uploadFileInput" hidden ref={fileUploadRef} onChange={() => uploadFile()}></input>
            <button className="btn btn-info upload" onClick={(e) => selectFile(e)}>Upload file</button>
        </form>
    );
}

export default UploadFile;