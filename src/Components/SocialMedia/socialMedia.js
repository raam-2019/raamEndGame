import React from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Script from 'react-load-script'
import Navagation from '../GlobalUtilities/Navigation';


class SocialMedia extends React.Component {

  //Create an activity feed and

  render() {
    return (
        <div classname="main">
          <div >
            <Navagation />
            <br/>
            <br/>
            <br/>
            <br/>

            Social Media Page
          </div>
        </div>
      );
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false })
  }
}
export default SocialMedia
