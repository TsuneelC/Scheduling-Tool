import React from "react";
import { connect } from "react-redux";

import { getAvailableZipCodesRequest } from "../../actions/zipFileActions";

import ManageZipCodes from "./ManageZipCodes";

function mapStateToProps(state) {
  return {
    availableZipCodes: state.zipCodeReducer.availableZipCodes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAvailableZipCodes: () => dispatch(getAvailableZipCodesRequest()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageZipCodes);
