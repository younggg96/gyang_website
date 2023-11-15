// import localforage from "localforage";
import { useEffect, useLayoutEffect, useReducer } from "react";
import { createContext } from "react";
import axios from "axios";
import { TIME, TYPE, useToast } from "../ui/GyToast/ToastProvider";
import { identifyUser } from "../api/user";

const AUTH_TYPE = {
  INITIALIZE: "INITIALIZE",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};
const initState = { isAuth: false, isInitialized: false, user: null };

const AuthContext = createContext({
  ...initState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

const authReducer = (state, action) => {
  const { isAuth, user } = action.payload;
  switch (action.type) {
    case AUTH_TYPE.INITIALIZE:
      return {
        ...state,
        isAuth,
        isInitialized: true,
        user,
      };
    case AUTH_TYPE.LOGIN:
      return {
        ...state,
        isAuth: true,
        user,
      };
    case AUTH_TYPE.LOGOUT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error("[AuthProvider] Action type is not exist.");
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common.Authorization;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);
  const { addToast } = useToast();

  useLayoutEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setSession(token);
        try {
          const { data } = await identifyUser();
          if (data.identified) {
            dispatch({
              type: AUTH_TYPE.INITIALIZE,
              payload: {
                isAuth: true,
                user: data.user,
              },
            });
          }
        } catch (error) {
          dispatch({
            type: AUTH_TYPE.INITIALIZE,
            payload: {
              isAuth: false,
              user: null,
            },
          });
        }
      } else {
        dispatch({
          type: AUTH_TYPE.INITIALIZE,
          payload: {
            isAuth: false,
            user: null,
          },
        });
      }
    };
    init();
  }, []);

  const login = (accessToken, user) => {
    setSession(accessToken);
    dispatch({
      type: AUTH_TYPE.LOGIN,
      payload: {
        user,
      },
    });
  };

  const logout = () => {
    setSession(null);
    addToast({
      content: "Sign out succeeded!",
      time: TIME.SHORT,
      type: TYPE.SUCCESS,
    });
    dispatch({
      type: AUTH_TYPE.LOGOUT,
      payload: {
        isAuth: false,
        user: null,
      },
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, setSession };
export default AuthContext;
