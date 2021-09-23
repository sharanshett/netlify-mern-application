import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import PageSpinner from '../../components/PageSpinner';
import UserList from '../userList/UserList';

//different routes of the project
const routePaths = [
  { to: '/', title: [{route: '/', title: 'Users'}], Component: UserList },
  { to: '/users', title: [{route: '/users', title: 'Users'}], Component: UserList }
];

export default function Home(props) {
  const [routeBreadCrumbs, setRouteBreadCrumbs] = useState([]);

  return (
    <Router>
      <div className="d-flex">
        <MainLayout {...props} breakpoint={props.breakpoint} routeTitle={routeBreadCrumbs}>
          <React.Suspense fallback={<PageSpinner />}>
            {routePaths.map(({ to, Component, title }) => (<Route key={to} exact path={to} render={() => { 
              return (<Component {...props} setRouteBreadCrumbs={(updatedRoutes) => {setRouteBreadCrumbs(updatedRoutes)}} routeBreadCrumbs={routeBreadCrumbs}/>) }} />))}
          </React.Suspense>
        </MainLayout>
      </div>
    </Router>
  );
}
