import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.length > 0 ? (
        <div>
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default Home;
