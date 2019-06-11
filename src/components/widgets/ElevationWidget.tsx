import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';
import {LinearAreaSeries} from 'components/widgets/shared/BasicAreaSeries';
import * as util from './shared/util';
import {AfterTimeTickMark} from "./shared/TimeTickMark";



function timeCompare(a: {x: any;}, b: {x: any;}) {
  let timeA = a.x;
  let timeB = b.x;
  let comparison = 0;

  if (timeA > timeB) {
    comparison = 1;
  } else if (timeA < timeB) {
    comparison = -1;
  }
  return comparison;
}



export interface IElevationWidgetProps extends IDefaultWidgetProps {}

export const ElevationWidget: React.FC<IElevationWidgetProps> = props => (
  <XYPlotTemplate
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.data.length > 2 && props.data.length > 2 ? 'ready' : 'loading'}
    title="Elevation over Predicted Time"
    useHorizontalGridLines={true}>
    {LinearAreaSeries({
      data: props.data.sort(timeCompare),
      lineColor: 'orange',
      fillColor: '#FFCF9E',
      lineWidthPx: util.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time (h:m:s ago)",
      fnTickFormat: t => AfterTimeTickMark({unixTime: t})
    })}

    {BasicVerticalAxis({
      axisLabel: "Elevation Level"
    })}
  </XYPlotTemplate>
);
