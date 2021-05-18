import {
  LOAD_CLIENTS,
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_FAILED,
  SET_SELECTED_CLIENT,
} from "../actions/actionType";

const selectedClientId = sessionStorage.getItem("selectedClientId");

const INITIAL_STATE = {
  clients: [],
  selectedClientId: selectedClientId || "",
  loading: false,
  loaded: false,
  error: null,
};
const clientReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CLIENTS:
      return {
        ...state,
        loading: true,
      };
    case LOAD_CLIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        clients: action.payload,
      };
    case LOAD_CLIENTS_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    case SET_SELECTED_CLIENT:
      return {
        ...state,
        selectedClientId: action.payload,
      };
    default:
      return state;
  }
};

export default clientReducer;
