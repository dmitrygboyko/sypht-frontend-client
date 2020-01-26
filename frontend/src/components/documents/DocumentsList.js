import React from 'react'
import { Link } from 'react-router-dom'

function DocumentsList(props) {
    var files = props.files.map((file, index) => {
        return (
            <li key={index} className="list-group-item">
                <div>
                    <span>{file.name}</span>
                    <Link to={`/documents/${file.id}`}>View</Link>
                </div>
            </li>);
    });

    return (
        <ul className="list-group">
            {files}
        </ul>
    );
}

export default DocumentsList

