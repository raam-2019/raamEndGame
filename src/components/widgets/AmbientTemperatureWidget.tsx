import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import * as constants from 'components/widgets/shared/constants';



export interface IAmbientTemperatureWidgetProps extends IDefaultWidgetProps {}

export const AmbientTemperatureWidget: React.FC<IAmbientTemperatureWidgetProps> = props => (
  <XYPlotTemplate
    status={props.data.length < props.numPointsBeforeLoad ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Ambient Temperature (°F)"
    useHorizontalGridLines={true}>
    {LinearLineSeries({
      data: props.data,
      lineColor: 'rgb(114, 147, 203)',
      lineWidthPx: constants.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}

    {BasicVerticalAxis({
      axisLabel: "°F"
    })}
  </XYPlotTemplate>
);
