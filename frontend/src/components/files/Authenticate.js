import React from 'react'

function Authenticate(props) {
    var clientId = "";
    var clientSecret = "";

    const authenticate = () => {
        props.authenticate(clientId, clientSecret);
        clientId = "";
        clientSecret = ""
    }

    return (
        <div className="authenticate">
            <p>Please authenticate to start with Sypht API</p>
            <input className="form-control" type="text" placeholder="client id" onChange={(e) => clientId = e.target.value}></input>
            <input className="form-control" type="text" placeholder="client secret" onChange={(e) => clientSecret = e.target.value}></input>
            <button className="btn btn-info" onClick={() => authenticate()}>Authenticate</button>
        </div>
    );
}

export default Authenticate