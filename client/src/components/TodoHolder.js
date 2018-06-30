import React from "react";

const Todo = (todo, idx, props) => {
  return (
    <li
      key={todo._id}
      onClick={() => {
        props.handleToggle(todo._id);
      }}
      className={`collection-item ${todo.completed ? "todo-completed" : ""}`}
    >
      {todo.text}{" "}
      <i
        className="material-icons right"
        onClick={e => {
          e.stopPropagation();
          props.handleDeleteOne(todo._id);
        }}
      >
        clear
      </i>
    </li>
  );
};

const TodoHolder = props => {
  return (
    <ul className="collection with-header todo-holder">
      <li className="collection-header">
        <h4>Todos</h4>
      </li>
      {props.todos.map((todo, idx) => Todo(todo, idx, props))}
    </ul>
  );
};

export default TodoHolder;
