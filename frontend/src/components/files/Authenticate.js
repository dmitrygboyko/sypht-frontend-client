import React from 'react'
import loader from '../../images/ajax-loader-small.gif'

function Authenticate(props) {
    var clientIdRef = React.createRef();
    var clientSecretRef = React.createRef();

    const authenticate = () => {
        var clientId = clientIdRef.current.value;
        var clientSecret = clientSecretRef.current.value;

        if (!clientId || !clientSecret) {
            return;
        }

        props.authenticate(clientId, clientSecret);
    }

    var img = props.auth.sendingRequest
        ? <img src={loader}></img>
        : <img></img>;

    var errorMessage = props.auth.sendingRequest
        ? ""
        : props.auth.errorMessage;

    if (props.isAuthenticated) {
        return (
            <div className="authenticate">
                <p>You are authenticated. Enjoy Sypht API</p>
                <button className="btn btn-light" onClick={() => props.clearAccessToken()}>Clear Access Token</button>
            </div>
        )
    }
    else {
        return (
            <div className="authenticate">
                <p>Please authenticate to start with Sypht API</p>
                <input className="form-control" type="text" ref={clientIdRef} placeholder="client id"></input>
                <input className="form-control" type="text" ref={clientSecretRef} placeholder="client secret"></input>
                <div>{img}</div>
                <button className="btn btn-info" onClick={() => authenticate()}>Authenticate</button>
                <p className="error">{errorMessage}</p>
            </div>
        );
    }
}

export default Authenticate