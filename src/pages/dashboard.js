import { useEffect, lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faBell, faHome, faMailBulk, faPlusSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import Leftbar from '../components/leftbar';
import SearchBar from '../components/leftbar/searchBar';
import ToggleBar from '../components/toggleBar';

const Profile = lazy(() => import('./profile'));
const Timeline = lazy(() => import('../components/timeline'));
const Messages = lazy(() => import('../components/messages'));
const Newpost = lazy(() => import('../components/newpost/newpost'));

export default function Dashboard({ user: loggedInUser }) {
  const [show, setShow] = useState(false)
  const userId = loggedInUser ? loggedInUser.id : null
  const username = loggedInUser ? loggedInUser.username : null
  const { user, setActiveUser } = useUser(username);
  let { path, url } = useRouteMatch();

  useEffect(() => {
    document.title = 'Touch';
  }, []);

  function Phonebar() {
    return (
      <>
        <div className="phonebar">
          <Link className="phonebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
            <span className="phonebar__link--icon">
              <FontAwesomeIcon icon={faHome} /></span>
          </Link>
          <Link className="phonebar__link" to={ROUTES.DASHBOARD} aria-label="Dashboard">
            <span className="phonebar__link--icon">
              <FontAwesomeIcon icon={faBell} /></span>
          </Link>
          <Link className="phonebar__link" to={ROUTES.NEWPOST} aria-label="Dashboard">
            <span className="phonebar__link--icon">
              <FontAwesomeIcon icon={faPlusSquare} /></span>
          </Link>
          <Link className="phonebar__link" to={ROUTES.MESSAGES} aria-label="Dashboard">
            <span className="phonebar__link--icon">
              <FontAwesomeIcon icon={faMailBulk} /></span>
          </Link>
          <Link className="phonebar__link" onClick={() => setShow(true)} aria-label="Dashboard">
            <span className="phonebar__link--icon">
              <FontAwesomeIcon icon={faUser} /></span>
          </Link>
        </div>
      </>
    )
  }

  return (
    <LoggedInUserContext.Provider value={{ user, setActiveUser }}>

      {/* <Header /> */}

      <div className="dashboard">
        <div className="dashboard__phonebar">
          <Phonebar />
          <div className="dashboard__togglebar">
            <ToggleBar show={show} user={user} loggedInUser={loggedInUser} onClose={() => setShow(false)} />
          </div>
        </div>
        <div className="dashboard__leftbar">
          <Leftbar path={path} url={url} />
        </div>
        <div className="dashboard__main">
          <Switch>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.DASHBOARD} component={Timeline} exact />
            <Route path={ROUTES.MESSAGES} component={Messages} />
            <Route path={ROUTES.NEWPOST} component={Newpost} />
          </Switch>
        </div>
        <div className="dashboard__rightbar">
          {/* <Timeline /> */}
          {/* <Sidebar />  */}
          <div className="dashboard__right--search">
            <SearchBar />
          </div>
        </div>

      </div>

    </LoggedInUserContext.Provider>
  );
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};
