import React, { Component } from "react";
import {
  dataAdd,
  singleDataFetch,
  dataEdit,
} from "../../actions/dataListActions";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from "moment";
class DataAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      singleData: [],
      title: "",
      body: "",
      add: false,
      edit: false,
      getId: "",
      singledata: null,
    };
  }

  getId() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get("id");

    if (!id || id.length === 0) {
      return "";
    }

    return id;
  }
  componentDidMount() {
    // const id = this.props.match.params.id;
    // this.props.dispatch(dataAdd(id));
    this.setState({
      singleData: this.props.data.singledata,
      title: this.props.data.singledata.title,
      body: this.props.data.singledata.body,
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.data.singledata.title,
      body: newProps.data.singledata.body,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: this.state.edit,
      body: this.state.body,
    };

    if (this.state.edit != null && this.state.body != null) {
      this.props.dataAdd(data);
      this.setState({
        edit: "",
        body: "",
      });
    } else {
      toast.error("Field missing");
    }
  };

  BodyChange = (event) => {
    this.setState({ body: event.target.value });
  };
  TitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  render() {
    console.log("Add Data", this.state.edit);
    console.log("Add Data", this.state.body);
    return (
      <Container>
        <Row>
          <Col xs={6} style={{ margin: "auto", marginBottom: "50px" }}>
            <h4>Add TimeLog</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ margin: "auto", marginBottom: "50px" }}>
            <Link to="/">
              <Button>Back to the List</Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ margin: "auto" }}>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.TitleChange}
                  />
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Body"
                    name="body"
                    value={this.state.body}
                    onChange={this.BodyChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Form>
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    data: state.data,
    singledata: state.data.singledata,
  };
};
export default connect(mapStateToProps, { dataAdd, singleDataFetch, dataEdit })(
  withRouter(DataAdd)
);
