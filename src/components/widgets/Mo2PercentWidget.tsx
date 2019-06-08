import * as React from 'react';
import {IPoint} from 'types/IPoint';
import {BarChart} from "components/widgets/shared/BasicBarGraph";
import {XYPlotTemplate} from 'components/widgets/shared/XYPlotTemplate';
import {
  BasicHorizontalAxis,
  BasicVerticalAxis
} from 'components/widgets/shared/BasicAxes';

const MIN_POINTS_BEFORE_SHOW = 6;

export interface IMo2PercentProps {
  mo2: IPoint[];

  heightPx: number;
  widthPx: number;
}

export const Mo2PercentWidget: React.FC<IMo2PercentProps> = props => (
    <div>
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

    {BarChart({
      data: props.mo2,
      color: 'green'
    })}
  </XYPlotTemplate>
  <button onClick={() => {
      console.log(props.mo2);
  }}>Hello</button>
  </div>
);