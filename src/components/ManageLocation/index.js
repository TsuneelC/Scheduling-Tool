import React from "react";
import { connect } from "react-redux";

import { getVaccineTypesRequest } from "../../actions/vaccineTypeActions";
import {
  saveClientLocationRequest,
  saveLocationTimeslotsRequest,
} from "../../actions/locationActions";

import ManageLocation from "./ManageLocation";

function mapStateToProps(state) {
  return {
    vaccineTypes: state.vaccineTypesReducer.vaccineTypes,
    selectedClientId: state.clientReducer.selectedClientId,
    selectedLocationId: state.locationReducer.selectedLocationId,
    selectedLocation:
      state.locationReducer.locations.length > 0
        ? state.locationReducer.locations.find(
            (c) =>
              c.clientLocationID == state.locationReducer.selectedLocationId
          )
        : {},
    editMode: state.locationReducer.selectedLocationId ? true : false,
    // locations: state.locationReducer.locations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadVaccineTypes: () => dispatch(getVaccineTypesRequest()),
    saveClientLocation: (data) => dispatch(saveClientLocationRequest(data)),
    saveLocationTimeslots: (data) =>
      dispatch(saveLocationTimeslotsRequest(data)),
    
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLocation);
