import React from 'react'

function UploadDocumentForm({ addDocument }) {

    const handleSubmit = e => {
        e.preventDefault();
        addDocument();
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-light upload">Upload</button>
        </form>
    );
}

export default UploadDocumentForm;