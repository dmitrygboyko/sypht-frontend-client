import api from '../api'

export const authenticate = (clientId, clientSecret) => async dispatch => {
  const postedData = {
    "clientId": clientId,
    "clientSecret": clientSecret
  };

  await api.post('/authenticate', postedData)
    .then(data => {
      dispatch({
        type: 'AUTHENTICATION_RESULT_RECEIVED',
        payload: data.data.access_token
      });
    })
    .catch(error => {
      dispatch({
        type: 'AUTHENTICATION_ERROR',
        payload: getResponseError(error)
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
  await api.get(`/results/${fileId}`)
    .then(data => {
      dispatch({
        type: 'RESULT_RECEIVED',
        payload: {
          fileId: fileId,
          data: data.data
        }
      });
    })
    .catch(error => {
      dispatch({
        type: 'FILE_RESULT_ERROR',
        payload: getResponseError(error)
      });
    });
};

export const uploadFile = (accessToken, file) => async dispatch => {
  let formData = new FormData();
  formData.append('fileToUpload', file);
  formData.append('fieldSets', JSON.stringify(['sypht.invoice', 'sypht.document']));

  await api.post('/fileupload', formData, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(data => {
    dispatch({
      type: "FILE_UPLOADED",
      payload: {
        name: file.name,
        id: data.data.fileId
      }
    });
  })
  .catch(error => {
    dispatch({
      type: 'FILE_UPLOAD_ERROR',
      payload: getResponseError(error)
    });
  });;
};

const getResponseError = (error) => `Error occured: ${error.message}`;
