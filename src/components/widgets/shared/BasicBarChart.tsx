import * as React from 'react';

import {IPoint} from 'types/IPoint';

const ReactVis = require('react-vis');



export interface IBasicVerticalBarSeriesProps {
  extraClassName?: string;
  data: IPoint[];
  color?: string;
};

export const BasicVerticalBarSeries = (props: IBasicVerticalBarSeriesProps) => {
  return <ReactVis.VerticalBarSeries
    className={props.extraClassName}
    data={props.data}
    style={{
      background: "white",
      width: '100%',
      height: '100%'
    } as React.CSSProperties} />
};
