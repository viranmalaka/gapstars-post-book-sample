import React from 'react';
import MainLayout from "./main-layout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

const MainRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/all" >all</Route>
          <Route path="/selected" >selected</Route>
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default MainRouter;
