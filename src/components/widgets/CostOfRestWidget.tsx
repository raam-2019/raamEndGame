import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';
import {LinearAreaSeries} from 'components/widgets/shared/BasicAreaSeries';
import * as util from './shared/util';
import {AfterTimeTickMark} from 'components/widgets/shared/TimeTickMark';


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

export interface ICostOfRestWidgetProps extends IDefaultWidgetProps {}

export const CostOfRestWidget: React.FC<ICostOfRestWidgetProps> = props => (
    <XYPlotTemplate
    {...console.log(props)}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    status={props.data.length > 2 && props.data.length > 2 ? 'ready' : 'loading'}
    title="Cost of Rest Over Time"
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
