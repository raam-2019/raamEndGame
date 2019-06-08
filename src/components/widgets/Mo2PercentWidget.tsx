import * as React from 'react';
import {IPoint} from 'types/IPoint';
import {BasicBarChart} from "components/widgets/shared/BasicBarChart";
import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';

const MIN_POINTS_BEFORE_SHOW = 3;

export interface IMo2PercentProps {
  mo2: IPoint[];

  heightPx: number;
  widthPx: number;
}

export const Mo2PercentWidget: React.FC<IMo2PercentProps> = props => (
  <XYPlotTemplate
    status={props.mo2.length < MIN_POINTS_BEFORE_SHOW && props.mo2.length < MIN_POINTS_BEFORE_SHOW ? "loading" : "ready"}
    heightPx={props.heightPx}
    widthPx={props.widthPx}
    title="Mo2 Percentage"
    useHorizontalGridLines={true}>

    {BasicHorizontalAxis({
      axisLabel: "Time",
      fnTickFormat: (t, index) => index
    })}

    {BasicVerticalAxis({
      axisLabel: "Mo2%"
    })}

    {BasicBarChart({
      data: props.mo2,
      color: 'green'
    })}
  </XYPlotTemplate>
);