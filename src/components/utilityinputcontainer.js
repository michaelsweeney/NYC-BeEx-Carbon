import React from "react";
import { makeStyles } from "@material-ui/core";
import { conn } from "../store/connect";
import UtilityInput from "./utilityinput.js";

const useStyles = makeStyles({
  root: {},
  defaultRateText: {
    cursor: "pointer",
    color: "blue",
  },
});

const UtilityInputContainer = (props) => {
  const { isDefaultRates } = props;
  const classes = useStyles();

  const setDefaultRates = () => {
    if (isDefaultRates) {
      props.actions.setIsDefaultRates(false);
      props.actions.useNullRates();
    } else {
      props.actions.setIsDefaultRates(true);
      props.actions.useDefaultRates();
    }
  };

  const toggleDefaultRateInfo = () => {
    props.actions.setUtilityRateModalActive(true);
  };

  return (
    <>
      <div className="default-rate-checkbox head-text-4">
        <input
          type="checkbox"
          checked={isDefaultRates}
          onChange={setDefaultRates}
        />
        <div className="head-text-4">
          <span>Use Default Rates</span>

          <span
            onClick={toggleDefaultRateInfo}
            className={classes.defaultRateText}
          >
            {" "}
            <u>?</u>
          </span>
        </div>
      </div>
      <div className="utility-input-main-container">
        <UtilityInput
          title="Electricity"
          cons_title="kWh"
          utiltag="elec"
          cost_title="$/kWh"
        />
        <UtilityInput
          title="Natural Gas"
          cons_title="therms"
          utiltag="gas"
          cost_title="$/therm"
        />
        <UtilityInput
          title="Steam"
          cons_title="mLbs"
          utiltag="steam"
          cost_title="$/mLb"
        />
        <UtilityInput
          title="Fuel Oil 2"
          cons_title="gal"
          utiltag="fuel_two"
          cost_title="$/gal"
        />
        <UtilityInput
          title="Fuel Oil 4"
          cons_title="gal"
          utiltag="fuel_four"
          cost_title="$/gal"
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    inputs: state.building.inputs,
    isDefaultRates: state.building.isDefaultRates,
  };
};

export default conn(mapStateToProps)(UtilityInputContainer);
