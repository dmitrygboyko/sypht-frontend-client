import api from '../api'

export const authenticate = (clientId, clientSecret) => async dispatch => {
  const authResult = await api.post('/authenticate', {
    "clientId": clientId,
    "clientSecret": clientSecret
  });

  dispatch({
    type: 'AUTHENTICATION_RESULT_RECEIVED',
    payload: authResult.data.access_token
  });
};

export const clearAuthToken = () => dispatch => {
  dispatch({
    type: 'CLEAR_AUTH_TOKEN',
    payload: ""
  });
};

export const selectFile = (fileId, files) => dispatch => {
  const selectedFile = files.find(x => x.id == fileId);

  dispatch({
    type: 'FILE_SELELCTED',
    payload: selectedFile
  });
};

export const getFileResults = (fileId, authToken) => async dispatch => {
  api.defaults.headers.common = { 'Authorization': `Bearer ${authToken}` }
  const fileResults = await api.get(`/results/${fileId}`);

  dispatch({
    type: 'RESULT_RECEIVED',
    payload: {
      fileId: fileId,
      data: fileResults.data
    }
  });
};

export const uploadFile = (authToken, file) => async dispatch => {
  let formData = new FormData();
  formData.append('fileToUpload', file);
  formData.append('fieldSets', JSON.stringify(['sypht.invoice', 'sypht.document']));

  let { data } = await api.post('/fileupload', formData, {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data'
    }
  });

  dispatch({
    type: "FILE_UPLOADED",
    payload: {
      name: file.name,
      id: data.fileId
    }
  });
};