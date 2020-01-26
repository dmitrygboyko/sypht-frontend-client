import React from 'react'

function Authenticate(props) {
    if (props.isAuthenticated) {
        return (
            <div>
                <button>Clear Access Token</button>
            </div>
        );
    }
    else {
        return (
            <div>
                <span>Please authenticate</span>
                <input type="text"></input>
                <input type="text"></input>
                <button onClick={() => props.authenticate("clientid", "clientSecret")}>Authenticate</button>
            </div>
        );
    }
}

export default Authenticate