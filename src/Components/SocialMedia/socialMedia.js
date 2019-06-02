import React from "react";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import Script from "react-load-script";
import Navagation from "../GlobalUtilities/Navigation";

class SocialMedia extends React.Component {
  //Create an activity feed and

  render() {
    return (
      <React.Fragment>
        <header>
          <a class="logo" href="https://www.juicer.io/">
            Juicer
          </a>
          <h1 class="jonas-klare">Jonas Klare</h1>
        </header>
        <script
          src="https://assets.juicer.io/embed.js"
          type="text/javascript"
        />
        <link
          href="https://assets.juicer.io/embed.css"
          media="all"
          rel="stylesheet"
          type="text/css"
        />
        <div class="juicer-container">
          <ul class="juicer-feed" data-feed-id="jonas-klare" />
        </div>
        </React.Fragment>
    );
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }
}
export default SocialMedia;
