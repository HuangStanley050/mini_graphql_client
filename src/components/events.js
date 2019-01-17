import React, { Component } from "react";
import Modal from "./modal/modal";
import "./events.css";

class EventPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal>
          <p>Modal Content</p>
        </Modal>
        <div className="events-control">
          <p>Share your event</p>
          <button className="btn">Create Event</button>
        </div>
      </React.Fragment>
    );
  }
}

export default EventPage;
