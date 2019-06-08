import * as React from 'react';

import update from 'immutability-helper';
import ReactMapGL, {
  ViewState,
  NavigationControl,
  FlyToInterpolator,
  ViewportProps
} from 'react-map-gl';



const TOKEN = 'pk.eyJ1IjoibWlzbGFtNSIsImEiOiJjanVpdG5vZWoxZThsNGZwamJ4Nmxya2o0In0.19pBli659L76GrJaX0JWoA';



export interface IDavesLocationMapProps {

}

interface IDavesLocationMapState {
  viewport: ViewState & Pick<ViewportProps, 'width' | 'height' | 'transitionDuration' | 'transitionInterpolator'>;
}

export class DavesLocationMap extends React.Component<IDavesLocationMapProps, IDavesLocationMapState> {

  constructor(props: IDavesLocationMapProps) {
    super(props);
    this.state = {
      viewport: {
        zoom: 8,
        width: 500,
        height: 650,
        latitude: 37.7577,
        longitude: -122.4376,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator()
      }
    };
  }



  public render = () => (
    <ReactMapGL
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mislam5/cjuiyejbm6qn11gnv0e44i7qm"
      onViewportChange={this.__handleViewportChange}
      {...this.state.viewport}>

      <NavigationControl onViewportChange={this.__handleViewportChange} />
    </ReactMapGL>
  );



  private __handleViewportChange = (viewState: ViewState) =>
    this.setState({
      viewport: update(this.state.viewport, {
        latitude: {$set: viewState.latitude},
        longitude: {$set: viewState.longitude},
        zoom: {$set: viewState.zoom}
      })
    });

}
