import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', { name, date, location, description });
      setMessage('Event created successfully!');
      history.push('/');
    } catch (error) {
      setMessage('Failed to create event');
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Create Event</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateEvent;
