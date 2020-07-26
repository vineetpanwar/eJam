import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar";
import Landing from "./components/landing";
import Footer from "./components/footer";
import CreateDeployment from "./components/createDepoyment";
import ViewDeployment from "./components/viewDeployment";
import NotFound from "./components/NotFound";

// Redux
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/create" component={CreateDeployment} />
              <Route exact path="/view" component={ViewDeployment} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
