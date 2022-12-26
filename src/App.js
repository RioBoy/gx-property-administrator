import './assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './routes/ProtectedRoute';
import * as path from './routes/path';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import Property from './pages/property/Property';
import Contact from './pages/contact/Contact';
import ContactDetail from './pages/contact/ContactDetail';
import ContactAdd from './pages/contact/ContactAdd';
import ContactEdit from './pages/contact/ContactEdit';
import PropertyDetail from './pages/property/PropertyDetail';
import NotFound from './pages/NotFound';
import { withAuth } from './context/Auth';

const App = ({ isDarkMode }) => {
  return (
    <>
      <Switch>
        <Route path={path.URLLogin} component={Login} />
        <ProtectedRoute path={path.URLDashboard} component={Dashboard} />
        <ProtectedRoute path={path.URLProfile} component={Profile} />
        <ProtectedRoute exact path={path.URLProperty} component={Property} />
        <ProtectedRoute
          path={`${path.URLPropertyDetail()}`}
          component={PropertyDetail}
        />
        <ProtectedRoute exact path={path.URLContact} component={Contact} />
        <ProtectedRoute path={`${path.URLContactAdd}`} component={ContactAdd} />
        <ProtectedRoute
          path={`${path.URLContactEdit()}`}
          component={ContactEdit}
        />
        <ProtectedRoute
          path={`${path.URLContactDetail()}`}
          component={ContactDetail}
        />
        <ProtectedRoute exact path={path.URLHome} component={Login} />
        <Route path="*">
          <NotFound isPageNotFound>Back to Home</NotFound>
        </Route>
      </Switch>
      <ToastContainer theme={!isDarkMode ? 'light' : 'dark'} />
    </>
  );
};

export default withAuth(App);
