import { combineReducers } from 'redux'

function getStorateItem() {
    return localStorage.getItem('authToken');
}

const defaultFileManagementState = {
    selectedFile: null,
    files: [
        { id: "d5941e37-976b-4b91-a1de-4c62ece5ae17", name: "receipt.pdf", isLoaded: false, data: null },
        { id: "2e8e64ce-63d0-4650-8f19-c17a67296523", name: "agl_bill.pdf", isLoaded: false, data: null },
        { id: "76a9a736-19ec-4c16-aabb-4a08c7a6a1a3", name: "Sample_Invoice.pdf", isLoaded: false, data: null }
    ]
};

const authenticationReducer = (state = getStorateItem(), action) => {
    switch (action.type) {
        case "AUTHENTICATION_RESULT_RECEIVED":
        case "CLEAR_AUTH_TOKEN":
            return action.payload;
        default:
            return state;
    }
}

const fileManagementReducer = (state = defaultFileManagementState, action) => {
    switch (action.type) {
        case "FILE_SELELCTED":
            return Object.assign({}, state, {
                selectedFile: action.payload
            });
        case "RESULT_RECEIVED":
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
                files: files
            });
        case "FILE_UPLOADED":
            var newState = Object.assign({}, state.files, {
                files: [...state.files, action.payload]
            });

            return newState;
        default:
            return state;
    }
}

export default combineReducers({
    authToken: authenticationReducer,
    fileManagement: fileManagementReducer
});