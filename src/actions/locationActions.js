import AxiosConfig from "../HOC/AxiosConfig";
import {
  LOAD_LOCATIONS,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILED,
  LOAD_LOCATION_TIMESLOTS,
  LOAD_LOCATION_TIMESLOTS_SUCCESS,
  LOAD_LOCATION_TIMESLOTS_FAILED,
  SET_SELECTED_LOCATION,
  SAVE_CLIENT_LOCATION,
  SAVE_CLIENT_LOCATION_SUCCESS,
  SAVE_CLIENT_LOCATION_FAILED,
  SAVE_LOCATION_TIMESLOTS,
  SAVE_LOCATION_TIMESLOTS_SUCCESS,
  SAVE_LOCATION_TIMESLOTS_FAILED,
  INIT_ADD_CLIENT_LOCATION_FORM,
  INIT_EDIT_CLIENT_LOCATION_FORM,
  TOGGLE_LOCATION_TIMESLOT_STATUS,
  DEACTIVATE_ALL_TIMESLOTS,
  ACTIVATE_ALL_TIMESLOTS,
  UPDATE_LOCATION_TIMESLOTS_SUCCESS,
} from "./actionType";

export const getLocations = () => {
  return {
    type: LOAD_LOCATIONS,
  };
};

export const getLocationsSuccess = (data) => {
  return {
    type: LOAD_LOCATIONS_SUCCESS,
    payload: data,
  };
};

export const getLocationsFailed = (error) => {
  return {
    type: LOAD_LOCATIONS_FAILED,
    payload: error,
  };
};

export const getLocationRequest = (id) => {
  const data = {
    clientID: +id,
    clientName: "string",
  };
  return (dispatch) => {
    dispatch(getLocations());
    AxiosConfig.post("/Location/PostClientLocationsbyClient", data)
      .then((response) => {
        dispatch(getLocationsSuccess(response));
      })
      .catch((error) => {
        dispatch(getLocationsFailed(error));
      });
  };
};

/* Location Timeslots */
export const getLocationTimeslots = () => {
  return {
    type: LOAD_LOCATION_TIMESLOTS,
  };
};

export const getLocationTimeslotsSuccess = (data) => {
  return {
    type: LOAD_LOCATION_TIMESLOTS_SUCCESS,
    payload: data,
  };
};

export const updateLocationTimeslotsSuccess = () => {
  return {
    type: UPDATE_LOCATION_TIMESLOTS_SUCCESS,
  };
};

export const getLocationTimeslotsFailed = (error) => {
  return {
    type: LOAD_LOCATION_TIMESLOTS_FAILED,
    payload: error,
  };
};

export const getLocationTimeslotsRequest = (data) => {
  return (dispatch) => {
    dispatch(getLocationTimeslots());
    AxiosConfig.post("/TimeSlot/PostLocationTimeSlots", data)
      .then((response) => {
        dispatch(getLocationTimeslotsSuccess(response));
      })
      .catch((error) => {
        dispatch(getLocationTimeslotsFailed(error));
      });
  };
};

export const updateLocationTimeslotsRequest = (data) => {
  return (dispatch) => {
    AxiosConfig.post("/TimeSlot/PostUpdateLocationTimeSlots", data)
      .then((response) => {
        if (response.length > 0) {
          dispatch(getLocationTimeslots());
          dispatch(updateLocationTimeslotsSuccess());
        } else {
          dispatch(getLocationTimeslotsFailed("OOPS!Something went wrong"));
          alert("OOPS!Something went wrong");
        }
      })
      .catch((error) => {
        dispatch(getLocationTimeslotsFailed(error));
      });
  };
};

export const setSelectedLocation = (locationId) => {
  sessionStorage.setItem("selectedLocationId", locationId);
  return {
    type: SET_SELECTED_LOCATION,
    payload: locationId,
  };
};

export const saveClientLocation = () => {
  return {
    type: SAVE_CLIENT_LOCATION,
  };
};

export const saveClientLocationSuccess = (data) => {
  return {
    type: SAVE_CLIENT_LOCATION_SUCCESS,
    payload: data,
  };
};

export const saveClientLocationFailed = (error) => {
  return {
    type: SAVE_CLIENT_LOCATION_FAILED,
    payload: error,
  };
};

export const saveClientLocationRequest = (data) => {
  return (dispatch) => {
    dispatch(saveClientLocation());
    AxiosConfig.post("/Location/PostMergeClientLocation", data)
      .then((response) => {
        dispatch(saveClientLocationSuccess(response));
      })
      .catch((error) => {
        dispatch(saveClientLocationFailed(error));
      });
  };
};

export const saveLocationTimeslots = () => {
  return {
    type: SAVE_LOCATION_TIMESLOTS,
  };
};

export const saveLocationTimeslotsSuccess = (data) => {
  return {
    type: SAVE_LOCATION_TIMESLOTS_SUCCESS,
    payload: data,
  };
};

export const saveLocationTimeslotsFailed = (error) => {
  return {
    type: SAVE_LOCATION_TIMESLOTS_FAILED,
    payload: error,
  };
};

export const saveLocationTimeslotsRequest = (data) => {
  return (dispatch) => {
    dispatch(saveLocationTimeslots());
    AxiosConfig.post("/TimeSlot/PostAddBulkLocationTimeSlots", data)
      .then((response) => {
        dispatch(saveLocationTimeslotsSuccess(response));
      })
      .catch((error) => {
        dispatch(saveLocationTimeslotsFailed(error));
      });
  };
};

export const initAddClientLocationForm = () => {
  return {
    type: INIT_ADD_CLIENT_LOCATION_FORM,
  };
};

export const initEditClientLocationForm = () => {
  return {
    type: INIT_EDIT_CLIENT_LOCATION_FORM,
  };
};

export const toggleLocationTimeslotStatus = (id) => {
  return {
    type: TOGGLE_LOCATION_TIMESLOT_STATUS,
    payload: id,
  };
};

export const deactivateAllSlots = () => {
  return {
    type: DEACTIVATE_ALL_TIMESLOTS,
  };
};

export const activateAllSlots = () => {
  return {
    type: ACTIVATE_ALL_TIMESLOTS,
  };
};
