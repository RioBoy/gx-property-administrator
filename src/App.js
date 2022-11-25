import './assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Property from './pages/property/Property';
import DetailProperty from './pages/property/DetailProperty';
import Contact from './pages/contact/Contact';
import DetailContact from './pages/contact/DetailContact';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/property" component={Property} />
          <Route path="/property/:id" component={DetailProperty} />
          <Route exact path="/contact" component={Contact} />
          <Route path="/contact/:id" component={DetailContact} />
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
