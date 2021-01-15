// Import APIs
import geocodingAPI from "./APIs/geocodingAPI";
import openweathermap from "./APIs/openweathermap";

// Import packages
import axios from "axios";

// Import react
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Import components
import Search from "./Components/Search";
import Overview from "./Components/Overview";
import Detail from "./Components/Detail";
import Sun from "./Components/Sun";
import Hourly from "./Components/Hourly";

// Import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      overview: {
        localName: "",
        temp: 0,
        feels_like: 0,
        description: "",
        icon: ""
      },
      detail: {
        temp_max: 0,
        temp_min: 0,
        wind_speed: 0,
        wind_deg: 0,
        humidity: 0,
        pressure: 0,
        visibility: 0,
        uvi: 0
      },
      sun: {
        sunrise: 0,
        sunset: 0
      },
      hourly: []
    };
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Get current coord
        const { latitude, longitude } = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        this.setupLocation(latitude, longitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  setupLocation = (latitude, longitude) => {
    // Call Geocoding API
    axios
      .get(geocodingAPI.URL, {
        params: {
          key: geocodingAPI.key,
          location: `${latitude},${longitude}`
        }
      })
      .then((res) => {
        let localName = res.data.results[0].locations[0].adminArea5;

        // Call One Call API
        axios
          .get(openweathermap.oneCallAPIURL, {
            params: {
              lat: latitude,
              lon: longitude,
              appid: openweathermap.key,
              units: "metric",
              lang: "vi"
            }
          })
          .then((res) => {
            const current = res.data.current;
            const today = res.data.daily[0];
            this.setState({
              latitude: latitude,
              longitude: longitude,
              overview: {
                localName: localName,
                temp: Math.ceil(current.temp),
                feels_like: Math.ceil(current.feels_like),
                description: current.weather[0].description,
                icon: current.weather[0].icon
              },
              detail: {
                temp_max: Math.ceil(today.temp.max),
                temp_min: Math.ceil(today.temp.min),
                wind_speed: Math.ceil(current.wind_speed * 3.6),
                wind_deg: current.wind_deg,
                humidity: current.humidity,
                pressure: current.pressure,
                visibility: current.visibility / 1000,
                uvi: current.uvi
              },
              sun: {
                sunrise: current.sunrise,
                sunset: current.sunset
              },
              hourly: res.data.hourly
            });
          });
      });
  };

  handleChangeLocation = (latitude, longitude) => {
    this.setupLocation(latitude, longitude);
  };

  render() {
    return (
      <div className="App px-1 py-4">
        <Container>
          <Row>
            <Col>
              <Search
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                onChangeLocation={this.handleChangeLocation}
              />
              <Overview weather={this.state.overview} />
              <Detail weather={this.state.detail}></Detail>
              <Sun sun={this.state.sun} />
              <Hourly hourly={this.state.hourly} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
