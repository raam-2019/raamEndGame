
import React, {Component} from 'react';
// import Navagation from "../Navagation";
import { Container } from "reactstrap";
// import React from 'react'
import ReactMapGL, { Marker, Popup, NavigationControl,LinearInterpolator, FlyToInterpolator } from 'react-map-gl';
// import ReactMapGL from 'react-map-gl';
// import { Component } from 'react';
// import Pin from './Pin'
// import './fanexperience.css';
// 3rd-party easing functions
// import d3 from 'd3-ease';//Mapbox token
const TOKEN = 'pk.eyJ1IjoibWlzbGFtNSIsImEiOiJjanVpdG5vZWoxZThsNGZwamJ4Nmxya2o0In0.19pBli659L76GrJaX0JWoA';
//Mapbox Navigation Style

class Widget0 extends React.Component {

    state = {
        viewport: {
            width: '70%',
            height: 500,
            latitude: 33.176215,
            longitude: -117.363864,
            zoom: 9.75,
            bearing: 0,
            pitch: 0,
        },

        riderData : []
        
    };

    _onViewportChange = viewport => {
        this.setState({viewport});
    };

    _goToCyclist = () => {
        const viewport = {
            ...this.state.viewport,
            longitude: -74.1, //This is be the coordinate of the cyclist
            latitude: 40.7,
            zoom: 14,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator(),
            // transitionEasing: d3.easeCubic
        };
        this.setState({viewport});
    };

    componentDidUpdate(){
          console.log(this.props);
    }

    componentDidMount(){
      
        this.trackData();
     }
 
     trackData(){
 
         setInterval(function(){
             fetch('/api/trackleads')
             .then(res => res.json())
             .then(data => console.log(data))
             .catch(function(error) {
                 console.log('Looks like there was a problem: \n', error);
             })
         } , 60000) ;
         
     }
    // mapStyle = "mapbox://styles/mislam5/cjuiyejbm6qn11gnv0e44i7qm"
    // For Dashboard access for now we will have to add /dashboardRAAMforVIPaccess to our http
    //Fanexperience will be root dir
    render() {
        return (
            <div id="mainWrapper">
                <Container className="d-flex flex-wrap justify-content-left align-items-center align-content-center">
                    <ReactMapGL mapboxApiAccessToken={TOKEN}
                        // mapStyle="mapbox://styles/mislam5/cjuiyejbm6qn11gnv0e44i7qm"
                        mapStyle='mapbox://styles/mislam5/cjuiyejbm6qn11gnv0e44i7qm'
                        {...this.state.viewport} onViewportChange={this._onViewportChange}
                     >
                        <div className="nav">
                            <NavigationControl onViewportChange={(viewport) => this.setState({ viewport })}  />   
                        </div>
                    </ReactMapGL>
                    <button onClick={this._goToCyclist}>Cyclist</button>
                </Container>
            </div>
        );
    }
}

export default Widget0