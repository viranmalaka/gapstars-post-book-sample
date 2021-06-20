import React from 'react';
import MainLayout from "./main-layout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AllPhotos from "./all-photos";
import SelectedPhotos from "./selected-photos";

const MainRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/all" ><AllPhotos /></Route>
          <Route path="/selected" ><SelectedPhotos /></Route>
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default MainRouter;
