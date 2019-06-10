import * as _ from 'lodash';
import * as React from "react";

import ReactMapGL, {
  NavigationControl,
  FlyToInterpolator,
  Popup
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
        latitude: 33.176215,
        longitude: -117.363864,
        zoom: 9.75,
        bearing: 0,
        pitch: 0
      },
      riderData: [],
      popup: null
    };
  }



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
              description: {
                RacerID: trackLeader['trackleaders_racer_ID'][0],
                DeviceBatteryState: trackLeader.message[0]['batteryState'][0],
                ts: (trackLeader.message[0]['timestamp'] === null ? trackLeader.message[0]['dateTime'] : trackLeader.message[0]['timestamp']),
                lat: trackLeader.message[0]['latitude'],
                lng: trackLeader.message[0]['longitude']
              },
              speed: 10
            }
          };
          geojsonWrapper.features.push(pointData);
        });

        let {mapStyle} = this.state;
        if (!mapStyle.hasIn(["sources", "point"])) {
          mapStyle = mapStyle
            .setIn(
              ["sources", "point"],
              fromJS({type: "geojson", data: geojsonWrapper})
            )
            .set("layers", mapStyle.get("layers").push(pointLayer));
        }

        // Update data source
        mapStyle = mapStyle.setIn(
          ["sources", "point", "data"],
          geojsonWrapper
        );

        this.setState({mapStyle});
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
        onClick={this.__handleClick}>

        {this.__renderPopup()}
        <NavigationControl
          className={styles.nav}
          onViewportChange={this.__handleViewportChange} />

        <button
          className={styles.goToDave}
          onClick={this.__handleClickGoToCyclist}>
          <Img src={imgPersonPin} />
        </button>
      </ReactMapGL>
    </div>
  );

  private __handleClick = (event: any) => {
    const feature = event.features && event.features[0];

    if (feature) {
      if (feature.layer.id === "point") {
        this.setState({
          popup: {
            lat: event.lngLat[1],
            lng: event.lngLat[0],
            description: feature.properties.description
          }
        })

      }
    }
  };

  private __renderPopup = () => {
    const {popup} = this.state;

    return (
      popup && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popup.lng}
          latitude={popup.lat}
          closeOnClick={false}
          onClose={() => this.setState({popup: null})}
        >

          {<div>
            <h3>
              Racer ID: {JSON.parse(popup.description).RacerID}
            </h3>
            <strong>
              Device Battery State: {JSON.parse(popup.description).DeviceBatteryState}
            </strong>
            <br></br>
            <strong>
              Time Stamp: {JSON.parse(popup.description).ts}
            </strong>
            <br></br>
            <strong>
              Latitude: {JSON.parse(popup.description).lat}
            </strong>
            <br></br>
            <strong>
              Longitude: {JSON.parse(popup.description).lng}
            </strong>
          </div>}


        </Popup>
      )
    );
  }



  private __handleClickGoToCyclist = () => {
    const viewport = {
      ...this.state.viewport,
      latitude: this.props.davesLat,
      longitude: this.props.davesLon,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator()
    };
    this.setState({viewport});
  };



  private __handleViewportChange = (viewport: any) => {
    this.setState({viewport});
  };

}

export default RaceTrackerMap;