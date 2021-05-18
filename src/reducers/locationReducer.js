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
  UPDATE_LOCATION_TIMESLOTS_SUCCESS
} from "../actions/actionType";
import { deactivateAllSlots } from "../actions/locationActions";

const selectedLocationId = sessionStorage.getItem("selectedLocationId");

const INITIAL_STATE = {
  locations: [],
  locationTimeslots: [],
  changes: {},
  selectedLocationId: selectedLocationId ? selectedLocationId : null,
  loading: false,
  loaded: false,
  error: null,
};
const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_LOCATIONS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        locations: action.payload,
      };
    case LOAD_LOCATIONS_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case LOAD_LOCATION_TIMESLOTS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_LOCATION_TIMESLOTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        locationTimeslots: action.payload,
        changes: {},
      };
      case UPDATE_LOCATION_TIMESLOTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        changes: {},
      };
    case LOAD_LOCATION_TIMESLOTS_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocationId: action.payload,
      };
    case INIT_ADD_CLIENT_LOCATION_FORM:
      return {
        ...state,
        selectedLocationId: null,
      };
    case INIT_EDIT_CLIENT_LOCATION_FORM:
      return {
        ...state,
        selectedLocationId: null,
      };
    case SAVE_CLIENT_LOCATION:
      return {
        ...state,
        loading: true,
      };
    case SAVE_CLIENT_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case SAVE_CLIENT_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case SAVE_LOCATION_TIMESLOTS:
      return {
        ...state,
        loading: true,
      };
    case SAVE_LOCATION_TIMESLOTS_SUCCESS:
      return {
        ...state,
        locationTimeslots: [...action.payload],
        loading: false,
        loaded: true,
      };
    case SAVE_LOCATION_TIMESLOTS_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case TOGGLE_LOCATION_TIMESLOT_STATUS:
      const currentId = action.payload;
      const currentTimeslot = state.locationTimeslots.find(
        (t) => t.locationTimeslotID === currentId
      );
      return {
        ...state,
        changes: {
          ...state.changes,
          [currentId]: {
            clientLocationID: currentTimeslot.clientLocationID,
            locationTimeslotID: currentTimeslot.locationTimeslotID,
            maxCapacity: currentTimeslot.maxCapacity,
            isActive: !currentTimeslot.isActive,
          },
        },
        locationTimeslots: state.locationTimeslots.map((item) => {
          if (item.locationTimeslotID === currentId) {
            return {
              ...item,
              isActive: !item.isActive,
            };
          } else {
            return item;
          }
        }),
      };

    case DEACTIVATE_ALL_TIMESLOTS:
      return {
        ...state,
        changes: {
          ...state.changes,
        },
        locationTimeslots: state.locationTimeslots.map((item) => {
          return {
            ...item,
            isActive: false,
          };
        }),
      };

    case ACTIVATE_ALL_TIMESLOTS:
      return {
        ...state,
        changes: {
          ...state.changes,
        },
        locationTimeslots: state.locationTimeslots.map((item) => {
          return {
            ...item,
            isActive: true,
          };
        }),
      };

    default:
      return state;
  }
};

export default locationReducer;
