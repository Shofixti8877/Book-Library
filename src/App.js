import React from 'react';
import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

import HomePage from "./components/pages/Homepage";

const App = ({ location }) =>
<div className="ui container">
  <Route location={location} path="/" exact component={HomePage} />

</div>

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
