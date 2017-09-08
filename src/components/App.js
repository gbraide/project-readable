import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import AddPost from './Add-post';
import PostDetail from './Post-detail';
import EditPost from './Edit-post';
import AddComment from './Add-comment';
import '../App.css';

const NoMatch = ({ location }) => (
  <div>
    <p>
      No match for <code>{location.pathname}</code>
    </p>
  </div>
);

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/add-post" component={AddPost} />
      <Route exact path="/post/:id" component={PostDetail} />
      <Route exact path="/post/:id/edit-post" component={EditPost} />
      <Route exact path="/post/:id/add-comment" component={AddComment} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);
export default App;
