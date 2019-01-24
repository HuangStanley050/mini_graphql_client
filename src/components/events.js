import React, { Component } from "react";
import Modal from "./modal/modal";
import Backdrop from "./backdrop/backdrop";
import axios from "axios";
import "./events.css";
import AuthContext from "../context/auth-context";

class EventPage extends Component {
  state = {
    creating: false,
    events: []
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
    this.dateRef = React.createRef();
    this.priceRef = React.createRef();
    this.descriptionRef = React.createRef();
  }

  componentDidMount() {
    this.fetchEvents();
  }

  startCreateEventHandler = e => {
    this.setState({ creating: true });
  };

  onCancelEventHandler = e => {
    this.setState({ creating: false });
  };

  fetchEvents = () => {
    const queryBody = {
      query: ` query {
                    events {
                      _id
                      title
                      description
                      date
                      price
                      creator {
                        _id
                        email
                      }
                    }
        }
      `
    };
    axios({
      method: "post",
      url:
        "https://github-site-practice-infamousgodhand.c9users.io:8081/graphql",
      data: queryBody,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        const events = res.data.data.events;
        this.setState({ events: events });
        //console.log(events);
      })
      .catch(err => console.log(err));
  };

  onConfirmEventHandler = e => {
    e.preventDefault();
    this.setState({ creating: false });
    const title = this.titleRef.current.value;
    const date = this.dateRef.current.value;
    const price = +this.priceRef.current.value;
    const description = this.descriptionRef.current.value;

    const event = {
      title,
      date,
      price,
      description
    };
    //console.log(event);

    const queryBody = {
      query: `
         mutation {
           createEvent(eventInput: {title: "${title}", description:"${description}", price: ${price}, date: "${date}"}) {
             _id
             title
             description
             date
             price
             creator {
               _id
               email
             }
           }
         }
      `
    };

    const token = this.context.token;

    axios({
      method: "post",
      url:
        "https://github-site-practice-infamousgodhand.c9users.io:8081/graphql",
      data: queryBody,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        this.fetchEvents();
      })
      .catch(err => console.log(err));
  };

  render() {
    const eventList = this.state.events.map(event => {
      return (
        <li key={event._id} className="events__list-item">
          {event.title}
        </li>
      );
    });
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
        {this.context.token && (
          <div className="events-control">
            <p>Share your event</p>
            <button onClick={this.startCreateEventHandler} className="btn">
              Create Event
            </button>
          </div>
        )}
        <ul className="events__list">{eventList}</ul>
      </React.Fragment>
    );
  }
}

export default EventPage;
