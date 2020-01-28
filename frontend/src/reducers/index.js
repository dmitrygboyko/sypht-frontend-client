import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

function getAuthState() {
    return {
        accessToken: localStorage.getItem('accessToken'),
        expiresAt: localStorage.getItem('expiresAt'),
        errorMessage: ""
    }
}

const defaultFileManagementState = {
    errorMessage: "",
    selectedFile: null,
    files: [
        { id: "d5941e37-976b-4b91-a1de-4c62ece5ae17", name: "receipt.pdf", isLoaded: false, data: null },
        { id: "2e8e64ce-63d0-4650-8f19-c17a67296523", name: "agl_bill.pdf", isLoaded: false, data: null },
        { id: "76a9a736-19ec-4c16-aabb-4a08c7a6a1a3", name: "Sample_Invoice.pdf", isLoaded: false, data: null }
    ]
};

const authenticationReducer = (state = getAuthState(), action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATION_RESULT_RECEIVED:
        case actionTypes.CLEAR_AUTH_TOKEN:
            return Object.assign({}, state, {
                errorMessage: "",
                accessToken: action.payload
            });
        case actionTypes.AUTHENTICATION_ERROR:
            return Object.assign({}, state, { errorMessage: action.payload })
        default:
            return state;
    }
}

const fileManagementReducer = (state = defaultFileManagementState, action) => {
    switch (action.type) {
        case actionTypes.FILE_SELELCTED:
            return Object.assign({}, state, { errorMessage: "", selectedFile: action.payload });
        case actionTypes.RESULT_RECEIVED:
            return getFileResultReceivedState(state, action);
        case actionTypes.FILE_UPLOADED:
            var newState = Object.assign({}, state.files, {
                errorMessage: "",
                files: [...state.files, action.payload]
            });

            return newState;
        case actionTypes.FILE_RESULT_ERROR:
        case actionTypes.FILE_UPLOAD_ERROR:
            return Object.assign({}, state, {errorMessage: action.payload});
        default:
            return state;
    }
}

const getFileResultReceivedState = (state, action) => {
    var selectedFile = Object.assign({}, state.selectedFile, {
        id: action.payload.fileId,
        isLoaded: true,
        data: action.payload.data
    });

    var files = !state.files || state.files.length == 0 ?
        [selectedFile] :
        state.files.map(file =>
            file.id == action.payload.fileId ? Object.assign({}, file, selectedFile) : file);

    return Object.assign({}, state, {
        selectedFile: selectedFile,
        files: files,
        errorMessage: ""
    });
}

export default combineReducers({
    auth: authenticationReducer,
    fileManagement: fileManagementReducer
});