import AxiosConfig from "../HOC/AxiosConfig";

import {
  LOAD_CLIENTS,
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_FAILED,
  SET_SELECTED_CLIENT,
} from "./actionType";

export const getClients = () => {
  return {
    type: LOAD_CLIENTS,
  };
};

export const getClientsSuccess = (data) => {
  return {
    type: LOAD_CLIENTS_SUCCESS,
    payload: data,
  };
};

export const getClientsFailed = (error) => {
  return {
    type: LOAD_CLIENTS_FAILED,
    payload: error,
  };
};

export const getClientRequest = () => {
  return (dispatch) => {
    dispatch(getClients());
    AxiosConfig.get("Common/GetAllClients")
      .then((response) => {
        dispatch(getClientsSuccess(response));
      })
      .catch((error) => {
        dispatch(getClientsFailed(error));
      });
  };
};

export const setSelectedClient = (clientId) => {
  sessionStorage.setItem("selectedClientId", clientId);
  return {
    type: SET_SELECTED_CLIENT,
    payload: clientId,
  };
};
