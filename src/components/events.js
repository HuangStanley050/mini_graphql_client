import React, { Component } from "react";
import Modal from "./modal/modal";
import Backdrop from "./backdrop/backdrop";
import "./events.css";

class EventPage extends Component {
  state = {
    creating: false
  };

  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.dateRef = React.createRef();
    this.priceRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  startCreateEventHandler = e => {
    this.setState({ creating: true });
  };

  onCancelEventHandler = e => {
    this.setState({ creating: false });
  };

  onConfirmEventHandler = e => {
    e.preventDefault();
    this.setState({ creating: false });
    const title = this.titleRef.current.value;
    const date = this.dateRef.current.value;
    const price = this.priceRef.current.value;
    const description = this.descriptionRef.current.value;

    const event = {
      title,
      date,
      price,
      description
    };
    console.log(event);
  };

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
            <form>
              <div className="form-control">
                <label htmlFor="Title">Title</label>
                <input type="text" id="Title" ref={this.titleRef} />
              </div>
              <div className="form-control">
                <label htmlFor="Price">Price</label>
                <input type="number" id="Price" ref={this.priceRef} />
              </div>
              <div className="form-control">
                <label htmlFor="Date">Date</label>
                <input type="date" id="Date" ref={this.dateRef} />
              </div>
              <div className="form-control">
                <label htmlFor="Description">Description</label>
                <textarea rows="4" id="Description" ref={this.descriptionRef} />
              </div>
            </form>
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
