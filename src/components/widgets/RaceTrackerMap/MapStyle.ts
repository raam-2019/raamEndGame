import {fromJS} from 'immutable';
import MAP_STYLE from './MapStyle.json';

export const pointLayer = fromJS({
  id: 'point',
  source: 'point',
  type: 'circle',
  paint: {
    'circle-color': "hsl(20%, 95%, 44%)",
    'circle-radius': ["interpolate", ["exponential", 1.2], ["zoom"], 0, 4, 16, 20],
    'circle-stroke-color': 'white',
    'circle-stroke-width': ["interpolate", ["exponential", 1.2], ["zoom"], 0, 1, 16, 2]
  }
});

export const defaultMapStyle = fromJS(MAP_STYLE);
