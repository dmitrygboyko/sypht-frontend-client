import React from 'react'
import { Link } from 'react-router-dom'

function FileList(props) {
    var files = props.files.map((file, index) => {
        return (
            <li key={index} className="list-group-item">
                <div>
                    <div className="alignLeft">{file.name}</div>
                    <div className="alignRight">
                    <Link to={`/documents/${file.id}`} onClick={() => props.selectFile(file.id, props.files)}>View</Link>
                    </div>
                    <div className="alignClear"></div>
                </div>
            </li>);
    });

    return (
        <ul className="list-group">
            {files}
        </ul>
    );
}

export default FileList

