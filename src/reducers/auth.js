import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };

  export default function(state = initialState, action) {
      const { type, payload } = action;

      switch (type) {
          case USER_LOADED:
              return {
                  ...state,
                  isAuthenticated: true,
                  loading: false,
                  user: payload
              };
            case REGISTER_SUCCESS:
                localStorage.removeItem('token', payload.token);
                return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false
                };
            case REGISTER_FAIL:
            case AUTH_ERROR:
            case LOGIN_FAIL:
            case LOGOUT:
                localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false
                };
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false
                };
            default:
                return state;
      }
  }