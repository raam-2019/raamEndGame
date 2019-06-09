import * as _ from 'lodash';
import * as React from "react";

import WebMercatorViewport from 'viewport-mercator-project';
import bbox from '@turf/bbox';
import * as turf from '@turf/turf'

import ReactMapGL, {
  NavigationControl,
  // FlyToInterpolator,
  LinearInterpolator
} from "react-map-gl";
import {
  defaultMapStyle,
  pointLayer
} from "./MapStyle";
import {fromJS} from "immutable";
import {Img} from 'components/Img/Img';
import * as trackLeaderService from 'services/trackLeaders';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import imgPersonPin from 'assets/images/personPin.png';

import styles from './RaceTrackerMap.module.css';
import { number } from 'prop-types';




const TOKEN = "pk.eyJ1IjoicnNiYXVtYW5uIiwiYSI6ImNqdzg5aWxkYzF1azI0OW5uaWVmazhleXUifQ.XAm1dRGmXuRAMSQm0TJKXg";



export interface IRaceTrackerMapProps {
  davesLat: number;
  davesLon: number;
}

class RaceTrackerMap extends React.Component<IRaceTrackerMapProps, any> {

  private __unsubscribe = new Subject();

  

  constructor(props: any) {
    super(props);

    this.state = {
      mapStyle: defaultMapStyle,
      viewport: {
        width: "100%",
        height: 750,
        
        zoom: 9.75,
        bearing: 0,
        pitch: 0
      },

      riderData: [],
      calcData:{}
    };
  }

  

  private _autoClickForInitialFitToBounds = () => {
    
    var line = turf.lineString([[-117.388839, 33.191634], [-76.321246, 38.934216]]);
      // calculate the bounding box of the feature
      console.log('by autoclick:');
      console.log(line);
      

      const [minLng, minLat, maxLng, maxLat] = bbox(line);


      console.log('by autoclick:');
      console.log(minLng);
      console.log(minLat);
      console.log(maxLng);
      console.log(maxLat);

      
      
      // construct a viewport instance from the current state
      const viewport = new WebMercatorViewport(this.state.viewport);
      const {longitude, latitude, zoom} = viewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
        padding: 40
      });

      this.setState({
        viewport: {
          ...this.state.viewport,
          longitude,
          latitude,
          zoom,
          transitionInterpolator: new LinearInterpolator(),
          transitionDuration: 1000
        }
      });
    
  };


  private _toggleRidersAroundDave = () => {

    var data = this.state.calcData;

    var davesLoc = {
      dLat:  data[0].message[0].latitude[0],
      dLong: data[0].message[0].longitude[0]
    }

    // console.log(davesLoc);


    var distArray: any = [];
    var distance: any = number;

    _.forEach(data, riderInfo => {


    
    var from = turf.point([davesLoc.dLong, davesLoc.dLat]); // Dave
    var to = turf.point([riderInfo.message[0].longitude[0], riderInfo.message[0].latitude[0]]);

    // var options = { units: 'miles' };


    distance = turf.distance(from, to);
    

    //We will store the distance and coordinates of the target rider. With 
    var distRacerObj= {
      dist: distance,
      lng: riderInfo.message[0].longitude[0],
      lat: riderInfo.message[0].latitude[0]
    } as any
    

    distArray.push(distRacerObj);
  
    });

    //Sorting the array of distance. We will use this to find the id/coordinates number of the rider who created the smallest distance with Dave
    var byDist = distArray.slice(0);
    byDist.sort(function(a:any,b:any) {
      return a.dist - b.dist;
    });

    
    var line = turf.lineString([[parseFloat(davesLoc.dLong), parseFloat(davesLoc.dLat)], [parseFloat(byDist[1].lng), parseFloat(byDist[1].lat)]]);

    // calculate the bounding box of the feature
    const [minLng, minLat, maxLng, maxLat] = bbox(line);

    // construct a viewport instance from the current state
    const viewport = new WebMercatorViewport(this.state.viewport);
    const { longitude, latitude, zoom } = viewport.fitBounds([[minLng, minLat], [maxLng, maxLat]], {
      padding: 200
    });

    this.setState({
      viewport: {
        ...this.state.viewport,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new LinearInterpolator(),
        transitionDuration: 1000
      }
    });

  };


  public componentDidMount = () => {

    trackLeaderService
      .asObservable()
      .pipe(takeUntil(this.__unsubscribe))
      .subscribe(data => {
        if (!data) {
          return;
        }

        const trackleaders = data["trackleaders_aggregate_feed"]["trackleaders_feed"];

        const geojsonWrapper = {
          type: "FeatureCollection",
          features: []
        } as any;

        _.forEach(trackleaders, trackLeader => {
          const pointData = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                parseFloat(trackLeader.message[0].longitude[0]),
                parseFloat(trackLeader.message[0].latitude[0])
              ]
            },
            properties: {
              speed: 10
            }
          };
          geojsonWrapper.features.push(pointData);
        });

        //Passing trackleader data to the toggle function
       this.setState({calcData:trackleaders})

        let { mapStyle } = this.state;
        if (!mapStyle.hasIn(["sources", "point"])) {
          mapStyle = mapStyle
            .setIn(
              ["sources", "point"],
              fromJS({ type: "geojson", data: geojsonWrapper })
            )
            .set("layers", mapStyle.get("layers").push(pointLayer));
        }

        // Update data source
        mapStyle = mapStyle.setIn(
          ["sources", "point", "data"],
          geojsonWrapper
        );

        this.setState({ mapStyle });
      });
  };





  public componentWillUnmount = () => {
    this.__unsubscribe.next();
    this.__unsubscribe.complete();
  };



  public render = () => (
    <div className={styles.root}>
      <ReactMapGL
        className={styles.map}
        mapboxApiAccessToken={TOKEN}
        mapStyle={this.state.mapStyle}
        {...this.state.viewport}
        onViewportChange={this.__handleViewportChange}
        onLoad={this._autoClickForInitialFitToBounds}
>
        <NavigationControl
          className={styles.nav}
          onViewportChange={this.__handleViewportChange} />

        <button
          className={styles.goToDave}
         onClick={this._toggleRidersAroundDave}
          
          >
          <Img src={imgPersonPin} />
        </button>
      </ReactMapGL>
    </div>
  );



  // private __handleClickGoToCyclist = () => {
  //   const viewport = {
  //     ...this.state.viewport,
  //     latitude: this.props.davesLat,
  //     longitude: this.props.davesLon,
  //     zoom: 14,
  //     transitionDuration: 5000,
  //     transitionInterpolator: new FlyToInterpolator()
  //   };
  //   this.setState({viewport});
  // };



  private __handleViewportChange = (viewport: any) => {
    this.setState({viewport});
  };

}

export default RaceTrackerMap;