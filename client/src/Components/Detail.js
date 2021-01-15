// Import react
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

// Import icons
import icons from "../assets/images/icons/icons";

const Detail = (props) => {
  const weather = props.weather;

  const detailItems = [
    {
      icon: icons.thermometer,
      name: "Cao/Thấp",
      value: (
        <span>
          {weather.temp_max}°/{weather.temp_min}°
        </span>
      )
    },
    {
      icon: icons.wind,
      name: "Gió",
      value: (
        <span>
          <img
            width={16}
            src={icons.direct}
            alt="direct"
            className="me-2"
            style={{
              transform: "rotate(" + (weather.wind_deg + 135) + "deg)"
            }}
          />
          {weather.wind_speed} km/giờ
        </span>
      )
    },
    {
      icon: icons.humidity,
      name: "Độ ẩm",
      value: <span>{weather.humidity}%</span>
    },
    {
      icon: icons.barometer,
      name: "Áp suất",
      value: <span>{weather.pressure} mb</span>
    },
    {
      icon: icons.eye,
      name: "Tầm nhìn",
      value: <span>{weather.visibility} km</span>
    },
    {
      icon: icons.sun_uv,
      name: "Chỉ số UV",
      value: <span>{weather.uvi} / 10</span>
    }
  ];

  return (
    <Card className="App-Detail mt-4">
      <Card.Body>
        <Row>
          {detailItems.map((item, index) => (
            <Col key={index} sm={6} className="mb-2">
              <div className="d-flex align-items-center border-top pt-2">
                <span className="d-flex align-items-center me-auto">
                  <img
                    width={32}
                    src={item.icon}
                    alt={item.name}
                    className="me-2"
                  />
                  {item.name}
                </span>
                {item.value}
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Detail;
