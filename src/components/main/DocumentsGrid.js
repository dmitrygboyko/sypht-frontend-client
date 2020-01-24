import React from 'react'

function DocumentsGrid(props) {
    var documents = props.documents.map((doc, index) => {
        return (<li key={index} className="list-group-item">{doc.text}</li>);
    });

    return (
        <ul className="list-group">
           {documents}
        </ul>
    );
}

export default DocumentsGrid;

