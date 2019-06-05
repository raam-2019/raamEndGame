import React, { Component } from 'react';
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

    listQuery = async () => {
        console.log('listing todos');
        const allTodos = await API.graphql(graphqlOperation(Asset));
        alert(JSON.stringify(allTodos));
    }

    state = {riderData: [], error: "", value: ''}

    async componentDidMount(){

        // const allRacerData = await API.graphql(graphqlOperation(Asset));
        // console.log(allRacerData);
        // this.setState({
        // users: allRacerData.data.listAssetTable6ce042e
        // });


        //subscription query for real time data
        const subscription = API.graphql(
            graphqlOperation(onRiderUpdate)
        ).subscribe({
            // next: (RiderData) => console.log(RiderData.value.data)
            next: (RiderData) => this.addToState(RiderData.value.data)
        });

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
    // Fanexperience will be root dir

    //Data sent through to other components as props
    render() {
        return (
            <div className="main">
                 <div  >
                    <Navagation />
                    <br />
                    <br />
                    <FanExpLanding />
                    <br />
                    <Widget0  data={this.state.riderData}/>
                    <br />
                    <div className="App">
                    <Widget1 heading="Stat 1" rowspan={2} colspan={3} data={this.state.riderData} />
                    <Widget2 heading="Stat 2" rowspan={2} colspan={1} data={this.state.riderData}/>
                    <Widget3 heading="Some graph shit" colspan={2} rowspan={2} data={this.state.riderData}/>
                    <Widget4 heading="Some more stat" data={this.state.riderData}/>
                    <Widget5 heading="ThisAndThat" data={this.state.riderData}/>
                    <Widget6 heading="RAAM" data={this.state.riderData}/>
                    </div>
               </div>
            </div>
        );
    }
}

export default Fanexperience