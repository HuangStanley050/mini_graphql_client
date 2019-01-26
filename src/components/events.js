import React, { Component } from "react";
import Modal from "./modal/modal";
import Backdrop from "./backdrop/backdrop";
import axios from "axios";
import Spinner from "./spinner/spinner";
import "./events.css";
import AuthContext from "../context/auth-context";
import EventList from "./events/eventList";

class EventPage extends Component {
  state = {
    creating: false,
    events: [],
    isLoading: false,
    selectedEvent: null
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
    this.setState({ creating: false, selectedEvent: null });
  };

  showDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEvent = prevState.events.find(e => e._id === eventId);
      return { selectedEvent: selectedEvent };
    });
  };

  bookEventHandler = () => {
    alert("booking");
  };

  fetchEvents = () => {
    this.setState({ isLoading: true });
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
        this.setState({ events: events, isLoading: false });
        //console.log(events);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
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
        this.setState(prevState => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: res.data.data.createEvent._id,
            title: res.data.data.createEvent.title,
            description: res.data.data.createEvent.description,
            date: res.data.data.createEvent.date,
            price: res.data.data.createEvent.price,
            creator: {
              _id: this.context.userId
            }
          });
          return { events: updatedEvents };
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        {this.state.creating || this.state.selectedEvent ? <Backdrop /> : null}
        {/*==============this is the create modal=============*/}
        {this.state.creating ? (
          <Modal
            onCancel={this.onCancelEventHandler}
            onConfirm={this.onConfirmEventHandler}
            title="Add Event"
            canConfirm={true}
            canCancel={true}
            confirmText="Confirm"
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
        {/*==============this is the create modal=============*/}

        {/*=================this is detail Modal=============== */}
        {this.state.selectedEvent ? (
          <Modal
            onCancel={this.onCancelEventHandler}
            onConfirm={this.bookEventHandler}
            title={this.state.selectedEvent.title}
            canConfirm={true}
            canCancel={true}
            confirmText="Book"
          >
            <h1>{this.state.selectedEvent.title}</h1>
            <h2>
              {" "}
              ${this.state.selectedEvent.price} -{" "}
              {new Date(this.state.selectedEvent.date).toLocaleDateString()}
            </h2>
            <p>{this.state.selectedEvent.description}</p>
          </Modal>
        ) : null}
        {/*==============this is the detail modal=============*/}

        {this.context.token && (
          <div className="events-control">
            <p>Share your event</p>
            <button onClick={this.startCreateEventHandler} className="btn">
              Create Event
            </button>
          </div>
        )}

        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <EventList
            events={this.state.events}
            authUserId={this.context.userId}
            onViewDetail={this.showDetailHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default EventPage;
