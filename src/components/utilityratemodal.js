import React, { useEffect, useRef } from "react";
import { Modal } from "./modal.js";
import { conn } from "../store/connect";

const UtilityRateModal = (props) => {
  const { utilityRateModalActive } = props;

  const hideModal = () => {
    props.actions.setUtilityRateModalActive(false);
  };

  return (
    <Modal active={utilityRateModalActive} hideCallback={hideModal}>
      <div>
        <div className="head-text-1">
          Default Utility Rate Information
          <button className="modal-exit-btn" onClick={hideModal}>
            x
          </button>
        </div>
      </div>

      <div className="load-modal-body">
        <div>
          <p>
            This calculator provides default NYC utility rates as a convenience
            for contextualizing LL97 penalties as fractions of overall operating
            cost. These are "virtual" utility rates, equivalent to the total
            annual utility cost divided by the total annual consumption (i.e.,
            $/kWh, $/therm, etc) for that fuel source.
          </p>
          <p>
            Actual rates will vary according to individual rate structure,
            demand charges, and fluctuations in energy cost. The default rates
            shown below and used in the calculator are reflective of NYC
            averages for typical commercial buildings.
          </p>
          <ul>
            <li>Electricity: $0.22/kWh</li>
            <li>Natural Gas: $0.997/therm</li>
            <li>District Steam: $35/MMBtu</li>
            <li>Fuel Oil #2: $1.65/gal</li>
            <li>Fuel Oil #4: $1.65/gal</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    utilityRateModalActive: state.ui.utilityRateModalActive,
  };
};

export default conn(mapStateToProps)(UtilityRateModal);
