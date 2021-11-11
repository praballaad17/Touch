import { useEffect, lazy, useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { faBell, faHome, faMailBulk, faPlusSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from '../constants/routes';
import useUser from '../hooks/use-user';
import LoggedInUserContext from '../context/logged-in-user';
import Leftbar from '../components/leftbar';
import SearchBar from '../components/leftbar/searchBar';
import ToggleBar from '../components/toggleBar';
import usePhotos from '../hooks/use-photos';
import NotFound from './not-found';

const Profile = lazy(() => import('./profile'));
const Timeline = lazy(() => import('../components/timeline'));
const Messages = lazy(() => import('../components/messages'));
const Newpost = lazy(() => import('../components/newpost/newpost'));

export default function Dashboard({ user }) {
  useEffect(() => {
    document.title = 'Touch';
  }, []);
  const [show, setShow] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const userId = user ? user.id : null
  const username = user ? user.username : null
  const { user: loggedInUser, setActiveUser } = useUser(username);

  const { posts, loading, hasMore, error, setPosts } = usePhotos(loggedInUser, pageNumber);
  let { path, url } = useRouteMatch();

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

  return (
    <LoggedInUserContext.Provider value={{ setShow, loggedInUser, setActiveUser, posts, loading, setPosts, error, hasMore, setPageNumber }}>

      {/* <Header /> */}

      <div className="dashboard">
        <div className="dashboard__phonebar">
          <Phonebar />
          <div className="dashboard__togglebar">
            <ToggleBar show={show} loggedInUser={loggedInUser} onClose={() => setShow(false)} />
          </div>
        </div>
        <div className="dashboard__leftbar">
          <Leftbar loggedInUser={loggedInUser} path={path} url={url} />
        </div>
        <div className="dashboard__main">
          {/* <Suspense fallback={<ReactLoader />}> */}
          <Switch>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.DASHBOARD} component={Timeline} exact />
            <Route path={ROUTES.MESSAGES} component={Messages} />
            <Route path={ROUTES.NEWPOST} component={Newpost} />
            <Route component={NotFound} />
          </Switch>
          {/* </Suspense> */}
        </div>
        <div className="dashboard__rightbar">
          <div className="dashboard__right--search">
            <SearchBar />
          </div>
        </div>

      </div>

    </LoggedInUserContext.Provider>
  );
}

