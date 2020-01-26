import React from 'react'
import { Link } from 'react-router-dom'

function DocumentsGrid(props) {
    var documents = props.documents.map((doc, index) => {
        return (
            <li key={index} className="list-group-item">
                <div>
                    <span>{doc.name}</span>
                    <Link to={`/documents/${doc.id}`}>View</Link>
                </div>
            </li>);
        });
    
        return (
        <ul className="list-group">
                    {documents}
                </ul>
                );
            }
            
            export default DocumentsGrid;
            
