import {
  LOAD_ZIP_AVAILABLE_CODES,
  LOAD_ZIP_AVAILABLE_CODES_SUCCESS,
  LOAD_ZIP_AVAILABLE_CODES_FAILED,
} from "../actions/actionType";
import { AVAILABLE_ZIP_CODES } from "../mock/zipcodes.mock";

const INITIAL_STATE = {
  availableZipCodes: [],
  loading: false,
  loaded: false,
  error: null,
};
const zipCodeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ZIP_AVAILABLE_CODES:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ZIP_AVAILABLE_CODES_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        availableZipCodes: action.payload,
      };
    case LOAD_ZIP_AVAILABLE_CODES_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        availableZipCodes: AVAILABLE_ZIP_CODES,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default zipCodeReducer;
