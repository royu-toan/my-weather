// Import react
import React from "react";
import { Card, Row, Col, Media } from "react-bootstrap";

// Import icons
import icons from "../assets/images/icons/icons";

const Overview = (props) => {
  const weather = props.weather;

  const today = new Date();
  const time = {
    year: today.getFullYear(),
    month: ("0" + (today.getMonth() + 1)).slice(-2),
    date: ("0" + today.getDate()).slice(-2),
    hours: today.getHours(),
    minutes: ("0" + today.getMinutes()).slice(-2)
  };

  return (
    <Card className="App-Overview mt-4">
      <Card.Body>
        <Row className="align-items-end">
          <Col sm={8}>
            <Card.Title>Thời tiết {weather.localName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {time.date}/{time.month}/{time.year}&nbsp;
              {time.hours}:{time.minutes}&nbsp;
              {time.hours >= 12 ? "PM" : "AM"}
            </Card.Subtitle>
            <Card.Title className="fs-1 fw-bold">{weather.temp}°</Card.Title>
            <Card.Text>
              Cảm giác như&nbsp;
              <span className="fs-4 fw-bold">{weather.feels_like}°</span>
            </Card.Text>
          </Col>
          <Col sm={4} className="text-center">
            <Media>
              <img
                width={100}
                src={icons[weather.icon]}
                alt={weather.description}
              />
            </Media>
            <Card.Text className="fs-5 text-capitalize">
              {weather.description}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Overview;
