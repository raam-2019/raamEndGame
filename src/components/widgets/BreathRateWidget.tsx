import * as React from 'react';
import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {BasicHorizontalAxis, BasicVerticalAxis} from 'components/widgets/shared/BasicAxes';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {IDefaultWidgetProps} from 'components/widgets/shared/IDefaultWidgetProps';
import * as constants from 'components/widgets/shared/constants';



export interface IBreathRateWidgetProps extends IDefaultWidgetProps {}

export const BreathRateWidget: React.FC<IBreathRateWidgetProps> = props => (
  <XYPlotTemplate
    status={props.data.length < props.numPointsBeforeLoad ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Breath Rate (breaths/min)"
    useHorizontalGridLines={true}>
    {LinearLineSeries({
      data: props.data,
      lineColor: 'rgb(144, 103, 167)',
      lineWidthPx: constants.StrokeWidthPx
    })}

    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}

    {BasicVerticalAxis({
      axisLabel: "Rate"
    })}
  </XYPlotTemplate>
);
