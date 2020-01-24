import React from 'react'

function DocumentsGrid(props) {
    var documents = props.documents.map((doc) => {
        return (<li>{doc}</li>);
    });

    return (
        <ul>
           {documents}
        </ul>
    );
}

export default DocumentsGrid;

