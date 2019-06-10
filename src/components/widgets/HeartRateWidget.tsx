import * as React from 'react';

import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';



export interface IHeartRateWidgetProps extends IDefaultWidgetProps {}

export const HeartRateWidget: React.FC<IHeartRateWidgetProps> = props => (
  <XYPlotTemplate
    status={props.data.length < props.numPointsBeforeLoad ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Heart Rate (bpm)"
    useHorizontalGridLines={true}>
    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}

    {BasicVerticalAxis({
      axisLabel: "Rate"
    })}

    {LinearLineSeries({
      data: props.data,
      lineColor: 'red'
    })}
  </XYPlotTemplate>
);
