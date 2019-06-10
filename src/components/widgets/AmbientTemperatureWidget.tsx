import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';



export interface IAmbientTemperatureWidgetProps extends IDefaultWidgetProps {}

export const AmbientTemperatureWidget: React.FC<IAmbientTemperatureWidgetProps> = props => (
  <XYPlotTemplate
    status={props.data.length < props.numPointsBeforeLoad ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Ambient Temperature (°F)"
    useHorizontalGridLines={true}>
    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}

    {BasicVerticalAxis({
      axisLabel: "°F"
    })}

    {LinearLineSeries({
      data: props.data,
      lineColor: 'red'
    })}
  </XYPlotTemplate>
);
