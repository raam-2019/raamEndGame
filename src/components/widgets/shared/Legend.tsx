import * as React from 'react';
import {ILegendColorPair} from 'types/ILegendColorPair';

const ReactVis = require('react-vis');

export interface ILegendProps {
  legendItems: ILegendColorPair[];
  placement?: 'horizontal'|'vertical';
}

export const Legend = (props: ILegendProps) => (
  <ReactVis.DiscreteColorLegend
    items={props.legendItems}
    orientation={'horizontal'}
  />
);
