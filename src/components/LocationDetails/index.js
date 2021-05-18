import React from "react";
import { connect } from "react-redux";

import LocationDetails from "./LocationDetails";
import Modal from "../Common/Modal";
import Warning from "../Common/Warning";

import { getVaccineTypesRequest } from "../../actions/vaccineTypeActions";

import {
  getLocationRequest,
  initEditClientLocationForm,
  toggleLocationTimeslotStatus,
  saveLocationTimeslotsSuccess,
  getLocationTimeslotsRequest,
  deactivateAllSlots,
  activateAllSlots,
  updateLocationTimeslotsRequest
} from "../../actions/locationActions";

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
    locations: state.locationReducer.locations,
    locationTimeslots: state.locationReducer.locationTimeslots,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadLocations: (id) => dispatch(getLocationRequest(id)),
    loadVaccineTypes: () => dispatch(getVaccineTypesRequest()),
    initEditClientLocationForm: () => dispatch(initEditClientLocationForm()),
    deactivateAllSlots: () => dispatch(deactivateAllSlots()),
    activateAllSlots: () => dispatch(activateAllSlots()),
    toggleLocationTimeslotStatus: (id) =>
      dispatch(toggleLocationTimeslotStatus(id)),
    saveLocationTimeslotsSuccess: (data) =>
      dispatch(saveLocationTimeslotsSuccess(data)),
    getLocationTimeslotsRequest: (data) =>
      dispatch(getLocationTimeslotsRequest(data)),
    updateLocationTimeslotsRequest: (data) => dispatch(updateLocationTimeslotsRequest(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetails);
