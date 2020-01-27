import React from 'react'

function Authenticate(props) {
    return (
        <div>
            <div>Please authenticate to start with Sypht API</div>
            <input type="text"></input>
            <input type="text"></input>
            <button onClick={() => props.authenticate("clientid", "clientSecret")}>Authenticate</button>
        </div>
    );
}

export default Authenticate