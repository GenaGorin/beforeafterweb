import React from "react";
import { connect } from "react-redux";
import { createPost, showAlert } from "../redux/actions";
import Alert from "./Alert/Alert";

type MyProps = any;
type MyState = any;

class PostForm extends React.Component<MyProps, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: "",
    };
  }

  submithandler = (event: any) => {
    event.preventDefault();
    const { title } = this.state;

    if (!title.trim()) {
      return this.props.showAlert("Enter your text");
    }

    const newPost = { title, id: Date.now().toString() };

    this.props.createPost(newPost);
    this.setState({ title: "" });
  };
  changeInputHandler = (event: any) => {
    this.setState((prev: any) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <form onSubmit={this.submithandler}>
        {this.props.alert && <Alert text={this.props.alert} />}
        <div className="form-group">
          <label htmlFor="title">Заголовок</label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            value={this.state.title}
            onChange={this.changeInputHandler}
          />
        </div>
        <button className="btn btn-success">Создать </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createPost,
  showAlert,
};

const mapStateToProps = (state: any) => {
  return { alert: state.app.alert };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
