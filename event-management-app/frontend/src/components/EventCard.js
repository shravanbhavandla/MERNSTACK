import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <Link to={`/event/${event._id}`} className="event-link">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
