import React from "react";
import { connect } from "react-redux";

import LocationList from "./LocationList";
import {
  getClientRequest,
  setSelectedClient,
} from "../../actions/clientActions";
import {
  getLocationRequest,
  setSelectedLocation,
  initAddClientLocationForm,
} from "../../actions/locationActions";

function mapStateToProps(state) {
  return {
    clients: state.clientReducer.clients,
    selectedClientId: state.clientReducer.selectedClientId,
    selectedClient:
      state.clientReducer.clients.length > 0
        ? state.clientReducer.clients.find(
            (c) => c.clientID == state.clientReducer.selectedClientId
          )
        : {},
    locations: state.locationReducer.locations,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadClients: () => dispatch(getClientRequest()),
    setSelectedClient: (id) => dispatch(setSelectedClient(id)),
    loadLocations: (id) => dispatch(getLocationRequest(id)),
    setSelectedLocation: (id) => dispatch(setSelectedLocation(id)),
    initAddClientLocationForm: () => dispatch(initAddClientLocationForm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
