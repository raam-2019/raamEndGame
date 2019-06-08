import * as React from 'react';

import {curveCatmullRom} from 'd3-shape';
import {ILineSeries} from 'types/ILineSeries';

const ReactVis = require('react-vis');



const legendItems = [
  {
    title: 'Loren Ipdog',
    color: 'blue'
  }
];



export interface IHeartRateWidgetProps {
  heartRateSeries: ILineSeries;
  title: string;

  heightPx: number;
  widthPx: number;
}

export const HeartRateWidget: React.FC<IHeartRateWidgetProps> = props => (
  <div>
    <div>
      <h2>
        {props.title}
      </h2>
    </div>

    <ReactVis.XYPlot
      height={props.heightPx}
      width={props.widthPx}>
      <ReactVis.DiscreteColorLegend
        items={legendItems}
        orientation='horizontal' />

      <ReactVis.HorizontalGridLines style={{stroke: '#B7E9ED'}} />
      <ReactVis.VerticalGridLines style={{stroke: '#B7E9ED'}} />

      <ReactVis.XAxis
        title="Time"
        style={{
          line: {stroke: '#ADDDE1'},
          ticks: {stroke: '#ADDDE1'},
          text: {
            stroke: 'none',
            fill: '#6b6b76',
            fontWeight: 600
          }
        }} />
      <ReactVis.YAxis title="Beats per minute" />

      <ReactVis.LineSeries
        color="orange"
        curve={curveCatmullRom.alpha(0.5)}
        data={props.heartRateSeries} />

    </ReactVis.XYPlot>
  </div>
);
