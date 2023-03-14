import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import { PostProvider } from './context/postProvider';
import { UserPostProvider } from './context/userPostProvider';
import useAuthListener from './hooks/use-auth-listener';

import MainLoader from './loader/mainLoader';
import { SocketProvider } from './context/socketProvider';
import { UserProvider } from './context/userProvider';
import { ConversationsProvider } from './context/conversationProvider';
import { NotificationProvider } from './context/notificationProvider';
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const { user, jwt } = useAuthListener()

  return (
    <SocketProvider jwt={jwt} user={user}>
      <UserProvider user={user} >
        <NotificationProvider user={user}>
          <PostProvider >
            <UserPostProvider >
              <ConversationsProvider id={user?.id}>
                <Router>
                  <Suspense fallback={<MainLoader />}>
                    <Switch>
                      <Route path={ROUTES.LOGIN} component={() => <Login user={user} />} />
                      <Route path={ROUTES.SIGN_UP} component={() => <SignUp user={user} />} />
                      <Route path={ROUTES.DASHBOARD} component={() => <Dashboard user={user} />} />
                      {/* <ProtectedRoute user={user} path={ROUTES.DASHBOARD}  >
                  <Dashboard />
                </ProtectedRoute> */}
                      <Route component={NotFound} />
                    </Switch>
                  </Suspense>
                </Router>
              </ConversationsProvider>
            </UserPostProvider>
          </PostProvider>
        </NotificationProvider>
      </UserProvider>
    </SocketProvider>
  );
}
