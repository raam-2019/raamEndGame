import * as React from 'react';

import {curveLinear} from 'd3-shape';
import {IPoint} from 'types/IPoint';

const ReactVis = require('react-vis');

export interface IBasicLineSeriesProps {
  extraClassName?: string;
  data: IPoint[];
  lineColor?: string;
  lineWidthPx?: number;
  fillColor?: string
}

export const LinearAreaSeries = (props: IBasicLineSeriesProps) => (
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
