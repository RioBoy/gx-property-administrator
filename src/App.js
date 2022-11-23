import './assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Property from './pages/property/Property';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/property" component={Property} />
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
