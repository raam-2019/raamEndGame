import * as React from 'react';

import update from 'immutability-helper';
import ReactMapGL, {
  ViewState,
  NavigationControl,
  FlyToInterpolator,
  ViewportProps
} from 'react-map-gl';
import {Img} from 'components/Img/Img';

import imgPersonPin from 'assets/images/personPin.png';

import styles from './DavesLocationMap.module.css';



const TOKEN = 'pk.eyJ1IjoibWlzbGFtNSIsImEiOiJjanVpdG5vZWoxZThsNGZwamJ4Nmxya2o0In0.19pBli659L76GrJaX0JWoA';
const DEFAULT_ZOOM = 14;



export interface IDavesLocationMapProps {
  davesLat: number;
  davesLon: number;
}

interface IDavesLocationMapState {
  viewport: ViewState & Pick<ViewportProps, 'width' | 'height' | 'transitionDuration' | 'transitionInterpolator'>;
}

export class DavesLocationMap extends React.Component<IDavesLocationMapProps, IDavesLocationMapState> {

  constructor(props: IDavesLocationMapProps) {
    super(props);
    this.state = {
      viewport: {
        zoom: DEFAULT_ZOOM,
        width: 1000,
        height: 650,
        latitude: 33.1959,
        longitude: -117.3795,
        transitionDuration: 250,
        transitionInterpolator: new FlyToInterpolator()
      }
    };
  }



  public render = () => (
    <div className={styles.root}>
      <ReactMapGL
        className={styles.map}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mislam5/cjuiyejbm6qn11gnv0e44i7qm"
        onViewportChange={this.__handleViewportChange}
        {...this.state.viewport}>

        <NavigationControl
          className={styles.nav}
          onViewportChange={this.__handleViewportChange} />

        <button
          className={styles.goToDave}
          onClick={this.__handleClickGoToDave}>
          <Img src={imgPersonPin} />
        </button>
      </ReactMapGL>
    </div>
  );



  private __handleViewportChange = (viewState: ViewState) =>
    this.setState({
      viewport: update(this.state.viewport, {
        latitude: {$set: viewState.latitude},
        longitude: {$set: viewState.longitude},
        zoom: {$set: viewState.zoom}
      })
    });



  private __handleClickGoToDave = () =>
    this.setState({
      viewport: update(this.state.viewport, {
        latitude: {$set: this.props.davesLat},
        longitude: {$set: this.props.davesLon},
        zoom: {$set: DEFAULT_ZOOM}
      })
    });
}
