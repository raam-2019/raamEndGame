import React, { Component } from "react";
import { Row, Col, Button, ListGroup, ListGroupItem } from "reactstrap";
import $ from "jquery";
import CustomCarousel from "./CustomCarousel";
import Widget0 from "../Widget0";
import Widget1 from "../Widget1";
import Widget2 from "../Widget2";
import Widget3 from "../Widget3";
import Widget4 from "../Widget4";
import Widget5 from "../Widget5";
import Widget6 from "../Widget6";
import { API, graphqlOperation } from "aws-amplify";
import { Racerdata, Asset } from "../../graphql/queries";
import Navagation from "../GlobalUtilities/Navigation";
import FanExpLanding from "./FanExpLanding";

import "../../Assets/Stylesheet.css";

class Fanexperience extends Component {
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
  };

  constructor(props) {
    super(props);
    this.Ref1 = React.createRef();
    this.Ref2 = React.createRef();
    this.Ref3 = React.createRef();
    this.Ref4 = React.createRef();
    this.Ref5 = React.createRef();
  }

  // For Dashboard access for now we will have to add /dashboardRAAMforVIPaccess to our http
  //Fanexperience will be root dir
  render() {
    return (
      <div className="main">
        <Navagation />
        <br />
        <br />
        <FanExpLanding dataRef1={this.Ref1} dataRef2={this.Ref2}/>
        <br />
        <Widget0 />

        <br />
        <div className="App" ref={this.Ref3}>
          <Widget1 heading="Stat 1" rowspan={2} colspan={3} />
          <Widget2 heading="Stat 2" rowspan={2} colspan={1} />
          <Widget3 heading="Some graph shit" colspan={2} rowspan={2} />
          <Widget4 heading="Some more stat" />
          <Widget5 heading="ThisAndThat" />
          <Widget6 heading="RAAM" />
        </div>
        
        <div className="BLL" style={{justifyContent: "center"}} ref={this.Ref4}>
            <CustomCarousel />
        </div>

        <Row style={{paddingBottom: "2rem", paddingTop:"2rem"}} ref={this.Ref5}>
          <Col></Col>
          <Col xs="10">
          <iframe src="https://www.davehaase.com/" width="100%" height="600px">
            <p>Your current browser does not support iframe, please try again with a new browser.</p>
          </iframe>
          </Col>
          <Col></Col>
        </Row>

        <ListGroup className="panel_right">
          <ListGroupItem className="panel_item" onClick={this.scrollToRef1}>Scroll from me</ListGroupItem>
          <ListGroupItem className="panel_item" onClick={this.scrollToRef2}>Scroll from me</ListGroupItem>
          <ListGroupItem className="panel_item" onClick={this.scrollToRef3}>Scroll from me</ListGroupItem>
          <ListGroupItem className="panel_item" onClick={this.scrollToRef4}>Scroll from me</ListGroupItem>
          <ListGroupItem className="panel_item" onClick={this.scrollToRef5}>Scroll from me</ListGroupItem>
        </ListGroup>
      </div>
    );
  }

  scrollToRef1 = () => window.scrollTo({ top: this.Ref1.current.offsetTop, behavior: 'smooth' })
  scrollToRef2 = () => window.scrollTo({ top: this.Ref2.current.offsetTop, behavior: 'smooth' })  
  scrollToRef3 = () => window.scrollTo({ top: this.Ref3.current.offsetTop, behavior: 'smooth' })  
  scrollToRef4 = () => window.scrollTo({ top: this.Ref4.current.offsetTop, behavior: 'smooth' })
}

export default Fanexperience;
