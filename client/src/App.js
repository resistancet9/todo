import React, { Component } from "react";
import Navbar from "./components/NavBar";
import TodoHolder from "./components/TodoHolder";
import TodoControls from "./components/TodoControls";
import "./App.css";

class App extends Component {
  state = {
    text: "",
    isOpen: false,
    todos: []
  };

  toggleModal() {
    console.log("toggle");
    this.setState(prev => {
      return {
        isOpen: !prev.isOpen
      };
    });
  }

  handleTextChange(target) {
    this.setState({
      text: target.value
    });
  }

  handleDeleteAll() {
    fetch("/deleteall", {
      method: "POST"
    });
    this.getAllTodos();
  }

  handleDeleteOne(id) {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "content-type": "application/json"
      }
    }).then(e => {
      fetch("/all")
        .then(e => e.json())
        .then(d => this.setState({ todos: d }));
    });
  }

  handleToggle(id) {
    fetch("/toggle", {
      method: "POST",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "content-type": "application/json"
      }
    }).then(e => {
      fetch("/all")
        .then(e => e.json())
        .then(d => this.setState({ todos: d }));
    });
  }

  handleSubmit() {
    fetch("/add", {
      method: "POST",
      body: JSON.stringify({
        text: this.state.text.trim()
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(e => e.json())
      .then(d => {
        this.setState({
          text: "",
          todos: d
        });
      });
  }

  getAllTodos() {
    fetch("/all")
      .then(e => e.json())
      .then(d => this.setState({ todos: d }));
  }

  componentDidMount() {
    this.getAllTodos();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <TodoControls
            handleTextChange={this.handleTextChange.bind(this)}
            toggleModal={this.toggleModal.bind(this)}
            isOpen={this.state.isOpen}
            handleSubmit={this.handleSubmit.bind(this)}
            text={this.state.text}
            handleDeleteAll={this.handleDeleteAll.bind(this)}
          />
          <TodoHolder
            todos={this.state.todos}
            handleToggle={this.handleToggle.bind(this)}
            handleDeleteOne={this.handleDeleteOne.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
