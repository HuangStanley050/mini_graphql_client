import React from "react";
import "./eventList.css";
import EventItem from "./eventList/eventItem";

const EventList = props => {
  const events = props.events.map(event => {
    return (
      <EventItem
        userId={props.authUserId}
        key={event._id}
        title={event.title}
        eventId={event._id}
        price={event.price}
        date={event.date}
        creatorId={event.creator._id}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="event__list">{events}</ul>;
};

export default EventList;
