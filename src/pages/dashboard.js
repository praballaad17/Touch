import { useEffect, lazy, useState } from 'react';
import { Link, Route, Switch, useLocation, Redirect } from 'react-router-dom';
import { faBell, faHome, faMailBulk, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from '../constants/routes';
import Leftbar from '../components/leftbar';
import SearchBar from '../components/leftbar/searchBar';
import ToggleBar from '../components/toggleBar';
import NotFound from './not-found';
import { useConversations } from '../context/conversationProvider';
import { useUser } from '../context/userProvider';
import ProtectedRoute from '../helpers/protected-route';
// import MainLoader from '../loader/mainLoader';

const Profile = lazy(() => import('./profile'));
const Timeline = lazy(() => import('../components/timeline'));
const Messages = lazy(() => import('../components/messages/messages'));
const Newpost = lazy(() => import('../components/newpost/newpost'));

export default function Dashboard({ user }) {
  useEffect(() => {
    document.title = 'Touch';
  }, []);
  const [show, setShow] = useState(false)
  const { user: loggedInUser } = useUser();
  const { selectedConversationGroupId } = useConversations()

  let location = useLocation();
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

        </div>
      </>
    )
  }


  // else 
  return (
    <>
      {/* <Header /> */}
      <div className="dashboard">
        <div className="dashboard__phonebar">
          {!selectedConversationGroupId && <Phonebar />}
          <div className="dashboard__togglebar">
            <ToggleBar show={show} loggedInUser={loggedInUser} onClose={() => setShow(false)} />
          </div>
        </div>
        <div className="dashboard__leftbar">
          <Leftbar loggedInUser={loggedInUser} user={user} onClose={() => setShow(false)} />
        </div>
        <div className="dashboard__main">
          <Switch>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute path={ROUTES.MESSAGES} user={user}   >
              <Messages />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.NEWPOST} user={user}   >
              <Newpost />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.TIMELINE} user={user}   >
              <Timeline setShow={setShow} />
            </ProtectedRoute>
            {/* <Route path={ROUTES.NEWPOST} component={Newpost} /> */}
            {/* <Route path={ROUTES.TIMELINE} component={Timeline} /> */}
            <Redirect from={ROUTES.DASHBOARD} to={ROUTES.TIMELINE} />
            <Route component={NotFound} />
          </Switch>
        </div>
        {location.pathname !== '/messages' && <div className="dashboard__rightbar">
          <div className="dashboard__right--search">
            <SearchBar />
          </div>
        </div>}

      </div>
    </>
  );
}

