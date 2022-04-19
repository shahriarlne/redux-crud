import React, { Component } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { singleDataFetch } from "../../actions/dataListActions";

class EditData extends Component {
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

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.dispatch(singleDataFetch(id));
    this.setState({
      // singleData: this.props.data.singledata,
      title: this.props.data.singledata.title,
      body: this.props.data.singledata.body,
    });
  }
  componentWillReceiveProps(newProps) {
    console.log("singledata newprops", newProps.data.singledata);
    if (
      newProps.data.singledata.title != this.state.title ||
      newProps.data.singledata.body != this.state.body
    ) {
      this.setState({
        title: newProps.data.singledata.title,
        body: newProps.data.singledata.body,
      });
    }
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
      this.props.dataEdit(data, data.singledata.id);
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

  // handleEditPost(e) {
  //   e.preventDefault();
  // }

  render() {
    const data = this.props.data?.data;
    const post = this.props.data.post;
    console.log("singledata title", this.state.title);
    console.log("singledata body", this.state.body);
    // console.log("single body", this.state.body);
    // console.log("single props", this.props.data.singledata.title);
    // console.log("single props", this.props.data.singledata.body);

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
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={this.state.title}
                    onChange={this.TitleChange}
                  />
                  <Form.Label>Body</Form.Label>
                  <Form.Control
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
                  onClick={this.handleEdit}
                >
                  Update
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
    post: state.post,
  };
};
export default connect(mapStateToProps)(withRouter(EditData));
