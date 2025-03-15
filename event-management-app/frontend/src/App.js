import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/create-event" component={CreateEvent} />
        <Route path="/event/:id" component={EventDetails} />
      </Switch>
    </Router>
  );
};

export default App;
