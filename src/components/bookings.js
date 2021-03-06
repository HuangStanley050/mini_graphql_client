import React, { Component } from "react";
import axios from "axios";
import Spinner from "./spinner/spinner";
import AuthContext from "../context/auth-context";
import BookingList from "./bookings/bookingList";

class BookingPage extends Component {
  state = {
    isLoading: false,
    bookings: []
  };

  componentDidMount() {
    this.fetchBookings();
  }

  deleteBooking = id => {
    this.setState({ isLoading: true });
    const queryBody = {
      query: ` mutation {
                    cancelBooking(bookingId: "${id}") {
                      _id
                      title
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
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }

        this.setState(prevState => {
          const updatedBookings = prevState.bookings.filter(booking => {
            return booking._id !== id;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
        //console.log(events);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  static contextType = AuthContext;

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const queryBody = {
      query: ` query {
                    bookings {
                      _id
                      createdAt
                      event {
                        _id
                        title
                        date
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
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        const bookings = res.data.data.bookings;
        this.setState({ bookings: bookings, isLoading: false });
        //console.log(events);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <BookingList
            onDelete={this.deleteBooking}
            bookings={this.state.bookings}
          />
        )}
      </React.Fragment>
    );
  }
}

export default BookingPage;

// <ul>
//             {this.state.bookings.map(booking => {
//               return (
//                 <li key={booking._Id}>
//                   {booking.event.title} -{" "}
//                   {new Date(booking.createdAt).toLocaleDateString()}
//                 </li>
//               );
//             })}
//           </ul>
