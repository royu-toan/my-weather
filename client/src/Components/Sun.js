// Import react
import React from "react";
import { Row, Col, ProgressBar } from "react-bootstrap";

// Import icons
import icons from "../assets/images/icons/icons";

const Sun = (props) => {
  const sunrise = new Date(props.sun.sunrise * 1000);
  const sunset = new Date(props.sun.sunset * 1000);

  const d = new Date();
  let currentsun =
    ((d.getTime() - sunrise.getTime()) /
      (sunset.getTime() - sunrise.getTime())) *
    100;

  return (
    <Row className="App-Sun align-items-center mt-4">
      <Col sm={2} className="text-center">
        <img width={32} src={icons.sunrise} alt="sunrise" className="me-2" />
        {sunrise.getHours()}:{sunrise.getMinutes()}
      </Col>
      <Col sm={8}>
        <ProgressBar variant="warning" animated now={currentsun}></ProgressBar>
      </Col>
      <Col sm={2} className="text-center">
        {sunset.getHours()}:{sunset.getMinutes()}
        <img width={32} src={icons.sunset} alt="sunset" className="ms-2" />
      </Col>
    </Row>
  );
};

export default Sun;
