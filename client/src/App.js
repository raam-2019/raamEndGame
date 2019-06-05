import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard/dashboard';
import Fanexperience from './Components/FanExperience/fanexperience';
// import 'mapbox-gl/dist/mapbox-gl.css';

class App extends Component {
  render() {
    return (
      //Fan experience page. This is the first page that will load. For Dashboard access for now 
      //we will have to add /dashboardRAAMforVIPaccess to out http

      //Removing the extact will show both the fan page and dash page together
      //which we might need later to avoid multiple same implementations.
      //For development purpose I have added the exact.
      <BrowserRouter>
        <div>
          <Route path="/" component={Fanexperience} exact />
          <Route path="/dashboardRAAMforVIPaccess" component={Dashboard} />
        </div>
      </BrowserRouter>


    );
  }
}

export default App;
