import api from '../api'

export const authenticate = (clientId, clientSecret) => async dispatch => {
  await api.post('/authenticate', {
    "clientId": clientId,
    "clientSecret": clientSecret
  })
  .then(data => {
    dispatch({
      type: 'AUTHENTICATION_RESULT_RECEIVED',
      payload: data.data.access_token
    });
  })
  .catch(function (error) {
    dispatch({
      type: 'AUTHENTICATION_ERROR',
      payload: `Error: ${error.response.status} ${error.response.statusText}`
    });
  });
};

export const clearAccessToken = () => dispatch => {
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

export const getFileResults = (fileId, accessToken) => async dispatch => {
  api.defaults.headers.common = { 'Authorization': `Bearer ${accessToken}` }
  const fileResults = await api.get(`/results/${fileId}`);

  dispatch({
    type: 'RESULT_RECEIVED',
    payload: {
      fileId: fileId,
      data: fileResults.data
    }
  });
};

export const uploadFile = (accessToken, file) => async dispatch => {
  let formData = new FormData();
  formData.append('fileToUpload', file);
  formData.append('fieldSets', JSON.stringify(['sypht.invoice', 'sypht.document']));

  let { data } = await api.post('/fileupload', formData, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
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