import * as React from 'react';
import {LegendColorPair} from 'types/LegendColorPair';

const ReactVis = require('react-vis');

export interface ILegendProps {
  legendItems: LegendColorPair[];
  placement?: string;
}

export const Legend = (props: ILegendProps) => (
  <ReactVis.DiscreteColorLegend
    items={props.legendItems}
    orientation={'horizontal'}
  />
);
