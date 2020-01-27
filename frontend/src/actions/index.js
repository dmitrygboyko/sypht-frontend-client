import api from '../api'

export const authenticate = () => async dispatch => {
  const authResult = await api.post('/authenticate');

  dispatch({
    type: 'AUTHENTICATE',
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