import axios from 'axios'

export const authenticate = () => async dispatch => {
    const authResult = await axios.post('http://localhost:3001/authenticate');
  
    dispatch({
        type: 'AUTHENTICATE',
        payload: authResult
    });
  };