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
        <div>
            <div>Please authenticate to start with Sypht API</div>
            <input type="text" placeholder="client id" onChange={(e) => clientId = e.target.value}></input>
            <input type="text" placeholder="client secret" onChange={(e) => clientSecret = e.target.value}></input>
            <button onClick={() => authenticate()}>Authenticate</button>
        </div>
    );
}

export default Authenticate