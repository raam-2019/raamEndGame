import * as React from 'react';

import {IPoint} from 'types/IPoint';

const ReactVis = require('react-vis');

export interface IBasicBarChart {
  extraClassName?: string;
  data: IPoint[];
  color?: string;
};

export const BasicBarChart = (props: IBasicBarChart) => {
  return <ReactVis.VerticalBarSeries
    className={props.extraClassName}
    data={props.data}
    style={{
      background: "white",
    } as React.CSSProperties} />
};