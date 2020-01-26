import { combineReducers } from 'redux'

const defaultState = {
    authToken: "",
    files: [
        { id: "d5941e37-976b-4b91-a1de-4c62ece5ae17", name: "receipt.pdf" },
        { id: "2e8e64ce-63d0-4650-8f19-c17a67296523", name: "agl_bill.pdf" },
        { id: "76a9a736-19ec-4c16-aabb-4a08c7a6a1a3", name: "Sample_Invoice.pdf" }
    ]
};

const syphtReducer = (state=defaultState, action) => {
    if (action.type == 'AUTHENTICATE') {
        var newState = Object.assign({}, state, { authToken: action.payload });
        return newState;
    }
    else {
        return state
    }
}

export default combineReducers({
    sypht: syphtReducer
});