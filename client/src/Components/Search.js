// Import APIs
import searchAheadAPI from "../APIs/searchAheadAPI";

// Import packages
import axios from "axios";

// Import react
import React from "react";
import { Row, Col, Dropdown, Form, Spinner } from "react-bootstrap";

const SearchInput = React.forwardRef(
  ({ children, value, changeInput, spinner }, ref) => (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Group>
        <Form.Control
          ref={ref}
          type="text"
          placeholder={children}
          value={value}
          onChange={changeInput}
        ></Form.Control>
        {spinner ? (
          <div className="spinner">
            <Spinner animation="border" role="status" size="sm"></Spinner>
          </div>
        ) : (
          ""
        )}
      </Form.Group>
    </Form>
  )
);

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      typingTimeout: 0,
      inputText: "",
      results: [],
      showResults: false
    };
  }

  handleSearch = (text) => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      spinner: true,
      inputText: text,
      results: [],
      showResults: false
    });

    this.setState({
      typingTimeout: setTimeout(() => {
        axios
          .get(searchAheadAPI.URL, {
            params: {
              key: searchAheadAPI.key,
              q: text,
              collection: "adminArea,poi,address,category,franchise,airport",
              location: `${this.props.longitude},${this.props.latitude}`
            }
          })
          .then((res) => {
            this.setState({
              results: res.data.results.map((item) => ({
                displayString: item.displayString,
                longitude: item.place.geometry.coordinates[0],
                latitude: item.place.geometry.coordinates[1]
              })),
              showResults: true
            });
          })
          .catch(() => {
            this.setState({
              results: [],
              showResults: false
            });
          });

        this.setState({
          spinner: false
        });
      }, 2000)
    });
  };

  handleSelectLocation = (latitude, longitude) => {
    this.setState({
      inputText: "",
      results: [],
      showResults: false
    });
    this.props.onChangeLocation(latitude, longitude);
  };

  render() {
    const results = this.state.results.map((item) => (
      <Dropdown.Item
        key={item.displayString}
        onClick={() => {
          this.handleSelectLocation(item.latitude, item.longitude);
        }}
      >
        {item.displayString}
      </Dropdown.Item>
    ));

    return (
      <Row className="App-Search">
        <Col>
          <Dropdown show={this.state.showResults}>
            <Dropdown.Toggle
              as={SearchInput}
              value={this.state.inputText}
              changeInput={(e) => this.handleSearch(e.target.value)}
              spinner={this.state.spinner}
            >
              Tìm tên thành phố...
            </Dropdown.Toggle>
            <Dropdown.Menu>{results}</Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

export default Search;
