import React from 'react';
import User from './src/context/userContext.js';
import Route from './src/routes/Route.js';

const App = () => {
  return (
    <User>
      <Route />
    </User>
  );
};

export default App;
