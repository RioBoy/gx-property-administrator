import './assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import Property from './pages/property/Property';
import Contact from './pages/contact/Contact';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/profile" component={Profile} />
        <ProtectedRoute path="/property" component={Property} />
        <ProtectedRoute path="/contact" component={Contact} />
        <ProtectedRoute exact path="/" component={Login} />
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;
