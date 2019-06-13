import * as React from 'react';

const ReactVis = require('react-vis');



export interface IBasicAxisProps {
  axisLabel: string;
  orientation?: 'left' | 'right' | 'top' | 'bottom';
  fnTickFormat?: (tickValue: number, index: number) => string | number | React.ReactSVG | JSX.Element;
}



export const BasicHorizontalAxis = (props: IBasicAxisProps) => (
  <ReactVis.XAxis
    position="middle"
    orientation="bottom"
    tickTotal={11}
    tickFormat={props.fnTickFormat}
    title={props.axisLabel} />
);

export const BasicVerticalAxis = (props: IBasicAxisProps) => (
  <ReactVis.YAxis
    tickFormat={props.fnTickFormat}
    title={props.axisLabel}
    orientation={props.orientation} />
);
