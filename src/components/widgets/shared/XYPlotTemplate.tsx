import * as React from 'react';

import {IStatus} from 'components/IStatus';
import {LoadingOverlay} from 'components/LoadingOverlay/LoadingOverlay';

const ReactVis = require('react-vis');


const __gridLineStyle = {
  stroke: '#ebebeb',
  strokeWidth: '1px'
} as React.CSSProperties;



export interface IXYPlotTemplateProps {
  status: IStatus;
  heightPx: number;
  widthPx: number;

  title: string;

  useHorizontalGridLines?: boolean;
  useVerticalGridLines?: boolean;
}

export const XYPlotTemplate: React.FC<IXYPlotTemplateProps> = props => (
  <div>
    <div>
      <h2>{props.title}</h2>
    </div>

    {props.status === 'loading' && (
      <div style={{
        width: `${props.widthPx}px`,
        height: `${props.heightPx}px`
      }}>
        <LoadingOverlay />
      </div>
    )}

    {props.status === 'ready' && (
      <ReactVis.XYPlot
        height={props.heightPx}
        width={props.widthPx}>

        {props.useHorizontalGridLines && (
          <ReactVis.HorizontalGridLines style={__gridLineStyle} />
        )}

        {props.useVerticalGridLines && (
          <ReactVis.VerticalGridLines style={__gridLineStyle} />
        )}

        {props.children}
      </ReactVis.XYPlot>
    )}
  </div>
);
