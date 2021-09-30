import React from "react";
import { Modal } from "./modal.js";

import { conn } from "../store/connect";
import { translateBuildingType } from "./ll84buildingtypelookup";

const LoadConfirmDialog = (props) => {
  const { loadConfirmDialogActive, loadInputSelection, inputs } = props;

  const hideDialog = () => {
    props.actions.setLoadConfirmDialogActive(false);
  };

  const getConvertedTypes = () => {
    let type1 = translateBuildingType(
      loadInputSelection["largest_property_use_type"]
    );
    let type2 = translateBuildingType(
      loadInputSelection["_2nd_largest_property_use"]
    );
    let type3 = translateBuildingType(
      loadInputSelection["_3rd_largest_property_use"]
    );

    let type1_ll84 = type1.ll84;
    let type2_ll84 = type2.ll84;
    let type3_ll84 = type3.ll84;

    let type1_ll97 = type1.ll97_long;
    let type2_ll97 = type2.ll97_long;
    let type3_ll97 = type3.ll97_long;
    let type1_ll97_area = inputs.types[1] ? inputs.types[1].area : undefined;
    let type2_ll97_area = inputs.types[2] ? inputs.types[2].area : undefined;
    let type3_ll97_area = inputs.types[3] ? inputs.types[3].area : undefined;

    return {
      1: {
        ll84: type1_ll84,
        ll97: type1_ll97,
        area: type1_ll97_area,
      },
      2: {
        ll84: type2_ll84,
        ll97: type2_ll97,
        area: type2_ll97_area,
      },
      3: {
        ll84: type3_ll84,
        ll97: type3_ll97,
        area: type3_ll97_area,
      },
    };
  };

  const keyNameLookup = {
    property_name: "Property Name",
    property_id: "Property ID",
    nyc_borough_block_and_lot: "BBL ID (10 digit)",
    nyc_building_identification: "NYC Building Identification Number (BIN)",
    largest_property_use_type_1: "Property Type 1 Area",
    largest_property_use_type: "Property Type 1",
    _2nd_largest_property_use: "Property Type 2 Area",
    _2nd_largest_property_use_1: "Property Type 2",
    _3rd_largest_property_use: "Property Type 3 Area",
    _3rd_largest_property_use_1: "Property Type 3",
    fuel_oil_2_use_kbtu: "Fuel Oil Two Use (kBtu)",
    fuel_oil_4_use_kbtu: "Fuel Oil Four Use (kBtu)",
    district_steam_use_kbtu: "District Steam Use (kBtu)",
    natural_gas_use_kbtu: "Natural Gas Use (kBtu)",
    electricity_use_grid_purchase: "Electricity Purchased From Grid (kBtu)",
  };

  const LoadMarkup = (
    <ul>
      {Object.keys(loadInputSelection).map((e, i) => {
        const keyName = keyNameLookup[e];
        const val = loadInputSelection[e];
        if ((val !== "Not Available") & (val !== 0)) {
          return (
            <li key={i}>
              {keyName}: {val}
            </li>
          );
        } else {
          return "";
        }
      })}
    </ul>
  );

  const typemap = getConvertedTypes();
  const TypeMapMarkup = Object.keys(typemap).map((d, i) => {
    let ll84type = typemap[d].ll84;
    let ll97type = typemap[d].ll97;
    let area = typemap[d].area;
    if (area === undefined) {
      return "";
    } else {
      return (
        <li key={i}>
          LL84 Building Type <u>{ll84type}</u> ({area} SF) mapped to{" "}
          <u>{ll97type}</u>
        </li>
      );
    }
  });

  return (
    <Modal active={loadConfirmDialogActive} hideCallback={hideDialog}>
      <div className="head-text-1">
        Loaded Building Data Summary for {loadInputSelection.property_name}
        <button className="modal-exit-btn" onClick={hideDialog}>
          x
        </button>
      </div>
      <div className="load-modal-body">
        <div className="head-text-3">
          The following info has been loaded from the NYC LL84 Database. Note
          that inputs should be verified by the building owner / stakeholder for
          accuracy.
        </div>
        <div className="head-text-4">{LoadMarkup}</div>
        <div className="head-text-3">
          Because property use types in LL84 do not align with occupancy classes
          referenced in LL97, an attempt has been made to correlate the loaded
          building's LL84 property use to the closest LL97 type:
        </div>

        <div className="head-text-4">
          <ul>{TypeMapMarkup}</ul>
        </div>
        <div className="head-text-3">
          Please verify the above mapping and make any changes necessary to
          areas and utility consumption in the "Building Inputs" section of the
          calculator.
        </div>
        <div className="ok-dialog-btn-container">
          <button
            style={{ height: "42px" }}
            className="ok-dialog-btn"
            onClick={hideDialog}
          >
            OK
          </button>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    loadConfirmDialogActive: state.ui.loadConfirmDialogActive,
    loadInputSelection: state.ui.loadInputSelection,
    loadedBuildingTypes: state.building.loadedBuildingTypes,
    building: state.building.compiled,
    inputs: state.building.inputs,
  };
};

export default conn(mapStateToProps)(LoadConfirmDialog);
