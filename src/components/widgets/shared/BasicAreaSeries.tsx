import * as React from 'react';

import {curveLinear} from 'd3-shape';
import {IPoint} from 'types/IPoint';

const ReactVis = require('react-vis');

export interface IBasicAreaSeriesProps {
  extraClassName?: string;
  data: IPoint[];
  lineColor?: string;
  lineWidthPx?: number;
  fillColor?: string
}

/*
/////// NOTES WITH LineSeries /////////////////
Make sure that the line series is the first graph that is declared or else it
will cover up the rest of the stuff that we want to show. 
*/


export const LinearAreaSeries = (props: IBasicAreaSeriesProps) => (
  <ReactVis.AreaSeries
    className={props.extraClassName}
    curve={curveLinear}
    data={props.data}
    style={{
      fill: props.fillColor || 'white',
      stroke: props.lineColor || 'black',
      strokeWidth: `${props.lineWidthPx || 2}px`
    } as React.CSSProperties} />
);
