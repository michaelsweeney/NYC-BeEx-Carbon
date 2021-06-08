import React from "react";

const Footer = (props) => {
  const retrofiturl =
    "https://www1.nyc.gov/site/nycaccelerator/index.page?utm_source=BEEx&utm_medium=LL97_Calc&utm_campaign=Evergreen";
  const akfurl = "http://www.akfgroup.com";

  return (
    <div className="footer">
      <div className="footer-left">
        <p>
          What now? Visit{" "}
          <a href={retrofiturl} target="_blank" rel="noopener noreferrer">
            NYC Accelerator
          </a>{" "}
          for free, personalized advisory services to improve building energy
          efficiency and lower carbon emissions.
        </p>
      </div>
      <div className="footer-right">
        <p>
          <a href={akfurl} target="_blank" rel="noopener noreferrer">
            Calculator engine by AKF Group LLC
          </a>
        </p>
      </div>
    </div>
  );
};

export { Footer };
