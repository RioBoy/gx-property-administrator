import './assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import LoginPage from './loginPage/LoginPage';
import DashboardPage from './dashboardPage/DashboardPage';

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
