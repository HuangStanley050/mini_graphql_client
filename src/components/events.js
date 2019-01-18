import React, { Component } from "react";
import Modal from "./modal/modal";
import Backdrop from "./backdrop/backdrop";
import "./events.css";

class EventPage extends Component {
  state = {
    creating: false
  };

  startCreateEventHandler = e => {
    this.setState({ creating: true });
  };

  onCancelEventHandler = e => {
    this.setState({ creating: false });
  };

  onConfirmEventHandler = e => {};

  render() {
    return (
      <React.Fragment>
        {this.state.creating ? <Backdrop /> : null}
        {this.state.creating ? (
          <Modal
            onCancel={this.onCancelEventHandler}
            onConfirm={this.onConfirmEventHandler}
            title="Add Event"
            canConfirm={true}
            canCancel={true}
          >
            <p>Modal Content</p>
          </Modal>
        ) : null}
        <div className="events-control">
          <p>Share your event</p>
          <button onClick={this.startCreateEventHandler} className="btn">
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventPage;
