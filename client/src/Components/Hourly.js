// Import react
import React from "react";
import { Row, Col } from "react-bootstrap";

// Import icons
import icons from "../assets/images/icons/icons";

const Hourly = (props) => {
  const d = new Date();
  const hourly = props.hourly.slice(1, 13);

  const list = hourly.map((item, index) => (
    <Col sm={1} key={index}>
      <Row className="text-center align-items-center">
        <Col>{d.getHours() + index + 1}:00</Col>
        <Col>
          <img width={32} src={icons[item.weather[0].icon]} alt="" />
        </Col>
        <Col className="fw-bold mt-sm-3">{Math.ceil(item.temp)}°</Col>
      </Row>
    </Col>
  ));

  return (
    <div className="App-Hourly mt-4">
      <Row>
        <Col>
          <p className="fs-5 fw-bold">Dự báo 12h tới</p>
        </Col>
      </Row>
      <Row className="mt-2">{list}</Row>
    </div>
  );
};

export default Hourly;
