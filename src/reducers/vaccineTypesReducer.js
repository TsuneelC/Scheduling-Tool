import {
  LOAD_VACCINE_TYPES,
  LOAD_VACCINE_TYPES_SUCCESS,
  LOAD_VACCINE_TYPES_FAILED,
} from "../actions/actionType";

const INITIAL_STATE = {
  vaccineTypes: [],
  loading: false,
  loaded: false,
  error: null,
};
const vaccineTypesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_VACCINE_TYPES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_VACCINE_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        vaccineTypes: action.payload,
      };
    case LOAD_VACCINE_TYPES_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default vaccineTypesReducer;
