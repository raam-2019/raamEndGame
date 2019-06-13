import * as React from 'react';

import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {BasicHorizontalAxis, BasicVerticalAxis} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import * as util from 'components/widgets/shared/util';
import {TimeTickMark} from 'components/widgets/shared/TimeTickMark';
import {TickMark} from 'components/widgets/shared/TickMark';



export interface IBreathRateWidgetProps extends IDefaultWidgetProps {
  startUnixTime?: number;
  endUnixTime?: number;
}

export const BreathRateWidget: React.FC<IBreathRateWidgetProps> = props => (
  <XYPlotTemplate
    xMin={props.startUnixTime}
    xMax={props.endUnixTime}
    yMin={20}
    yMax={70}
    status={props.data.length < props.numPointsBeforeLoad ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Breath Rate (breaths/min)"
    useHorizontalGridLines={true}>
    {LinearLineSeries({
      data: props.data,
      lineColor: 'rgb(144, 103, 167)',
      lineWidthPx: util.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time (h:m:s ago)",
      fnTickFormat: unixTime => TimeTickMark({unixTime})
    })}

    {BasicVerticalAxis({
      axisLabel: "Rate",
      fnTickFormat: value => TickMark({value})
    })}
  </XYPlotTemplate>
);
