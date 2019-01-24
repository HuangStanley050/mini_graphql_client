import React from "react";
import "./eventItem.css";

const EventItem = props => {
  return (
    <li key={props.eventId} className="events__list-item">
      {props.title}
    </li>
  );
};

export default EventItem;
