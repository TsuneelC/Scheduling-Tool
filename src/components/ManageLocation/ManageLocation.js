import React, { useEffect } from "react";

import LocationForm from "./LocationForm";

function ManageLocation(props) {
  const {
    vaccineTypes,
    editMode,
    selectedLocation,
    selectedClientId,
    saveClientLocation,
    saveLocationTimeslots,
    selectedLocationId
  } = props;

  useEffect(() => {
    props.loadVaccineTypes();
  }, []);

  if (!editMode) {
    return (
      <LocationForm
        vaccineTypes={vaccineTypes}
        editMode={editMode}
        selectedClientId={selectedClientId}
        selectedLocation={selectedLocation}
        saveClientLocation={saveClientLocation}
        saveLocationTimeslots={saveLocationTimeslots}
        selectedLocationId={selectedLocationId}
      />
    );
  }

  return editMode && selectedLocation ? (
    <LocationForm
      vaccineTypes={vaccineTypes}
      editMode={editMode}
      selectedClientId={selectedClientId}
      selectedLocation={selectedLocation}
      saveClientLocation={saveClientLocation}
      saveLocationTimeslots={saveLocationTimeslots}
      selectedLocationId={selectedLocationId}
    />
  ) : (
    <div>loading...</div>
  );
}

export default ManageLocation;
