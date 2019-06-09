import * as React from 'react';

const ReactVis = require('react-vis');



export interface IBasicAxisProps {
  axisLabel: string;
  orientation?: string;
  fnTickFormat?: (tickValue: number, index: number) => string | number | React.ReactSVG;
}



export const BasicHorizontalAxis = (props: IBasicAxisProps) => (
  <ReactVis.XAxis
    tickFormat={props.fnTickFormat}
    title={props.axisLabel}
    />

);

export const BasicVerticalAxis = (props: IBasicAxisProps) => (
  <ReactVis.YAxis
    tickFormat={props.fnTickFormat}
    title={props.axisLabel}
    orientation={props.orientation}
    />
);
