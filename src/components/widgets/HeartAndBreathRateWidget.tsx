import * as React from 'react';

import {IPoint} from 'types/IPoint';
import {LinearLineSeries} from 'components/widgets/shared/BasicLineSeries';
import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';



const MIN_POINTS_BEFORE_SHOW = 2;



export interface IHeartAndBreathRateWidgetProps {
  heartRateSeries: IPoint[];
  breathRateSeries: IPoint[];

  heightPx: number;
  widthPx: number;
}

export const HeartAndBreathRateWidget: React.FC<IHeartAndBreathRateWidgetProps> = props => (
  <XYPlotTemplate
    status={props.heartRateSeries.length < MIN_POINTS_BEFORE_SHOW && props.heartRateSeries.length < MIN_POINTS_BEFORE_SHOW ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Heart vs. Breath Rate"
    useHorizontalGridLines={true}>
    {/* React-Vis components must be at the top level and not nested, which is why we're calling functions and not making component statements */}
    {LinearLineSeries({
      data: props.breathRateSeries,
      lineColor: 'blue'
    })}
    {LinearLineSeries({
      data: props.heartRateSeries,
      lineColor: 'red'
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
