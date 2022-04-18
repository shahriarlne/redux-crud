import React, { Component } from "react";
import {
  dataAdd,
  dataEdit,
  singleDataFetch,
} from "../../actions/dataListActions";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

class EditData extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log("window.location.href", window.location.href);

    // const chars = (window.location.search).split('');
    // console.log(chars[8]);

    // var newURL = (window.location.href);
    console.log(id);
    var splitURL = window.location.href.toString().split("/");

    console.log(splitURL.length);

    if (!id || id.length === 0) {
      return "";
    }

    return id;
  }

  async componentDidMount() {
    console.log("mount called");
    const id = this.props.match.params.id;
    await singleDataFetch(id);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.singledata.title,
      body: newProps.singledata.body,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title: this.state.title,
      body: this.state.body,
    };

    if (this.state.title != null && this.state.body != null) {
      this.props.dataAdd(data);
      this.setState({
        title: "",
        body: "",
      });
    } else {
      toast.error("Field missing");
    }
  };

  handleEdit = (e) => {
    e.preventDefault();
    let data = {
      title: this.state.title,
      body: this.state.body,
    };

    if (this.state.title != null && this.state.body != null) {
      this.props.dataEdit(data, this.state.getId);
      this.setState({
        title: "",
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

  handleEditPost(e) {
    e.preventDefault();
  }

  render() {
    const data = this.props.data?.data;
    const post = this.props.singledata;
    return (
      <Container>
        <Row>
          <Col xs={6} style={{ margin: "auto", marginBottom: "50px" }}>
            <h4>Edit TimeLog</h4>
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
              <Form onSubmit={this.handleEditPost}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    defaultValue={post.title}
                    onChange={this.TitleChange}
                  />
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Body"
                    name="body"
                    defaultValue={post.body}
                    onChange={this.BodyChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update post
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
export default connect(mapStateToProps)(withRouter(EditData));
