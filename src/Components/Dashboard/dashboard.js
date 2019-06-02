//External
import React from 'react'
import { Row, Col } from "reactstrap";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { API, graphqlOperation } from "aws-amplify";

//Internal
import { Racerdata, Asset } from "../../graphql/queries";
import Navagation from "../GlobalUtilities/Navigation";
import Widget1 from "./teamxpWidget1"
import Widget2 from "./teamxpWidget2"
import Widget3 from "./teamxpWidget3"
import "../../Assets/BiometricsStyle.css";

class Dashboard extends React.Component {

  //amplify
  listQuery = async () => {
    console.log("listing todos");
    const allTodos = await API.graphql(graphqlOperation(Asset));
    alert(JSON.stringify(allTodos));
  };

  state = { users: [], error: "" };

  async componentDiyarndMount() {
    const allRacerData = await API.graphql(graphqlOperation(Asset));
    console.log(allRacerData);
    this.setState({
      users: allRacerData.data.listAssetTable6ce042e
    });
  }
  //endamplify

  render() {
    return (
        // For Dashboard access for now we will have to add /dashboardRAAMforVIPaccess to out http
        <div className="main">
          <Navagation />
          <br />
          <br />
          <br />
          <br />

          <h1>
            Team Experience
          </h1>
          <br />

          <div className="biometrics">
            <Widget1 heading="Stat 1" rowspan={2} colspan={1} />
            <Widget2 heading="Stat 2" rowspan={2} colspan={1} />
            <Widget3 heading="Some graph shit" colspan={1} rowspan={2} />
          </div>
        </div>
      );
  }
}
export default Dashboard
