
import React, {Component} from 'react';
import { Container } from "reactstrap";
import ReactMapGL, { Marker, Popup, NavigationControl,LinearInterpolator, FlyToInterpolator } from 'react-map-gl';
// import d3 from 'd3-ease';//Mapbox token
import {fromJS} from 'immutable';
// const TOKEN = 'pk.eyJ1IjoibWlzbGFtNSIsImEiOiJjanVpdG5vZWoxZThsNGZwamJ4Nmxya2o0In0.19pBli659L76GrJaX0JWoA'; //rayhan's token
const TOKEN = 'pk.eyJ1IjoicnNiYXVtYW5uIiwiYSI6ImNqdzg5aWxkYzF1azI0OW5uaWVmazhleXUifQ.XAm1dRGmXuRAMSQm0TJKXg'; //ryan baumann's token
//Mapbox Navigation Style

class Widget0 extends React.Component {

    state = {
        mapStyle:'mapbox://styles/rsbaumann/cjwdv1evs18rk1cnuwku6tys5?optimize=true',
        viewport: {
            width: '70%',
            height: 500,
            latitude: 33.176215,
            longitude: -117.363864,
            zoom: 9.75,
            bearing: 0,
            pitch: 0,
        },

        riderData : [],

        pointLayer: fromJS({
            id: 'point',
            source: 'point',
            type: 'circle',
            paint: {
              'circle-radius': 10,
              'circle-color': '#007cbf'
            }
          })
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
             .then(function(data){

                 let {mapStyle} = this.state;

                 var trackleaders = data.trackleaders_aggregate_feed.trackleaders_feed;
                 var pointData ;
                 var points = [];
                 
                 trackleaders.forEach(trackleader => {
                    pointData = {
                        type: 'Point',
                        coordinates: [parseFloat(trackleader.message[0].longitude[0]) , parseFloat(trackleader.message[0].latitude[0])]
                    };

                    points.push(pointData)

                });

                if (!mapStyle.hasIn(['sources', 'point'])) {
                    mapStyle = mapStyle
                      // Add geojson source to map
                      .setIn(['sources', 'point'], fromJS({type: 'geojson'}))
                      // Add point layer to map
                      .set('layers', mapStyle.get('layers').push(this.state.pointLayer));
                  }

                mapStyle = mapStyle.setIn(['sources', 'point', 'data'], points );

                this.setState({mapStyle});

                // console.log(parseFloat(trackleaders[0].message[0].latitude[0]));
             })
             .catch(function(error) {
                 console.log('Looks like there was a problem: \n', error);
             })
         } , 10000) ;
         
     }

    // For Dashboard access for now we will have to add /dashboardRAAMforVIPaccess to our http
    //Fanexperience will be root dir
    render() {
        return (
            <div id="mainWrapper">
                
                <Container className="d-flex flex-wrap justify-content-left align-items-center align-content-center">
                    
                    <ReactMapGL mapboxApiAccessToken={TOKEN}
                        mapStyle={this.state.mapStyle}
                        //mapStyle='mapbox://styles/rsbaumann/cjwdycid51bvk1cp7ye1y0u5f?optimize=true'
                        {...this.state.viewport} 
                        onViewportChange={this._onViewportChange}
                        
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