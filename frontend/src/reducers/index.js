import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

function getAuthState() {
    return {
        accessToken: localStorage.getItem('accessToken'),
        sendingRequest: false,
        errorMessage: ""
    }
}

const defaultFileManagementState = {
    sendingRequest: false,
    errorMessage: "",
    selectedFile: null,
    files: []
};

const authenticationReducer = (state = getAuthState(), action) => {
    switch (action.type) {
        case actionTypes.SENDING_AUTH_REQUEST:
            return Object.assign({}, state, { sendingRequest: true })
        case actionTypes.AUTHENTICATION_RESULT_RECEIVED:
        case actionTypes.CLEAR_AUTH_TOKEN:
            return Object.assign({}, state, {
                sendingRequest: false,
                errorMessage: "",
                accessToken: action.payload
            });
        case actionTypes.AUTHENTICATION_ERROR:
            return Object.assign({}, state, { sendingRequest: false, errorMessage: action.payload })
        default:
            return state;
    }
}

const fileManagementReducer = (state = defaultFileManagementState, action) => {
    switch (action.type) {
        case actionTypes.SENDING_FILE_REQUEST:
            return Object.assign({}, state, {
                errorMessage: "",
                sendingRequest: true
            });
        case actionTypes.FILE_SELELCTED:
            return Object.assign({}, state, { errorMessage: "", sendingRequest: false, selectedFile: action.payload });
        case actionTypes.RESULT_RECEIVED:
            return getFileResultReceivedState(state, action);
        case actionTypes.FILE_UPLOADED:
            var newState = Object.assign({}, state.files, {
                errorMessage: "",
                sendingRequest: false,
                files: [...state.files, action.payload]
            });

            return newState;
        case actionTypes.FILE_RESULT_ERROR:
        case actionTypes.FILE_UPLOAD_ERROR:
            return Object.assign({}, state, {
                sendingRequest: false,
                errorMessage: action.payload
            });
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