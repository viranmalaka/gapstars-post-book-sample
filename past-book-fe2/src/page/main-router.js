import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import AllPhotos from "./all-photos";
import SelectedPhotos from "./selected-photos";

const MainRouter = () => {
  const [selectedCount, setSelectedCount] = useState(0);

  return (
    <div className="main-layout">
      <Router>
        <div className="nav-bar">
          <div>
            <Link to="/all">
              <button className="nav-link">All Image</button>
            </Link>
            <Link to="/selected">
              <button className="nav-link">Selected Images</button>
            </Link>
          </div>
          <div className="selected-count">Selected: {selectedCount}</div>
        </div>
        <div className="container">
          <Switch>
            <Route path="/all">
              <AllPhotos onImageCountChanged={setSelectedCount} />
            </Route>
            <Route path="/selected">
              <SelectedPhotos onImageCountChanged={setSelectedCount} />
            </Route>
            <Redirect from="/" to="/selected" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default MainRouter;
