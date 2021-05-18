import AxiosConfig from "../HOC/AxiosConfig";
import {
  LOAD_ZIP_AVAILABLE_CODES,
  LOAD_ZIP_AVAILABLE_CODES_SUCCESS,
  LOAD_ZIP_AVAILABLE_CODES_FAILED,
} from "./actionType";

export const getAvailableZipCodes = () => {
  return {
    type: LOAD_ZIP_AVAILABLE_CODES,
  };
};

export const getAvailableZipCodesSuccess = (data) => {
  return {
    type: LOAD_ZIP_AVAILABLE_CODES_SUCCESS,
    payload: data,
  };
};

export const getAvailableZipCodesFailed = (error) => {
  return {
    type: LOAD_ZIP_AVAILABLE_CODES_FAILED,
    payload: error,
  };
};

export const getAvailableZipCodesRequest = () => {
  return (dispatch) => {
    dispatch(getAvailableZipCodes());
    AxiosConfig.get("Common/GetAllAvailableZipCodes")
      .then((response) => {
        dispatch(getAvailableZipCodesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAvailableZipCodesFailed(error));
      });
  };
};
