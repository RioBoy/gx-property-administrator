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
import * as path from './routes/path';

const App = () => {
  return (
    <>
      <Switch>
        <Route path={path.URLLogin} component={Login} />
        <ProtectedRoute path={path.URLDashboard} component={Dashboard} />
        <ProtectedRoute path={path.URLProfile} component={Profile} />
        <ProtectedRoute path={path.URLProperty} component={Property} />
        <ProtectedRoute path={path.URLContact} component={Contact} />
        <ProtectedRoute exact path={path.URLHome} component={Login} />
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;
