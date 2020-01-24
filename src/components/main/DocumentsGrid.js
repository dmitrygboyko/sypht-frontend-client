import React from 'react'

function DocumentsGrid(props) {
    var documents = props.documents.map((doc) => {
        return (<li className="list-group-item">{doc}</li>);
    });

    return (
        <ul className="list-group">
           {documents}
        </ul>
    );
}

export default DocumentsGrid;

