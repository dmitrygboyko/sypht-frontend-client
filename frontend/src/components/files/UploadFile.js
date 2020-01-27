import React, { useEffect } from 'react'

function UploadFile(props) {
    var fileUploadRef = React.createRef();

    const uploadFile = () => {
        props.uploadFile(props.authToken, fileUploadRef.current.files[0]);
    }

    const selectFile = (e) => {
        e.preventDefault();
        fileUploadRef.current.click();
    }

    return (
        <form>
            <input type="file" name="uploadFileInput" hidden ref={fileUploadRef} onChange={() => uploadFile()}></input>
            <button className="btn btn-light upload" onClick={(e) => selectFile(e)}>Upload file</button>
        </form>
    );
}

export default UploadFile;