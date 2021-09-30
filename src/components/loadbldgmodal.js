import React, { useEffect, useRef } from "react";
import { Modal } from "./modal.js";
import { handleResponse, parseResponse } from "./soqlquery.js";
import { LoadBldgResultsTable } from "./loadbldgresultstable";

import { conn } from "../store/connect";

const LoadBldgModal = (props) => {
  const {
    loadInputValue,
    loadInputResponse,
    loadTableData,
    loadBldgModalActive,
    isLoadedError,
  } = props;

  const inputref = useRef(null);

  useEffect(() => {
    inputref.current.focus();
  }, [loadBldgModalActive]);

  const hideModal = () => {
    props.actions.setLoadBldgModalActive(false);
  };

  const handleChange = (e) => {
    props.actions.setLoadInputValue(e.target.value);
    handleResponse(e.target.value, props.actions.setLoadInputResponse);
  };

  const handleLoad = (bldginfo) => {
    let formatted_bldg = parseResponse(bldginfo);
    props.actions.setLoadInputSelection(bldginfo);
    props.actions.setIsLoadMode(true);
    props.actions.setIsDemoMode(false);
    props.actions.setBuilding(formatted_bldg);
    props.actions.setIsDefaultRates(true);
    props.actions.useDefaultRates();
    props.actions.setLoadConfirmDialogActive(true);
    hideModal();
  };

  useEffect(() => {
    if ("errorCode" in loadInputResponse) {
      props.actions.setIsLoadedError(true);
    } else {
      props.actions.setIsLoadedError(false);
      let formatted = loadInputResponse.map((res) => {
        return {
          Name: res.property_name,
          BBL: res.nyc_borough_block_and_lot,
          BIN: res.nyc_building_identification,
          "Property Type 1": res.largest_property_use_type,
          "Property Type 2": res._2nd_largest_property_use,
          "Property Type 3": res._3rd_largest_property_use,
        };
      });
      props.actions.setLoadTableData(formatted);
    }
  }, [loadInputResponse, props.actions]);

  return (
    <Modal active={loadBldgModalActive} hideCallback={hideModal}>
      <div>
        <div className="head-text-1">
          Building Utility Info Loader
          <button className="modal-exit-btn" onClick={hideModal}>
            x
          </button>
        </div>
      </div>

      <div className="load-modal-body">
        <div>
          <p>
            This form allows for querying NYC's "Energy and Water Data
            Disclosure for Local Law 84 2020 (Data for Calendar Year 2019)"
            database. The form loads and translates building utility
            information, either using the property's BBL number, address, or
            property name (searches are case sensitive).
          </p>
          <p>
            Data loaded using this form should be verified with building
            utility consumption and gross square footage.
          </p>
        </div>
        <div>
          <span className="head-text-3">
            Input BBL ID Number, Property Name, or Address (case sensitive)
          </span>
        </div>
        <input
          ref={inputref}
          className="bldg-input"
          value={loadInputValue}
          onChange={handleChange}
        />

        <LoadBldgResultsTable
          loadTableData={loadTableData}
          handleLoad={handleLoad}
          loadInputResponse={loadInputResponse}
          isLoadedError={isLoadedError}
        />
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    loadInputValue: state.ui.loadInputValue,
    loadInputResponse: state.ui.loadInputResponse,
    loadTableData: state.ui.loadTableData,
    loadBldgModalActive: state.ui.loadBldgModalActive,
    isDemoMode: state.ui.isDemoMode,
    isLoadMode: state.ui.isLoadMode,
    isLoadedError: state.ui.isLoadedError,
  };
};

export default conn(mapStateToProps)(LoadBldgModal);
