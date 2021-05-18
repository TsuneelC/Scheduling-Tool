import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import locationReducer from "./locationReducer";
import vaccineTypesReducer from "./vaccineTypesReducer";
import zipCodeReducer from "./zipCodeReducer";

export default combineReducers({
  clientReducer,
  vaccineTypesReducer,
  locationReducer,
  zipCodeReducer,
});
