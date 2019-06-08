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
import {API, graphqlOperation} from 'aws-amplify';
import { Asset} from "../../graphql/queries";
import {onRiderUpdate} from "../../graphql/subscriptions";
import Navagation from '../GlobalUtilities/Navigation';
import FanExpLanding from './FanExpLanding';

import "../../Assets/Stylesheet.css";

class Fanexperience extends Component {

    constructor(props) {
        super(props);
        this.Ref1 = React.createRef();
        this.Ref2 = React.createRef();
        this.Ref3 = React.createRef();
        this.Ref4 = React.createRef();
        this.Ref5 = React.createRef();
      }
    

  listQuery = async () => {
    console.log("listing todos");
    const allTodos = await API.graphql(graphqlOperation(Asset));
    alert(JSON.stringify(allTodos));
  };

state = {riderData: [], error: "", value: ''}

async componentDidMount(){

    // const allRacerData = await API.graphql(graphqlOperation(Asset));
    // console.log(allRacerData);
    // this.setState({
    // users: allRacerData.data.listAssetTable6ce042e
    // });


    //subscription query for real time data
    // const subscription = API.graphql(
    //     graphqlOperation(onRiderUpdate)
    // ).subscribe({
    //     // next: (RiderData) => console.log(RiderData.value.data)
    //     next: (RiderData) => this.addToState(RiderData.value.data)
    // });

    // Stop receiving data updates from the subscription
  //  subscription.unsubscribe();

}

addToState = (data) =>{
    this.setState(state => {
        const riderData = state.riderData.concat(data);
       // console.log(riderData[0]['rider']);
        return {
            riderData,
            value: '',
        };
    })
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
        <Widget0  data={this.state.riderData}/>

        <br />
        <div className="App" ref={this.Ref3}>
          <Widget1 heading="Stat 1" rowspan={2} colspan={3}  data={this.state.riderData}/>
          <Widget2 heading="Stat 2" rowspan={2} colspan={1}  data={this.state.riderData}/>
          <Widget3 heading="Some graph shit" colspan={2} rowspan={2}  data={this.state.riderData}/>
          <Widget4 heading="Some more stat"  data={this.state.riderData}/>
          <Widget5 heading="ThisAndThat"  data={this.state.riderData}/>
          <Widget6 heading="RAAM"  data={this.state.riderData}/>
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
          <ListGroupItem className="panel_item" onClick={this.scrollToRef1}>Introduction</ListGroupItem>
          <ListGroupItem className="panel_item" onClick={this.scrollToRef2}>Who is Dave</ListGroupItem>
          <ListGroupItem className="panel_item" onClick={this.scrollToRef3}>Widgets</ListGroupItem>
          <ListGroupItem className="panel_item" onClick={this.scrollToRef4}>About Us</ListGroupItem>
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
