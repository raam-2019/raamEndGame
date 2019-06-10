import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import * as util from 'components/widgets/shared/util';
import {TimeTickMark} from 'components/widgets/shared/TimeTickMark';
import {TickMark} from 'components/widgets/shared/TickMark';



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
      lineWidthPx: util.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time (h:m:s ago)",
      fnTickFormat: unixTime => TimeTickMark({unixTime})
    })}

    {BasicVerticalAxis({
      axisLabel: "°F",
      fnTickFormat: value => TickMark({value})
    })}
  </XYPlotTemplate>
);
