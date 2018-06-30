import React from "react";
import { Modal, Button, Input } from "react-materialize";

const Actions = props => {
  return (
    <div className="row modal-actions">
      <Button
        waves="light"
        onClick={() => {
          props.handleSubmit();
          props.toggleModal();
        }}
        className="indigo darken-3"
      >
        Add
      </Button>
      <Button
        waves="light"
        className="indigo darken-3"
        onClick={() => {
          props.toggleModal();
        }}
      >
        Close
      </Button>
    </div>
  );
};

const DeleteAllActions = props => {
  return (
    <div className="row modal-actions">
      <Button
        waves="light"
        onClick={() => {
          props.handleDeleteAll();
        }}
        className="indigo darken-3"
        modal={"close"}
      >
        Yes
      </Button>
      <Button waves="light" className="indigo darken-3" modal={"close"}>
        No
      </Button>
    </div>
  );
};

const TodoControls = props => {
  return (
    <div className="TodoControls">
      <Button
        onClick={() => {
          props.toggleModal();
        }}
        className="waves-effect waves-light btn indigo darken-3"
      >
        Add
      </Button>

      <Button
        href={"#deleteask"}
        className="waves-effect waves-light btn red darken-3 modal-trigger"
      >
        Delete All
      </Button>

      <Modal
        header="Sure delete all todos?"
        bottomSheet
        id={"deleteask"}
        actions={DeleteAllActions(props)}
      />

      <Modal
        id={"addnew"}
        header="Add Todo"
        bottomSheet
        actions={Actions(props)}
        open={props.isOpen}
        modalOptions={{
          dismissible: false,
          onCloseEnd: () => {
            if (props.isOpen) props.toggleModal();
          },
          outDuration: 700
        }}
      >
        <Input
          placeholder="New todo title"
          value={props.text}
          onKeyDown={event => {
            event.stopPropagation();
            if (event.keyCode === 13) {
              props.handleSubmit();
              props.toggleModal();
            }
          }}
          autoFocus={true}
          onChange={e => props.handleTextChange.bind(this)(e.target)}
        />
      </Modal>
    </div>
  );
};

export default TodoControls;
