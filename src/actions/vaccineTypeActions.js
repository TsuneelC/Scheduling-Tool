import AxiosConfig from "../HOC/AxiosConfig";
import {
  LOAD_VACCINE_TYPES,
  LOAD_VACCINE_TYPES_SUCCESS,
  LOAD_VACCINE_TYPES_FAILED,
} from "./actionType";

export const getVaccineTypes = () => {
  return {
    type: LOAD_VACCINE_TYPES,
  };
};

export const getVaccineTypesSuccess = (data) => {
  return {
    type: LOAD_VACCINE_TYPES_SUCCESS,
    payload: data,
  };
};

export const getVaccineTypesFailed = (error) => {
  return {
    type: LOAD_VACCINE_TYPES_FAILED,
    payload: error,
  };
};

export const getVaccineTypesRequest = () => {
  return (dispatch) => {
    dispatch(getVaccineTypes());
    AxiosConfig.get("/Common/GetAllVaccineTypes")
      .then((response) => {
        dispatch(getVaccineTypesSuccess(response));
      })
      .catch((error) => {
        dispatch(getVaccineTypesFailed(error));
      });
  };
};
