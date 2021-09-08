import React, { useEffect } from "react";

import { Modal } from "./modal.js";
import { NotesAndClarifications } from "./notesandclarifications.js";

import { conn } from "../store/connect";

const InfoModal = (props) => {
  const { infoModalActive } = props;
  const hideModal = () => {
    props.actions.setInfoModalActive(false);
  };

  return (
    <Modal active={infoModalActive} hideCallback={hideModal}>
      <div className="head-text-1">
        NYC LL97 Carbon Emissions Calculator
        <button className="modal-exit-btn" onClick={hideModal}>
          x
        </button>

      </div>

      <div className="instructions-container">

        <div className="head-text-2"> About</div>
        <div className="head-text-4">
          <p>
            This calculator estimates a building's carbon penalty as a result of{" "}
            <a
              href="https://be-exchange.org/insight/the-climate-mobilization-act-int-1253/"
              target="_blank"
              rel="noopener noreferrer"
            >
              NYC LL97
            </a>
            . Input annual utility information and building characteristics to
            generate emissions thresholds and resulting estimated penalties for
            three major penalty periods (2024-2029, 2030-2034, and 2035 and
            later).
          </p>
          <p>
            This calculator is one tool in a
            <a
              href="https://be-exchange.org/climate-mobilization-act-series/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              suite of resources{" "}
            </a>
            developed by the Building Energy Exchange in partnership with the
            NYC Accelerator to help demystify the Climate Mobilization Act and
            connect our community to solutions. The calculator engine was
            developed by AKF Group LLC with UX/UI design by Jessica Celano.
          </p>

          <p>
            This application is optimized for Google Chrome. If experiencing
            issues with a different browser, please try again using Chrome.
          </p>
        </div>
      </div>

      <div className="instructions-container">
        <div className="head-text-2"> Instructions</div>

        <div className="head-text-4">
          Users can either load building data or enter manually, following the
          steps below.
        </div>

        <ul className="head-text-4">
          <li>
            Select occupancy type(s) and input area(s). Occupancy types
            correspond to occupancy classes found in the NYC Building Code. To
            add more than one occupancy type use the "Add Occupancy Type"
            button.
          </li>
          <li>
            Enter your annual consumption per fuel source for the entire
            building.
          </li>
          <li>
            Enter your annual utility rate for each fuel source (total annual
            utility cost divided by total annual consumption) or click "USE
            DEFAULT RATES" to pre-populate the form with NYC average rates for
            typical commercial buildings.
          </li>
          <li>
            If the above data are unavailable, click the “LOAD” button and
            search for your building to populate the calculator with publicly
            available data found in NYC’s LL84 Benchmarking Database.
          </li>
        </ul>
      </div>
      <div className="notes-clarifications-container">
        <div className="head-text-2">Notes and Clarifications</div>
        <NotesAndClarifications />
      </div>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return {
    infoModalActive: state.ui.infoModalActive,
  };
};

export default conn(mapStateToProps)(InfoModal);
