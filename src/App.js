import './assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Property from './pages/property/Property';
import Contact from './pages/contact/Contact';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/property" component={Property} />
        <Route path="/contact" component={Contact} />
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;
