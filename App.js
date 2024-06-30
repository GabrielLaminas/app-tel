import User from './src/context/userContext.js';
import Route from './src/routes/Route.js';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <User>
      <Route />
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
    </User>
  );
};

export default App;
